from flask import Flask, request, jsonify
from flask_cors import CORS
from agents import evaluate_credit_request

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"message": "OK"}), 200

@app.route('/api/evaluate-credit', methods=['POST'])
def evaluate_credit():
    try:
        data = request.json
        print(f"Received data: {data}")
        evaluation = evaluate_credit_request(data)
        print(f"Evaluation result: {evaluation}")
        return jsonify(evaluation.model_dump()), 200
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
    
if __name__ == '__main__':
    app.run(debug=True, port=5001)