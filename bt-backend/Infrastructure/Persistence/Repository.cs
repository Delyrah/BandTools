using Microsoft.EntityFrameworkCore;

namespace BandTools.Infrastructure.Persistence;

public class Repository<T> : IRepository<T> where T : AuditableEntity
{
    private readonly AppDbContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    // GetById — returns null if not found or soft deleted
    // (soft delete filter is applied automatically by EF)
    public async Task<T?> GetByIdAsync(int id, CancellationToken ct = default)
        => await _dbSet.FindAsync([id], ct);

    // GetAll — returns all non-deleted records
    public async Task<IReadOnlyList<T>> GetAllAsync(CancellationToken ct = default)
        => await _dbSet.AsNoTracking().ToListAsync(ct);

    // Query — returns a raw IQueryable for services that need
    // filtering, includes, ordering etc. before hitting the database
    public IQueryable<T> Query()
        => _dbSet.AsQueryable();

    // AddAsync — stages the entity for insert, audit fields
    // are stamped automatically in SaveChangesAsync
    public async Task AddAsync(T entity, CancellationToken ct = default)
        => await _dbSet.AddAsync(entity, ct);

    // Update — marks the entity as modified so EF knows to generate an UPDATE
    // You don't need to call this if the entity is already tracked,
    // but it's explicit and safe to always call it
    public void Update(T entity)
        => _dbSet.Update(entity);

    // Delete — marks for deletion, the soft delete logic in
    // AppDbContext.SaveChangesAsync intercepts this and sets IsDeleted instead
    public void Delete(T entity)
        => _dbSet.Remove(entity);

    public async Task SaveChangesAsync(CancellationToken ct = default)
        => await _context.SaveChangesAsync(ct);
}