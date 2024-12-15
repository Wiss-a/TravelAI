import google.generativeai as genai
GEMINI_API_KEY = "AIzaSyAo7TQE4VJkjJmXFCcsafSTH8HQKfozRFM"

genai.configure(api_key=GEMINI_API_KEY)

def generate_response(prompt: str):
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    print(response.text)
    return response.text

"""
def extract_destination(user_input):
  
    keywords = user_input.lower().split()
    if "to" in keywords:
        index = keywords.index("to") + 1
        return keywords[index] if index < len(keywords) else "unknown"
    return "unknown"


def handle_user_input(user_input):
    
    # Check for real-time data queries
    if "flight" in user_input.lower() or "hotel" in user_input.lower():
        destination = extract_destination(user_input)
        departure = extract_destination(user_input)  # Default departure code, replace with user input or another logic
        outbound_date = "2024-12-15"  # Default date, replace with user input or another logic
        return fetch_real_time_data(departure, destination, outbound_date)

    # Delegate to chatbot for general conversation
    response = generate_response(user_input)
    return response
"""