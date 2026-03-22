using System.Security.Claims;

namespace BandTools.Infrastructure.Services
{
    public interface ICurrentUserService
    {
        int UserId { get; }
    }
}
