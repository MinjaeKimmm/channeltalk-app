from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from .functions.routes import router as function_router
from .middleware.verification import verify_request
from .utils.init import initialize
import os
import logging

app = FastAPI()

# Static directory setup
static_dir = "/app/wam/dist"

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CORS configuration for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/wam/{wam_name:path}")
async def serve_wam(wam_name: str):
    logger.info(f"Requested WAM: {wam_name}")
    if "assets" in wam_name:
        wam_path = os.path.join(static_dir, "/".join(wam_name.split("/", 1)[1:]))
        logger.info(f"Requested asset: {wam_path}")
        if os.path.exists(wam_path):
            logger.info(f"Found WAM: {wam_name}")
            if wam_name.endswith(".css"):
                return FileResponse(wam_path, media_type="text/css")
            elif wam_name.endswith(".js"):
                return FileResponse(wam_path, media_type="application/javascript")
    else:
        wam_path = os.path.join(static_dir, "index.html")
        if os.path.exists(wam_path):
            return FileResponse(wam_path, media_type="text/html")
    raise HTTPException(status_code=404, detail="File not found")


@app.on_event("startup")
async def startup():
    await initialize()
    # await database.connect()


@app.on_event("shutdown")
async def shutdown():
    pass
    # await database.disconnect()


# Include routers
app.include_router(
    function_router, prefix="/functions", dependencies=[Depends(verify_request)]
)
