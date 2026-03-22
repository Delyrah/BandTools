using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using BandTools.Infrastructure.Services;

namespace BandTools.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        private readonly ICurrentUserService _currentUser;

        // Constructor — EF Core injects the options (connection string, provider etc.)
        // ICurrentUserService is our own service that tells us who is logged in
        public AppDbContext(DbContextOptions<AppDbContext> options, ICurrentUserService currentUser)
            : base(options)
        {
            _currentUser = currentUser;
        }

        // --- DbSets ---
        // Each DbSet is a direct representation of a database table.
        // EF Core uses these to know which types to track and query.
        // The => Set<T>() syntax is just a cleaner shorthand for a property
        // that would otherwise need a backing field.
        public DbSet<User> Users => Set<User>();
        public DbSet<Band> Bands => Set<Band>();
        public DbSet<Member> Members => Set<Member>();
        public DbSet<BandMember> BandMembers => Set<BandMember>();
        public DbSet<Track> Tracks => Set<Track>();
        public DbSet<Album> Albums => Set<Album>();
        public DbSet<AlbumTrack> AlbumTracks => Set<AlbumTrack>();
        public DbSet<Setlist> Setlists => Set<Setlist>();
        public DbSet<SetlistTrack> SetlistTracks => Set<SetlistTrack>();
        public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // --- Soft Delete Filters ---
            // HasQueryFilter appends a WHERE clause to EVERY query for that entity,
            // automatically. So Tracks.ToList() becomes SELECT * FROM Tracks WHERE IsDeleted = 0
            // without you ever having to think about it.
            // You can bypass it with .IgnoreQueryFilters() when needed (e.g. admin views).
            builder.Entity<User>().HasQueryFilter(e => !e.IsDeleted);
            builder.Entity<Band>().HasQueryFilter(e => !e.IsDeleted);
            builder.Entity<Member>().HasQueryFilter(e => !e.IsDeleted);
            builder.Entity<BandMember>().HasQueryFilter(e => !e.IsDeleted);
            builder.Entity<Track>().HasQueryFilter(e => !e.IsDeleted);
            builder.Entity<Album>().HasQueryFilter(e => !e.IsDeleted);
            builder.Entity<AlbumTrack>().HasQueryFilter(e => !e.IsDeleted);
            builder.Entity<Setlist>().HasQueryFilter(e => !e.IsDeleted);
            builder.Entity<SetlistTrack>().HasQueryFilter(e => !e.IsDeleted);
            builder.Entity<RefreshToken>().HasQueryFilter(e => !e.IsDeleted);

            // --- Delete Behavior ---
            // By default EF Core sets up CASCADE deletes on required relationships,
            // meaning deleting a Band would delete all its Tracks, Albums etc.
            // We don't want that — we're using soft deletes and want full control.
            // RESTRICT means: throw an error if you try to delete a parent that
            // still has children, forcing you to handle it explicitly in code.
            foreach (var relationship in builder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            // --- Unique Constraints ---
            // Prevents duplicate emails at the database level,
            // as a safety net on top of any application-level validation.
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // A track can only appear once per position on a disc in an album.
            builder.Entity<AlbumTrack>()
                .HasIndex(at => new { at.AlbumId, at.TrackNumber, at.DiscNumber })
                .IsUnique();

            // A position in a setlist can only be occupied by one track.
            builder.Entity<SetlistTrack>()
                .HasIndex(st => new { st.SetlistId, st.Position })
                .IsUnique();
        }

        // --- SaveChangesAsync ---
        // This override intercepts every save operation before it hits the database.
        // It's where we automatically stamp audit fields so no controller or service
        // ever has to set CreatedAt, UpdatedAt etc. manually.
        public override async Task<int> SaveChangesAsync(CancellationToken ct = default)
        {
            var userId = _currentUser.UserId;
            var now = DateTime.UtcNow;

            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                // ChangeTracker knows the state of every entity EF is tracking.
                // Added = new entity, Modified = existing entity that changed,
                // Deleted = entity marked for deletion.
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedAt = now;
                        entry.Entity.CreatedByUserId = userId;
                        break;

                    case EntityState.Modified:
                        entry.Entity.UpdatedAt = now;
                        entry.Entity.UpdatedByUserId = userId;
                        break;

                    case EntityState.Deleted:
                        // Instead of letting EF delete the row, we cancel the deletion,
                        // switch the state back to Modified, and set the soft delete flags.
                        // From the database's perspective, it's just an UPDATE.
                        entry.State = EntityState.Modified;
                        entry.Entity.IsDeleted = true;
                        entry.Entity.DeletedAt = now;
                        entry.Entity.DeletedByUserId = userId;
                        break;
                }
            }

            return await base.SaveChangesAsync(ct);
        }
    }
}
