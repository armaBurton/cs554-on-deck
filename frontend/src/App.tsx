// frontend/src/App.tsx
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import type { AuthSession } from "@supabase/supabase-js";

export const App = () => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [protectedData, setProtectedData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    error
      ? alert(error.message)
      : alert("Check your email for the login link!");

    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Error logging in with Google:", error);
  };

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setProtectedData(null);
    setLoading(false);
  };

  const getProtectedData = async () => {
    if (!session) {
      alert("You must be logged in to access this data.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://localhost:7123/api/protected/user-data",
        {
          headers: {
            Authorization: `Bearer ${sesson.access_token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setProtectedData(data);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Full Stack App with Supabase Auth</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user.email}!</p>
          <button onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
          </button>
          <hr />
          <button onClick={getProtectedData} disabled={loading}>
            {loading ? "Fetching..." : "Fetch Protected Backend Data"}
          </button>
          {protectedData && (
            <pre>
              <code>{JSON.stringify(protectedData, null, 2)}</code>
            </pre>
          )}
        </div>
      ) : (
        <div>
          <h2>Login or Sign Up</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Working..." : "Login with Email"}
            </button>
          </form>
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Working..." : "Sign Up with Email"}
            </button>
          </form>
          <hr />
          <button onClick={handleGoogleLogin} disabled={loading}>
            {loading ? "Working..." : "Login with Google"}
          </button>
        </div>
      )}
    </div>
  );
};

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App;
