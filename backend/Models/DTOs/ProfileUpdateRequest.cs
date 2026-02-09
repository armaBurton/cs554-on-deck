// Models/DTOs/ProfileUpdateRequest.cs
namespace backend.Models.DTOs;

public class ProfileUpdateRequest
{
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public string? StageName { get; set; }
}