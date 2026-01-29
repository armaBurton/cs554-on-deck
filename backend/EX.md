Of course. This is a comprehensive, step-by-step tutorial for setting up a full authentication system using Supabase with a React/TypeScript frontend and a C# backend.

### The Architecture at a Glance

In this setup, your application will have two main parts:

1.  **React (TypeScript) Frontend**: A single-page application (SPA) where users sign up, log in, and interact with your app. It will handle all direct communication with Supabase for authentication.
2.  **C# (ASP.NET Core) Backend**: A secure API that provides data and services. It will not handle the login process itself but will validate access tokens (JWTs) issued by Supabase to protect its endpoints.

This architecture is robust and scalable, offloading the complexity of user management to Supabase while maintaining a secure backend.

---

### **Part 1: Supabase Project Setup (The Foundation)**

First, you need to create and configure your Supabase project.

1.  **Create Your Project**:
    - Go to [supabase.com](https://supabase.com), sign up, and click "New Project".
    - Give your project a name, generate a secure database password, and choose the region closest to your users.

2.  **Find Your API Keys**:
    - Once the project is ready, navigate to the **Settings** (cog icon) > **API**.
    - You will need two values from this page: the **Project URL** and the `anon` **public** key.
    - Store these securely, as you will need them for both your frontend and backend.

3.  **Configure Authentication Providers**:
    - **Email/Password**: This is enabled by default. For easier testing, you can go to **Authentication** > **Providers** and temporarily disable the "Confirm email" requirement.
    - **OAuth Providers (e.g., Google, GitHub)**:
      - In the Supabase dashboard, go to **Authentication** > **Providers**.
      - Select the provider you want to add (e.g., Google).
      - Supabase will show you a **Redirect URI** (also called a callback URL). Copy this URL. It will look like `https://<your-project-ref>.supabase.co/auth/v1/callback`.
      - Go to your chosen provider's developer console (e.g., Google Cloud Console).
      - Create new OAuth 2.0 credentials for a web application.
      - In the provider's setup, paste the Redirect URI from Supabase into the "Authorized redirect URIs" field.
      - The provider will give you a **Client ID** and a **Client Secret**.
      - Go back to the Supabase dashboard and paste the Client ID and Client Secret into the corresponding fields for that provider.
      - Enable the provider. Repeat this for any other social logins you want to support.

---

### **Part 2: React & TypeScript Frontend Setup**

This is where your users will interact with the authentication system.

1.  **Create a React + TypeScript App**:
    It's recommended to use a modern build tool like Vite.

    ```bash
    npm create vite@latest my-supabase-app -- --template react-ts
    cd my-supabase-app
    ```

2.  **Install Supabase Client Library**:
    This package allows your frontend to communicate with Supabase.

    ```bash
    npm install @supabase/supabase-js
    ```

3.  **Initialize the Supabase Client**:
    - Create a `.env.local` file in the root of your project to store your Supabase credentials securely.

    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

    - Create a dedicated file, for example `src/supabaseClient.ts`, to initialize and export the Supabase client. This ensures you have a single instance to use across your app.

    ```typescript
    // src/supabaseClient.ts
    import { createClient } from "@supabase/supabase-js";

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        "Supabase URL and Anon Key must be provided in .env.local",
      );
    }

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
    ```

4.  **Implement Authentication UI & Logic**:
    - **Email & Password Signup**:

    ```typescript
    // Example in a React component
    import { supabase } from "./supabaseClient";

    async function handleSignUp(email, password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
        alert("Check your email for the login link!");
      } catch (error) {
        alert(error.message);
      }
    }
    ```

    - **Email & Password Login**:

    ```typescript
    // Example in a React component
    import { supabase } from "./supabaseClient";

    async function handleSignIn(email, password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) throw error;
        // The onAuthStateChange listener (below) will handle the session update.
      } catch (error) {
        alert(error.message);
      }
    }
    ```

    - **OAuth (Social) Login**:

    ```typescript
    // Example in a React component
    import { supabase } from "./supabaseClient";
    import type { Provider } from "@supabase/supabase-js";

    async function handleOAuthSignIn(provider: Provider) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
      });
      if (error) {
        console.error("Error signing in with OAuth:", error);
      }
    }

    // In your component's JSX:
    // <button onClick={() => handleOAuthSignIn('google')}>Login with Google</button>
    // <button onClick={() => handleOAuthSignIn('github')}>Login with GitHub</button>
    ```

5.  **Manage Session and State**:
    The best way to manage the user's session is to use React's Context API and the `onAuthStateChange` listener.
    - **Create an Auth Context**:

    ```typescript
    // src/AuthContext.tsx
    import React, { createContext, useContext, useEffect, useState } from 'react';
    import { supabase } from './supabaseClient';
    import type { Session, User } from '@supabase/supabase-js';

    const AuthContext = createContext<{ session: Session | null; user: User | null }>({
      session: null,
      user: null,
    });

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
      const [session, setSession] = useState<Session | null>(null);
      const [user, setUser] = useState<User | null>(null);

      useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
          }
        );

        // Fetch initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => {
          authListener.subscription.unsubscribe();
        };
      }, []);

      return (
        <AuthContext.Provider value={{ session, user }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => useContext(AuthContext);
    ```

    - **Wrap your app with the provider**:

    ```typescript
    // src/main.tsx
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App'
    import { AuthProvider } from './AuthContext'

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
      </React.StrictMode>,
    )
    ```

    - **Use the context in your components**:

    ```typescript
    // src/App.tsx
    import { useAuth } from './AuthContext';
    import { supabase } from './supabaseClient';

    function App() {
      const { user, session } = useAuth();

      if (!session) {
        // Show Login Form
        return <LoginForm />;
      }

      return (
        <div>
          <h1>Welcome, {user?.email}</h1>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
          {/* Your authenticated app content */}
        </div>
      );
    }
    ```

---

### **Part 3: C# Backend (ASP.NET Core API) Setup**

Your C# backend's job is to validate the JWT provided by the frontend.

1.  **Create an ASP.NET Core Web API Project**:
    Use the .NET CLI or Visual Studio to create a new Web API project.

2.  **Add Necessary NuGet Packages**:

    ```bash
    dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
    ```

3.  **Get Your Supabase JWT Secret**:
    This is the most critical step for the backend. The JWT secret is used to verify that the tokens were actually created by your Supabase project.
    - In your Supabase project dashboard, go to the **SQL Editor**.
    - Run the following query to reveal your secret:

    ```sql
    show app.settings.jwt_secret;
    ```

    - Copy the resulting key. **Treat this key like a password; it should never be exposed on the frontend.**

4.  **Configure JWT Authentication**:
    - Store your Supabase URL and JWT Secret in `appsettings.json`.

    ```json
    {
      "Supabase": {
        "Url": "YOUR_SUPABASE_PROJECT_URL",
        "JwtSecret": "YOUR_SUPABASE_JWT_SECRET"
      }
      // ... other settings
    }
    ```

    - In your `Program.cs` file, configure the authentication services.

    ```csharp
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;

    var builder = WebApplication.CreateBuilder(args);
    var supabaseSettings = builder.Configuration.GetSection("Supabase");
    var supabaseUrl = supabaseSettings["Url"];
    var supabaseSecret = supabaseSettings["JwtSecret"];

    // Add services to the container.
    builder.Services.AddControllers();

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(supabaseSecret)),
                ValidateIssuer = true,
                ValidIssuer = $"{supabaseUrl}/auth/v1", // e.g., https://<project-ref>.supabase.co/auth/v1
                ValidateAudience = true,
                ValidAudience = "authenticated",
                ValidateLifetime = true
            };
        });


    var app = builder.Build();

    // ...
    app.UseHttpsRedirection();

    app.UseAuthentication(); // This must come before UseAuthorization
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
    ```

5.  **Protect Your Endpoints**:
    Now you can use the `[Authorize]` attribute on any controller or action method that should be accessible only to authenticated users.

    ```csharp
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    [ApiController]
    [Route("[controller]")]
    [Authorize] // This entire controller now requires a valid Supabase JWT
    public class SecretDataController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            // You can access the user's Supabase ID (sub claim) like this:
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return Ok(new { Message = $"Hello user {userId}, this is a secret message!" });
        }
    }
    ```

---

### **Part 4: Connecting the Frontend and Backend**

The final step is to make authenticated API calls from React to your C# backend.

1.  **Get the Access Token on the Frontend**:
    The active session object from `supabase.auth.getSession()` contains the `access_token`.

2.  **Make the Authenticated API Call**:
    When calling a protected endpoint on your C# API, you must include the access token in the `Authorization` header.

    ```typescript
    // Example function in your React app
    import { supabase } from "./supabaseClient";

    async function fetchSecretData() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          throw new Error("User is not authenticated");
        }

        const response = await fetch("https://localhost:7001/SecretData", {
          // Your C# API URL
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data from C# backend:", data);
        return data;
      } catch (error) {
        console.error("Failed to fetch secret data:", error);
      }
    }
    ```

Your setup is now complete! You have a full-stack application that leverages Supabase for powerful and easy-to-use authentication, with a secure C# backend protecting your sensitive data and business logic.
