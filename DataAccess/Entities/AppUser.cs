using Microsoft.AspNetCore.Identity;

namespace DataAccess.Entities;

public class AppUser : IdentityUser
{
    public string? FirstName { get; set; } 
    public string? LastName { get; set; } 
    public ICollection<Url> Urls { get; set; } = new List<Url>();
}
