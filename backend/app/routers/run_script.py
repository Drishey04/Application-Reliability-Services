from fastapi import APIRouter, WebSocket
import asyncio

router = APIRouter()

@router.websocket("/ws/run-script")
async def websocket_run_script(websocket: WebSocket):
    await websocket.accept()
    logs = [
        "🚀 Starting automation script...",
        "🔍 Checking prerequisites...",
        "⚙️ Running step 1: Validating input...",
        "⚙️ Running step 2: Connecting to server...",
        "⚙️ Running step 3: Deploying changes...",
        "⚙️ Running step 4: Verifying results...",
        "✅ Script completed successfully!"
    ]

    for log in logs:
        await websocket.send_text(log)
        await asyncio.sleep(1.5)  # simulate script runtime

    await websocket.close()
