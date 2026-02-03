// backend/Models/Profiles.cs
using Postgrest.Models;
using Postgrest.Attributes;

namespace backend.Models
{
  [Table("profiles")]
  public class Profile : BaseModel
  {
    [PrimaryKey("id", false)]
    public Guid Id { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

    [Column("username")]
    public string? Username { get; set; }

    [Column("first_name")]
    public string? FirstName { get; set; }

    [Column("last_name")]
    public string? LastName { get; set; }

    [Column("performer_name")]
    public string? PerformerName { get; set; }
  }
}