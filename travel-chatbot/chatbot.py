import user_data
from serpapi.google_search import GoogleSearch


def chat_bot(user_input):
    if user_input is None or user_input.strip() == "":
        return "Hello! What is your budget for this trip?"

    if user_data.user.budget is None:
        user_data.user.set_budget(user_input)
        return "Great! Where would you like to travel to?"


    if user_data.user.destination is None:
        user_data.user.set_destination(user_input)
        return "Where are you departing from ?"

    if user_data.user.departure is None:
        user_data.user.set_departure(user_input)
        return "When are you planning to travel?"

    if user_data.user.date is None:
        user_data.user.set_date(user_input)

    return get_travel_plan()
def get_travel_plan():
    # Generate Gemini's response
    gemini_prompt = generate_gemini_prompt()
    gemini_response = generate_response(gemini_prompt)

    #Fetch real-time flight and hotel data
    flight_data = fetch_flights_serpapi(user_data.user.destination,user_data.user.date)
    hotel_data = fetch_hotels_serpapi(user_data.user.destination, user_data.user.budget)

    final_plan = f"**Flight Options:**\n{flight_data}\n\n**Hotel Recommendations:**\n {hotel_data}\n\n{gemini_response}\n\n"
   # final_plan = f"{gemini_response}\n\n"

    return final_plan


def generate_gemini_prompt():
    gemini_prompt = f"""
    Based on the user's preferences:
    - Budget: {user_data.user.budget}
    - Destination: {user_data.user.destination}
    - Departure: {user_data.user.departure}
    - Date: {user_data.user.date}


    Generate a travel plan, including:
    - brief potential activities or points of interest without a conclusion or note in the end 

    Present the information in a concise and user-friendly format.
    """
    return gemini_prompt
def reset_user_data():
    user_data.user.reset()
    return "Hello! What is your budget for this trip?"

import google.generativeai as genai
GEMINI_API_KEY = "AIzaSyAo7TQE4VJkjJmXFCcsafSTH8HQKfozRFM"

genai.configure(api_key=GEMINI_API_KEY)

def generate_response(gemini_prompt: str):
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(gemini_prompt)
    return response.text

def fetch_flights_serpapi(destination, date):
    query = f"One-Way Flights from {user_data.user.departure} to {user_data.user.destination} departing {user_data.user.date} "
    params = {
        "q": query,
        "location_requested": {user_data.user.departure},
        "hl": "en",
        "gl": "us",
        "api_key": "93109e2809fa462dc75ad39c8c5652fcc3c0b8d242f6e133635e7ac8218d6b96"  # Replace with your SerpAPI key
    }

    search = GoogleSearch(params)

    try:
        results = search.get_dict()

        # Access specific data from the results
        if 'answer_box' in results and 'flights' in results["answer_box"]:
            flights = results["answer_box"]["flights"]
            if flights:
                for flight_info in flights:
                    flight_info = flights[0]["flight_info"]
                    flight_sentence = f"Flight by {flight_info[0]}: Duration {flight_info[1]}, {flight_info[2]}, starting {flight_info[3]}"

                    return flight_sentence

            else:
                return "No Direct flight available"
        else:
            return "No data found."
    #return flight_data
    except Exception as e:
        return f"An error occurred: {str(e)}"

def fetch_hotels_serpapi(destination, budget):
    query = f"hotels in {user_data.user.destination}"
    params = {
        "q": query,
        "hl": "en",
        "gl": "us",
        "api_key": "93109e2809fa462dc75ad39c8c5652fcc3c0b8d242f6e133635e7ac8218d6b96"
    }
    search = GoogleSearch(params)

    try:
        results = search.get_dict()

        # Access specific data from the results
        if 'answer_box' in results and 'hotels' in results["answer_box"]:
            hotels = results["answer_box"]["hotels"]
            if hotels:
                hotel_details = []
                for hotel in hotels:
                    title = hotel.get("title")
                    price = hotel.get("price")
                    if title and price:
                        hotel_details.append(f"\n {title}, {price} per night\n")

                if hotel_details:
                    return "\n".join(hotel_details)
                else:
                    return "No hotel details available."
            else:
                return "No hotel data available."
        else:
            return "No hotel data found."
    except Exception as e:
        return f"An error occurred: {str(e)}"
