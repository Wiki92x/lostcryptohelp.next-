from fastapi import FastAPI, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader
from pydantic import BaseModel
from typing import List
import os

app = FastAPI()

API_KEY = os.getenv("API_KEY")
api_key_header = APIKeyHeader(name="access_token", auto_error=False)

def get_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return api_key

class Threat(BaseModel):
    id: int
    title: str
    riskLevel: str
    source: str
    tags: List[str]
    date: str
    url: str

# Fake in-memory DB
threats = []

@app.get("/api/threat-feed", dependencies=[Depends(get_api_key)])
def get_threats():
    return threats

@app.post("/api/threats", dependencies=[Depends(get_api_key)])
def add_threat(threat: Threat):
    threats.append(threat.dict())
    return {"message": "Added", "data": threat}
