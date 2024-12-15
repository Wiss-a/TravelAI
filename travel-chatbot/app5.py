from flask import Flask, render_template, request, jsonify
from chatbot5 import generate_response
from fetch_data import *

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("chat.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    # Check for real-time data queries
    if "flight" in user_input.lower() : #or "hotel" in user_input.lower():
        destination = extract_destination(user_input)
        departure = extract_departure(user_input)
        outbound_date =extract_date(user_input)
        data = fetch_real_time_data(departure, destination, outbound_date)
        return jsonify({"response": data})

    # Delegate to chatbot for general conversation
    response = generate_response(user_input)
    return jsonify({"response": response})


def extract_destination(user_input):

    keywords = user_input.lower().split()
    if "to" in keywords:
        index = keywords.index("to") + 1
        return keywords[index] if index < len(keywords) else "unknown"
    return "unknown"
def extract_departure(user_input):
    keywords = user_input.lower().split()
    if "to" in keywords:
        index = keywords.index("from") + 1
        return keywords[index] if index < len(keywords) else "unknown"
    return "unknown"

def extract_date(user_input):

    import re
    date_pattern = r"\d{4}-\d{2}-\d{2}"  # Matches dates like 2024-12-15
    match = re.search(date_pattern, user_input)
    return match.group() if match else None
def handle_user_input(user_input):
    """
    Processes the user input and returns appropriate responses.
    """
    # Check for real-time data queries
    if "flight" in user_input.lower() : #or "hotel" in user_input.lower():
        destination = extract_destination(user_input)
        departure = "lax"  # Default departure code, replace with user input or another logic
        outbound_date = "2024-12-15"  # Default date, replace with user input or another logic
        return fetch_real_time_data(departure, destination, outbound_date)

    # Delegate to chatbot for general conversation
    response = generate_response(user_input)
    return response

if __name__ == "__main__":
    app.run(debug=True)
