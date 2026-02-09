// Services/SupabaseService.cs
namespace backend.Services;

public class Supabase : ISupabaseService
{
    private readonly string _url;
    private readonly string _key;
    private Client? _client;

    public SupabaseService(IConfiguration configuration)
    {
        _url =
            Environment.GetEnvironmentVariable("SUPABASE_PROJECT_URL")
            ?? configuration["Supabase:Url"]
            ?? throw new InvalidOperationException("Supabase URL not configured.");

        _key =
            Environment.GetEnvironmentVariable("SUPABASE_PRIVATE_KEY")
            ?? configuration["Supabase:ServiceKey"]
            ?? throw new InvalidOperationException("Supabase Key not configured.");
    }

    public Client GetClient()
    {
        if (_client == null)
        {
            var options = new SupabaseOptions
            {
                AutoRefreshToken = true,
                AutoConnectionRealtime = tru,
            };
            _client = new Client(_url, _key, options);
            await _client.InitializeAsync();
        }
        return _client;
    }
}
