// v2\backend\Models\Events\Events.cs
using backend.Models.Events.DTOs;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using Column = Supabase.Postgrest.Attributes.ColumnAttribute;

namespace backend.Models.Events;

[Table("events")]
public class Event : BaseModel
{
    [PrimaryKey("id")]
    public Guid? Id { get; set; }

    [@Column("user_id")]
    public Guid UserId { get; set; }

    [@Column("venue")]
    public string Venue { get; set; } = string.Empty;

    [@Column("street")] // was "street"
    public string Street { get; set; } = string.Empty;

    [@Column("city")]
    public string City { get; set; } = string.Empty;

    [@Column("state")]
    public string State { get; set; } = string.Empty;

    [@Column("zip")] // was "zip"
    public int Zip { get; set; }

    [@Column("date")]
    public string Date { get; set; } = string.Empty;

    [@Column("signup")] // was "signup"
    public string Signup { get; set; } = string.Empty;

    [@Column("start")] // was "start"
    public string Start { get; set; } = string.Empty;

    [@Column("stop")] // was "finish"
    public string Finish { get; set; } = string.Empty;

    // No [@Column] — not a DB column, loaded separately
    // public List<Attendee> Attendees { get; set; } = new();
}

[Table("event_attendees")]
public class Attendee : BaseModel
{
    [PrimaryKey("id")]
    public Guid? Id { get; set; }

    [@Column("event_id")]
    public Guid EventId { get; set; }

    [@Column("user_id")]
    public Guid? UserId { get; set; }

    [@Column("attendee_name")]
    public string AttendeeName { get; set; } = string.Empty;

    [@Column("attendance")]
    public char Attendance { get; set; }

    [@Column("email")]
    public string? Email { get; set; }
}
