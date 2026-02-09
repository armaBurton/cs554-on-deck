// Models/Social.cs
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("socials")]
public class Social : BaseModel
{
  [PrimaryKey("id")]
  public Guid Id { get; set; }

  [Column("profile_id")]
  public Guid ProfileId { get; set; }

  [Column("platform")]
  public string Platform { get; set; }

  [Column("url")]
  public string Url { get; set; }

  [Column("create_at")]
  public DateTime CreatedAt { get; set; }
}