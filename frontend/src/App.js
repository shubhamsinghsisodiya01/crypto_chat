import React, { useState } from 'react';
import axios from 'axios';
import './GlobalStyles.css';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import MicButton from './components/MicButton';
import LoadingIndicator from './components/LoadingIndicator';
import PriceChart from './components/PriceChart';

function App() {
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
   const [holdings, setHoldings] = useState({ ethereum: 0 });

  const handleUserMessage = async (message) => {
    setChatLog([...chatLog, { text: message, sender: 'user' }]);
    setLoading(true);

    try {
      let response;
      const lowerCasedMessage = message.toLowerCase();

      if (
        lowerCasedMessage.includes('eth price') || 
        lowerCasedMessage.includes('what’s eth trading at right now') || 
        lowerCasedMessage.includes('ethereum price')
      ) {
        response = await axios.get('http://localhost:5000/price?coin=ethereum');
        setChatLog([...chatLog, { text: `ETH Price: $${response.data.ethereum.usd}`, sender: 'bot' }]);
      } else if (
        lowerCasedMessage.includes('trending coins') || 
        lowerCasedMessage.includes('which coins are trending today')
      ) {
        response = await axios.get('http://localhost:5000/trending');
        const trendingCoins = response.data.coins.map(coin => coin.item.name).join(', ');
        setChatLog([...chatLog, { text: `Trending: ${trendingCoins}`, sender: 'bot' }]);
      } else if (
        lowerCasedMessage.includes('eth stats') || 
        lowerCasedMessage.includes('show eth stats')
      ) {
        response = await axios.get('http://localhost:5000/stats?coin=ethereum');
        console.log('ETH Stats Response:', response.data); // Log response
        if (!response.data.error) {
          const { symbol, market_cap, '24h_change': change, description } = response.data;
          setChatLog([...chatLog, { text: `ETH: Symbol: ${symbol.toUpperCase()}, Market Cap: $${market_cap}, 24h Change: ${change}%, Description: ${description}`, sender: 'bot' }]);
        } else {
          setChatLog([...chatLog, { text: `Error: ${response.data.error}`, sender: 'bot' }]);
        }
      } else if (lowerCasedMessage.includes('i have')) {
        const matches = message.match(/i have (\d+(\.\d+)?) eth/i);
        if (matches) {
          const ethAmount = parseFloat(matches[1]);
          setHoldings({ ...holdings, ethereum: ethAmount });
          setChatLog([...chatLog, { text: `Logged ${ethAmount} ETH to your portfolio.`, sender: 'bot' }]);
        }
      } else if (lowerCasedMessage.includes('portfolio value')) {
        response = await axios.get('http://localhost:5000/price?coin=ethereum');
        const ethPrice = response.data.ethereum.usd;
        const portfolioValue = holdings.ethereum * ethPrice;
        setChatLog([...chatLog, { text: `Your portfolio value is $${portfolioValue.toFixed(2)}`, sender: 'bot' }]);
      }else if (lowerCasedMessage.includes('chart')) {
        response = await axios.get('http://localhost:5000/price/chart?coin=ethereum');
        const priceData = response.data.prices.map((entry) => entry[1]);
        const dates = response.data.prices.map((entry) => new Date(entry[0]).toLocaleDateString());
        setChatLog([...chatLog, { text: <PriceChart key={Date.now()} data={{ prices: priceData, dates }} />, sender: 'bot' }]);
        // Optionally speak out the chart notification
      
      }else {
        setChatLog([...chatLog, { text: 'Invalid request, try asking about ETH price, trending coins, or ETH stats.', sender: 'bot' }]);
      }
    } catch (error) {
      console.error('API Error:', error);
      setChatLog([...chatLog, { text: 'Error: Please try again later.', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Crypto Chat</h1>
      </header>
      <div className="chat-window">
        {chatLog.map((entry, index) => (
          <ChatBubble key={index} text={entry.text} sender={entry.sender} />
        ))}
        {loading && <LoadingIndicator />}
      </div>
      <ChatInput onSendMessage={handleUserMessage} />
      <MicButton />
    </div>
  );
}

export default App;