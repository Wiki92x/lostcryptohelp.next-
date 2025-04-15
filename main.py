from fastapi import FastAPI
from routers.threat_router import router as ThreatRouter

app = FastAPI(title="LostCryptoHelp Threat Hub")

app.include_router(ThreatRouter, prefix="/api")
