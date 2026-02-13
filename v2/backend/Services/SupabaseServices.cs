using Supabase;

namespace backend.Services;

public class SupabaseService : ISupabaseService
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
            ?? configuration["Supabase:"]
            ?? throw new InvalidOperationException("Supabase Key not configured.");
    }

    public Client GetClient()
    {
        if (_client == null)
        {
            var options = new SupabaseOptions { AutoRefreshToken = true };
            _client = new Client(_url, _key, options);
            _client.InitializeAsync();
        }
        return _client;
    }

    public async Task<Client> GetClientAsync()
    {
        if (_client == null)
        {
            _client = new Client(_url, _key);
            await _client.InitializeAsync();
        }
        return _client;
    }
}
