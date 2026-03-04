// v2\backend\Models\Events\Events.cs
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using backend.Models.Events.DTOs;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using Column = Supabase.Postgrest.Attributes.ColumnAttribute;

namespace backend.Models.Events;

public class Event : BaseModel
{
    [PrimaryKey("id")]
    public Guid? Id { get; set; }

    [Column("user_id")]
    public Guid UserId { get; set; }

    [Column("venue")]
    public string Venue { get; set; } = string.Empty;

    [Column("street")]
    public string Street { get; set; } = string.Empty;

    [Column("city")]
    public string City { get; set; } = string.Empty;

    [Column("state")]
    public string State { get; set; } = string.Empty;

    [Column("zip")]
    public int Zip { get; set; }

    [Column("date")]
    public string Date { get; set; }

    [Column("signup")]
    public string Signup { get; set; }

    [Column("start")]
    public string Start { get; set; }

    [Column("finish")]
    public string Finish { get; set; }

    [Column("List")]
    public List<Attendee> Attendees { get; set; } = new();
}

public class Attendee : BaseModel
{
    public Guid? Id { get; set; }
    public Guid EventId { get; set; }
    public Guid? UserId { get; set; } // null = creator-added; set = self-registered
    public string AttendeeName { get; set; } = string.Empty;
    public char Attendance { get; set; } // 'A' | 'M' | 'N' | 'C'
    public string? Email { get; set; }
}
