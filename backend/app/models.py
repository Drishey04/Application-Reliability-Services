from pydantic import BaseModel
from typing import List, Dict, Optional

# --------------------
# AI Summarizer Models
# --------------------
# class SummarizeRequest(BaseModel):
#     app_name: str
#     incidents: List[str]
#     changes: List[str]
#     monitoring: Dict[str, List[str]]
#     metrics: Dict[str, str]  # e.g. {"CPU": "45%", "Memory": "2.1GB"}
#     logs: Optional[List[str]] = None


# class SummarizeResponse(BaseModel):
#     app_name: str
#     summary: str


# # --------------------
# # Automation Script Models
# # --------------------
# class ScriptRunRequest(BaseModel):
#     script_name: str


# class ScriptLogResponse(BaseModel):
#     message: str
#     completed: bool = False


class AppData(BaseModel):
    app_name: str
    description: str
    owner: str
    incidents: List[str] = []
    changes: List[str] = []
    monitoring: Dict[str, List[str]] = {}
    metrics: Dict[str, str] = {}
    logs: Optional[List[str]] = None



