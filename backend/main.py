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
supabase: Client = create_client(url, key)
