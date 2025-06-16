
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

COINGECKO_API_BASE = "https://api.coingecko.com/api/v3"

# Helper function to handle external API calls with basic error handling
def fetch_from_coingecko(endpoint, params=None):
    try:
        response = requests.get(f"{COINGECKO_API_BASE}/{endpoint}", params=params, timeout=5)
        response.raise_for_status()  # Raises HTTPError for bad responses (4xx or 5xx)
        return response.json()
    except requests.exceptions.RequestException as e:
        # Log the error in production or send it to monitoring
        return {"error": "Failed to fetch data from CoinGecko", "details": str(e)}


@app.route('/price', methods=['GET'])
def get_price():
    """
    Fetch the current USD price of a given cryptocurrency.
    Query Param: coin (default: 'bitcoin')
    """
    coin = request.args.get('coin', 'bitcoin')
    data = fetch_from_coingecko("simple/price", {"ids": coin, "vs_currencies": "usd"})

    if "error" in data:
        return jsonify(data), 500
    return jsonify(data)


@app.route('/trending', methods=['GET'])
def get_trending():
    """
    Get the list of trending cryptocurrencies.
    """
    data = fetch_from_coingecko("search/trending")

    if "error" in data:
        return jsonify(data), 500
    return jsonify(data)


@app.route('/stats', methods=['GET'])
def get_stats():
    """
    Get basic stats of a given coin:
    - Symbol
    - Market Cap (USD)
    - 24h Price Change (%)
    - Brief description (first 150 chars)
    Query Param: coin (default: 'bitcoin')
    """
    coin = request.args.get('coin', 'bitcoin')
    data = fetch_from_coingecko(f"coins/{coin}")

    if "error" in data:
        return jsonify(data), 500

    try:
        stats = {
            "symbol": data['symbol'],
            "market_cap": data['market_data']['market_cap'].get('usd', 'N/A'),
            "24h_change": data['market_data']['price_change_percentage_24h'],
            "description": data['description']['en'][:150]
        }
        return jsonify(stats)
    except (KeyError, TypeError):
        return jsonify({"error": "Invalid data structure returned from CoinGecko"}), 500


@app.route('/price/chart', methods=['GET'])
def get_price_chart():
    """
    Fetch 7-day price chart data for a given coin.
    Query Param: coin (default: 'bitcoin')
    """
    coin = request.args.get('coin', 'bitcoin')
    data = fetch_from_coingecko(f"coins/{coin}/market_chart", {"vs_currency": "usd", "days": "7"})

    if "error" in data:
        return jsonify(data), 500

    return jsonify({
        "prices": data.get("prices", [])
    })


if __name__ == '__main__':
    app.run(debug=True)