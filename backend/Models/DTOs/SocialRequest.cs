// Models/DTOs/SocialRequest.cs
namespace backend.Models.DTOs;

public class SocialRequest
{
  public string Platform { get; set; } = string.Empty;
  public string Url { get; set; } = string.Empty;
}