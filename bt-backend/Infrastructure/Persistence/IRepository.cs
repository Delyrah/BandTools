namespace BandTools.Infrastructure.Persistence;

public interface IRepository<T> where T : AuditableEntity
{
    // Queries
    Task<T?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<IReadOnlyList<T>> GetAllAsync(CancellationToken ct = default);
    IQueryable<T> Query();

    // Commands
    Task AddAsync(T entity, CancellationToken ct = default);
    void Update(T entity);
    void Delete(T entity);

    Task SaveChangesAsync(CancellationToken ct = default);
}
