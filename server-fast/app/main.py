from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from .api.userRoutes import router as user_router
from .functions.routes import router as function_router
from .middleware.verification import verify_request
from .db.database import database
from .utils.init import initialize 
import os
import mimetypes

# Ensure correct MIME types are registered
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("text/html", ".html")

app = FastAPI()

# Static directory setup
static_dir = "/app/wam/dist"
assets_dir = os.path.join(static_dir, "assets")

# CORS configuration for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount assets for direct access
if os.path.exists(assets_dir):
    app.mount("/wam/assets", StaticFiles(directory=assets_dir), name="assets")

# SPA Fallback for /wam routes
@app.get("/wam/{full_path:path}")
async def serve_spa(full_path: str):
    file_path = os.path.join(static_dir, full_path)
    if os.path.isfile(file_path):
        # Serve the requested file if it exists
        return FileResponse(file_path, media_type=mimetypes.guess_type(file_path)[0] or "application/octet-stream")
    
    # Fallback to index.html for unmatched routes
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path, media_type="text/html")

    raise HTTPException(status_code=404, detail="File not found")

@app.on_event("startup")
async def startup():
    await initialize()
    await database.connect()
    

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Include routers
app.include_router(user_router, prefix="/api/users")
app.include_router(function_router, prefix="/functions", dependencies=[Depends(verify_request)])