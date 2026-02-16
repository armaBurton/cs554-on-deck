// Models/Profiles.cs
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using Column = Supabase.Postgrest.Attributes.ColumnAttribute;

namespace backend.Models;

[Supabase.Postgrest.Attributes.Table("profiles")]
public class Profile : BaseModel
{
    [PrimaryKey("id", false)]
    public Guid ID { get; set; }

    [Column("first_name")]
    public string? FirstName { get; set; }

    [Column("last_name")]
    public string? LastName { get; set; }

    [Column("stage_name")]
    public string? StageName { get; set; }

    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [Column("create_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }
}
