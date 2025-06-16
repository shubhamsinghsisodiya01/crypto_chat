#  Crypto Chat – Conversational Web App for Crypto Info

Built with **React** on the frontend and **Flask** on the backend, with the help of [CoinGecko API](https://www.coingecko.com/en/api).

---

##  Features

 Ask natural-language queries like:
- “What’s ETH trading at right now?”
- “Which coins are trending today?”
- “Show ETH stats”
- “I have 2 ETH”
- “What’s my portfolio value?”
- “Show ETH chart”

 Key capabilities:
- Live ETH price retrieval  
- Trending coin listings  
- Basic market stats (symbol, market cap, 24h change, description)  
- Track ETH holdings and view live portfolio value  
- Render 7-day ETH price chart  
- Simulated voice replies and typing indicator  

---

## Tech Stack

| Frontend     | Backend       | API          |

| React        | Flask (Python) | CoinGecko API |
| Axios        | Requests       |              |
| Chart.js (or Recharts) | Flask-CORS     |              |

---

##  Project Structure

```
crypto-chat/
│
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBubble.js
│   │   │   ├── ChatInput.js
│   │   │   ├── MicButton.js
│   │   │   └── PriceChart.js
│   │   ├── App.js
│   │   └── GlobalStyles.css
│   └── package.json
│
├── backend/               # Flask backend
│   ├── app.py
│   └── requirements.txt
│
├── README.md
```

---

## 🧑‍💻 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

---

### 🔧 Backend (Flask API)

```bash
# 1. Navigate to server directory
cd server

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the Flask server
python app.py
```

By default, it runs on:  
**http://localhost:5000**

---

### 💻 Frontend (React UI)

```bash
# 1. Navigate to client directory
cd client

# 2. Install dependencies
npm install

# 3. Start React app
npm start
```

App will open at:  
**http://localhost:3000**

---

## 📦 Example API Endpoints (Flask)

 Endpoint            Description                      

 `/price?coin=eth`  - Get real-time ETH price          
 `/trending`        -List trending cryptocurrencies   
 `/stats?coin=eth`  -Get market stats for a coin      
 `/price/chart`     -Get 7-day price history          


## Demo Use Cases

 User: *What's ETH trading at right now?*  
 Bot: *ETH Price: $3,240*

User: *I have 2 ETH*  
Bot: *Logged 2 ETH to your portfolio.*

User: *What’s my portfolio value?*  
Bot: *Your portfolio value is $6,480*

User: *Show ETH chart*  
*(Chart renders below)*

---

## Notes

- CoinGecko’s free API has rate limits. A graceful error is shown when limits are hit.
- All logic is built modularly for future extension (voice API, more coins, etc).
- CORS is enabled in Flask for React communication.

---



## Questions?

Feel free to raise an issue or reach out via email.

---

**Made with ❤️ by Shubham Singh Sisodiya**