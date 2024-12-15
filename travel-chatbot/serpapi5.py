from app5 import *
from chatbot5 import generate_response
from fetch_data import *


def handle_user_input(user_input):

    # Check for real-time data queries
    if "flight" in user_input.lower() : #or "hotel" in user_input.lower():
        destination = extract_destination(user_input)
        departure = extract_departure(user_input)  # Default departure code, replace with user input or another logic
        outbound_date = extract_date(user_input) # Default date, replace with user input or another logic
        return fetch_real_time_data(departure, destination, outbound_date)

    # Delegate to chatbot for general conversation
    response = generate_response(user_input)
    return response
user_input = "I need a round trip flight from LAX to LHR on 2024-12-15 and return in 2024-12-20"
response = handle_user_input(user_input)

print(response)
