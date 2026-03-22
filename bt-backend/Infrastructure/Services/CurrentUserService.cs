using System.Security.Claims;

namespace BandTools.Infrastructure.Services
{
    // Implementation — register as Scoped
    public class CurrentUserService : ICurrentUserService
    {
        public int UserId { get; }

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            var claim = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

            UserId = int.TryParse(claim, out var id) ? id : 0;
        }
    }
}
