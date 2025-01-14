from flask import Flask, render_template, request, jsonify
from chatbot import chat_bot, reset_user_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("/travelbot2/src/Components/ChatPage.jsx")

@app.route("/api/chat", methods=["POST"])
def chat():
    user_input = request.json.get('message')
    # Process user input and generate a response
    response = chat_bot(user_input)
    return jsonify({'response': response})

@app.route("/api/reset", methods=["POST"])
def reset():
    # Clear the session or reset state
    print("Reset endpoint called!")
    first_question = reset_user_data()
    return jsonify({"message": "Session reset successfully.", "response": first_question}), 200

if __name__ == "__main__":
     #app.run(debug=True)
     app.run(debug=True, host="0.0.0.0", port=8000)