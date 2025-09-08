from fastapi import APIRouter, WebSocket
import asyncio
import datetime

router = APIRouter()

@router.websocket("/ws/run-script")
async def run_script(websocket: WebSocket):
    await websocket.accept()

    # Dummy script simulation
    steps = [
        "Starting automation script...",
        "Connecting to server...",
        "Checking prerequisites...",
        "Deploying changes...",
        "Verifying services...",
        "Cleaning up temporary files...",
        "Script execution completed successfully!"
    ]

    logs = []
    for step in steps:
        timestamp = datetime.datetime.now().strftime("%H:%M:%S")
        log_line = f"[{timestamp}] {step}"
        logs.append(log_line)

        await websocket.send_text(log_line)
        await asyncio.sleep(1)  # simulate delay

    # Indicate script completion and send logs for saving
    await websocket.send_json({"status": "done", "logs": logs})
    await websocket.close()
