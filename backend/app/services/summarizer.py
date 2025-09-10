from openai import OpenAI
from app.models import AppData

# Connect to local Ollama endpoint via OpenAI client
ollama_client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

def summarize_with_ollama(app_data: AppData) -> str:
    prompt = f"""
    Summarize the health of this application for leadership:

    App: {app_data.name}
    Status: {app_data.status}
    Response Time: {app_data.responseTime}
    Incidents: {len(app_data.incidents)} open
    Changes: {len(app_data.changes)} upcoming
    Monitoring Environments: {len(app_data.monitoring)}
    Metrics: CPU={app_data.metrics.cpu}%, Memory={app_data.metrics.memory}%, 
             Processes={app_data.metrics.processes}, Utilization={app_data.metrics.utilization}%
    Last Checked: {app_data.lastChecked}

    Provide:
    1. Overall health
    2. Risks or red flags
    3. Trends/anomalies
    4. Monitoring gaps
    5. Recommendations
    """

    response = ollama_client.chat.completions.create(
        model="llama3.2",  # or "mistral", "llama2" etc.
        messages=[
            {"role": "system", "content": "You are an expert SRE assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    return response.choices[0].message.content
