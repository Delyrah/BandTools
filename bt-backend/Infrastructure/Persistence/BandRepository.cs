using Microsoft.EntityFrameworkCore;

namespace BandTools.Infrastructure.Persistence;

public interface IBandRepository : IRepository<Band>
{
    Task<Band?> GetByIdWithDetailsAsync(int id, CancellationToken ct = default);
    Task<IReadOnlyList<Band>> GetAllWithMembersAsync(CancellationToken ct = default);
}

public class BandRepository : Repository<Band>, IBandRepository
{
    private readonly AppDbContext _context;

    public BandRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Band?> GetByIdWithDetailsAsync(int id, CancellationToken ct = default)
        => await _context.Bands
            .Include(b => b.Members).ThenInclude(bm => bm.Member)
            .Include(b => b.Tracks)
            .Include(b => b.Albums)
            .Include(b => b.Setlists)
            .FirstOrDefaultAsync(b => b.Id == id, ct);

    public async Task<IReadOnlyList<Band>> GetAllWithMembersAsync(CancellationToken ct = default)
        => await _context.Bands
            .Include(b => b.Members).ThenInclude(bm => bm.Member)
            .AsNoTracking()
            .ToListAsync(ct);
}