from fastapi import APIRouter, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader
from pydantic import BaseModel, Field
from typing import List

router = APIRouter()

API_KEY = "secure1234567apikey"
API_KEY_NAME = "access_token"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def get_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized")
    return api_key

class Threat(BaseModel):
    id: int
    title: str
    riskLevel: str = Field(..., example="high")
    source: str
    tags: List[str]
    date: str
    url: str

threats = [
    {"id": 1, "title": "Phishing Attempt Detected", "riskLevel": "high", "source": "Email", "tags": ["phishing", "email"], "date": "2023-10-01", "url": "http://example.com/phishing"},
]

@router.get("/threat-feed", dependencies=[Depends(get_api_key)])
def read_threats():
    return threats

@router.post("/threats", dependencies=[Depends(get_api_key)])
def add_threat(threat: Threat):
    threats.append(threat.dict())
    return {"message": "Threat added", "data": threat}

@router.put("/threats/{threat_id}", dependencies=[Depends(get_api_key)])
def update_threat(threat_id: int, updated: Threat):
    for idx, threat in enumerate(threats):
        if threat["id"] == threat_id:
            threats[idx] = updated.dict()
            return {"message": "Updated", "data": updated}
    raise HTTPException(status_code=404, detail="Threat not found")

@router.delete("/threats/{threat_id}", dependencies=[Depends(get_api_key)])
def delete_threat(threat_id: int):
    global threats
    threats = [t for t in threats if t["id"] != threat_id]
    return {"message": "Deleted"}
