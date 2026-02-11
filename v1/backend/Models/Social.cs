// Models/Social.cs
using System.ComponentModel.DataAnnotations.Schema;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using Column = Supabase.Postgrest.Attributes.ColumnAttribute;

namespace backend.Models;

[Supabase.Postgrest.Attributes.Table("socials")]
public class Social : BaseModel
{
    [PrimaryKey("id")]
    public Guid Id { get; set; }

    [Column("profile_id")]
    public Guid ProfileId { get; set; }

    [Column("platform")]
    public string? Platform { get; set; }

    [Column("url")]
    public string? Url { get; set; }

    [Column("create_at")]
    public DateTime CreatedAt { get; set; }
}
