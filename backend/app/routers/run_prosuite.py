# backend/app/routers/run_prosuite.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import sys
import asyncio
from app.services.prosuite import ProSuiteRunner
 
router = APIRouter()

@router.websocket("/ws/run-prosuite")
async def run_prosuite(websocket: WebSocket):
    await websocket.accept()
    queue = asyncio.Queue()

    try:
        # ✅ Receive credentials from frontend
        creds = await websocket.receive_json()
        username = creds.get("username")
        password = creds.get("password")

        runner = ProSuiteRunner(username, password)

        # redirect stdout into queue
        old_stdout = sys.stdout

        class WSWriter:
            def write(self, msg):
                if msg.strip():
                    queue.put_nowait(msg.strip())
            def flush(self): 
                pass

        sys.stdout = WSWriter()

        async def sender():
            """Send messages from queue to websocket"""
            try:
                while True:
                    msg = await queue.get()
                    await websocket.send_text(msg)
            except WebSocketDisconnect:
                pass
            except RuntimeError:
                pass

        sender_task = asyncio.create_task(sender())

        try:
            runner.main()
        finally:
            sys.stdout = old_stdout
            await queue.put("✅ Script execution finished")

        # allow sender to flush then cancel
        await asyncio.sleep(0.1)
        sender_task.cancel()
        try:
            await sender_task
        except asyncio.CancelledError:
            pass

    except WebSocketDisconnect:
        print("⚠️ Client disconnected")
    except Exception as e:
        try:
            await websocket.send_text(f"❌ Error: {str(e)}")
        except RuntimeError:
            pass
    finally:
        if websocket.client_state.name != "DISCONNECTED":
            await websocket.close()