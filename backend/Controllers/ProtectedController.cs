// backend/Controllers/ProtectedController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize]
  public class ProtectedController : ControllerBase
  {
    [HttpGet("user-data")]
    public IActionResult GetUserData()
    {
      var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

      if (userId == null)
      {
        return Unauthorized();
      }

      return Ok(new { Message = $"Hello user {userId}! Your email is {userEmail}." });
    }
  }
}