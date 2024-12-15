from serpapi.google_search import GoogleSearch

def fetch_real_time_data(departure, destination, outbound_date, return_date=None):

    # Convert inputs to uppercase
    departure_code = departure.upper()
    destination_code = destination.upper()

    # Construct search query based on user input
    if return_date:
        query = f"Round-Trip Flights from {departure_code} to {destination_code} departing {outbound_date} and returning {return_date}"
    else:
        query = f"One-Way Flights from {departure_code} to {destination_code} departing {outbound_date}"

    params = {
        "q": query,
        "location_requested": departure,
        "hl": "en",
        "gl": "us",
        "api_key": "dfad916df746091fbf572ff1cfe493838fd9d1936a7a52310ba753ab109ad0bc"  # Replace with your SerpAPI key
    }

    # Initialize GoogleSearch
    search = GoogleSearch(params)

    # Fetch results
    try:
        results = search.get_dict()

        # Access specific data from the results
        if 'answer_box' in results and 'flights' in results["answer_box"]:
            flights = results["answer_box"]["flights"]
            if flights:
                #flight_info_sentences = []
                for flight_info in flights:
                    flight_info = flights[0]["flight_info"]
                    flight_sentence = f"Flight by {flight_info[0]}: Duration {flight_info[1]}, {flight_info[2]}, starting at {flight_info[3]}"
                    #flight_info_sentences.append(flight_sentence)
                #response = "\n".join(flight_info_sentences)
                #return response or "No data found."
                    return flight_sentence

            else:
                return "No flight data available."
        else:
            return "No data found."

    except Exception as e:
        return f"An error occurred: {str(e)}"
