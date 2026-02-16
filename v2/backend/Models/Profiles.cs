// Models/Profiles.cs
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

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
    public string? stage_name { get; set; }

    [Column("email")]
    public stringEmail value_name { get; set; } = string.Empty();

    [Column("create_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }
}
