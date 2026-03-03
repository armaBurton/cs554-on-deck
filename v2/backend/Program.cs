// Program.cs
using System.Text;
using backend.Models.Events.DTOs;
using backend.Models.Profile.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

var _jwtSecret = builder.Configuration["Supabase:JwtSecret"];
var _supabaseUrl = builder.Configuration["Supabase:Url"];
var _anonKey = builder.Configuration["Supabase:AnonKey"];

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "On Deck Supabase API", Version = "v1" });
    c.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer",
        }
    );
    c.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer",
                    },
                },
                Array.Empty<string>()
            },
        }
    );
});

var supabase = new Supabase.Client(_supabaseUrl!, builder.Configuration["Supabase:AnonKey"]);
await supabase.InitializeAsync();

builder.Services.AddSingleton<ISupabaseService, SupabaseService>();

var allowedOrigins =
    builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? new[] { "http://localhost:5173" };

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy.WithOrigins(allowedOrigins).AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        }
    );
});

builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret!)),
            ValidateIssuer = true,
            ValidIssuer = $"{_supabaseUrl}/auth/v1",
            ValidateAudience = true,
            ValidAudience = "authenticated",
            ValidateLifetime = true,
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddSingleton(supabase);
builder.Services.AddScoped<EventsService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
