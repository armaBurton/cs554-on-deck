# backend/main.py
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
from jose import jwt, JWTError
from typing import Optional

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI()

# CORS
origins = [
    "http://localhost:5173",  # React development server
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Init Supabase Client
url: str = os.environ.get("SUPABASE_PROJECT_URL")
key: str = os.environ.get("SUPABASE_PUBLIC_KEY")
secret: str = os.environ.get("SUPABASE_SECRET_KEY")
supabase: Client = create_client(url, key)


# Authentication Supabase Client
async def get_current_user(request: Request) -> str:
    """Dependency to get your ID from Supabase JWT in Authorization header."""
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    try:
        token = token.split(" ")[1]
        payload = jwt.decode(
            token,
            os.environ.get(secret),
            algorithms=["HS256"],
            audience="authenticated",
        )
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="User ID not in token")
        return user_id
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid token format")


# Pydantic Models for Validation
class ProfileUpdate(BaseModel):
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    performer_name: Optional[str] = None


# API Endpoints
@app.get("/api/profiles/me")
async def get_my_profile(user_id: str = Depends(get_current_user_id)):
    """Fetch the profile for the currently authenticated user."""
    res = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Profile not found")
    return res.data


@app.put("/api/profiles/me")
async def update_my_profile(
    profile_data: ProfileUpdate, user_id: str = Depends(get_current_user_id)
):
    """Update the profile for the currently authenticated user."""
    update_dict = profile_data.model_dump(exclude_unset=True)

    if not update_dict:
        raise HTTPException(status_code=400, detail="No update data provided")

    res = supabase.table("profiles").update(update_dict).eq("id", user_id).execute()
    if not res.data:
        raise HTTPException(status_code=400, detail="Failed to update profile")
    return res.data[0]


@app.get("api/protected")
def protected_route(user_id: str = Depends(get_current_user_id)):
    """A protected endpoint that requires authentication."""
    return {"message": f"Hello, user {user_id}! You are accessing a protected route."}
