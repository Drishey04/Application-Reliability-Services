from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.routers import run_script
from app.routers import run_prosuite
import subprocess
 
app = FastAPI()

# ✅ Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:3000"],  # React dev server
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(run_script.router)
app.include_router(run_prosuite.router)

@app.websocket("/ws/run-script")
async def run_script_ws(websocket: WebSocket):
    await websocket.accept()
    try:
        # Simulate log streaming
        for i in range(6):
            await websocket.send_text(f"Step {i+1}: Executing operation...")
            await asyncio.sleep(1)
        await websocket.send_text("✅ Script completed successfully.")
    except WebSocketDisconnect:
        print("Client disconnected")
    finally:
        await websocket.close()

        
# @app.post("/run-script")
# async def run_script():
#     # Dummy command, replace with real script
#     process = subprocess.Popen(
#         ["echo", "Hello from script!"],
#         stdout=subprocess.PIPE,
#         stderr=subprocess.PIPE,
#         text=True
#     )
#     stdout, stderr = process.communicate()
#     return {"stdout": stdout, "stderr": stderr, "exit_code": process.returncode}
