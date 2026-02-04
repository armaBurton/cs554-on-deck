// frontend/src/views/Profile/Profile.tsx
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import type { AuthSession } from "@supabase/supabase-js";

interface Profile {
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  performer_name: string | null;
}

const Profile = ({ session }: { session: AuthSession }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) throw new Error("Not authenticated");

        const response = await fetch("http://localhost:8000/api/profiles/me", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        alert((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [session]);

  const updateProfile = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profile) return;

    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch("http://localhost:8000/api/profiles/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      alert("Profile updated");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <div>
          <h2>Your Profile</h2>
          <form onSubmit={updateProfile}>
            <div>Email: {session.user.email}</div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={profile?.first_name || ""}
              />
            </div>
            <div></div>
          </form>
        </div>
      )}
    </>
  );
};
