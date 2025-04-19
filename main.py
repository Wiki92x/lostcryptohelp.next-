from fastapi import FastAPI, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader
from pydantic import BaseModel, Field
from typing import List

app = FastAPI()

API_KEY = "secure1234567apikey"
API_KEY_NAME = "access_token"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

async def get_api_key(api_key: str = Depends(api_key_header)):
    if api_key == API_KEY:
        return api_key
    raise HTTPException(status_code=403, detail="Unauthorized")

class Threat(BaseModel):
    id: int
    title: str
    riskLevel: str = Field(..., example="high")
    source: str
    tags: List[str]
    date: str
    url: str

threats = [
  {
    "id": 1,
    "title": "⚠️ Honeypot Rug Detected",
    "riskLevel": "high",
    "source": "Onchain Scanner",
    "tags": ["honeypot", "rug", "BSC"],
    "date": "2025-04-16",
    "url": "https://bscscan.com/token/0x123..."
  },
  {
    "id": 2,
    "title": "🚨 Airdrop Phishing Site",
    "riskLevel": "medium",
    "source": "Telegram Alert",
    "tags": ["phishing", "airdrop", "social"],
    "date": "2025-04-16",
    "url": "https://scam-alert.xyz"
  }
]

@app.get("/api/threat-feed", dependencies=[Depends(get_api_key)])
async def read_threats():
    return {"data": threats}

@app.post("/api/threats", dependencies=[Depends(get_api_key)])
async def add_threat(threat: Threat):
    threats.append(threat.dict())
    return {"message": "Added", "data": threat}