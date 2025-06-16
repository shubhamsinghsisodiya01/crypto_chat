from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/price', methods=['GET'])
def get_price():
    coin = request.args.get('coin', 'bitcoin')
    response = requests.get(f'https://api.coingecko.com/api/v3/simple/price?ids={coin}&vs_currencies=usd')
    return jsonify(response.json())

@app.route('/trending', methods=['GET'])
def get_trending():
    response = requests.get('https://api.coingecko.com/api/v3/search/trending')
    return jsonify(response.json())


    
@app.route('/stats', methods=['GET'])
def get_stats():
    coin = request.args.get('coin', 'bitcoin')
    response = requests.get(f'https://api.coingecko.com/api/v3/coins/{coin}')
    data = response.json()

    if all(key in data for key in ('symbol', 'market_data', 'description')):
        stats = {
            'symbol': data['symbol'],
            'market_cap': data['market_data']['market_cap'].get('usd', 'N/A'),
            '24h_change': data['market_data']['price_change_percentage_24h'],
            'description': data['description']['en'][:150]  # Take first 150 characters
        }
        return jsonify(stats)
    else:
        return jsonify({'error': 'Data could not be retrieved'}), 500

if __name__ == '__main__':
    app.run(debug=True)