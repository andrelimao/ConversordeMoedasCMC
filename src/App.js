import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function App() {
  const [info, setInfo] = useState({});
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('BTC');
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
   
// useEffect não vai existir após a requisição ser feita via back-end
useEffect(() => {
  // Fetch data from your backend API
  const fetchData = async () => {
    try {
      const response = await Axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${from}&convert=${to}');
      const data = response.data;
      setInfo(data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };  

    fetchData();
      
      
  }, [from, to]);
//talvez seja possível manter esse useEffect e o seguinte. o object.keys pega quais chaves?
  useEffect(() => {
    const availableOptions = Object.keys(info);
    setOptions(availableOptions);
  }, [info]);


  function convert() {
    const fromRate = info[from]?.quote?.USD?.price || 0;
    const toRate = info[to]?.quote?.USD?.price || 0;
    const convertedAmount = (input / fromRate) * toRate;
    setOutput(convertedAmount);
  }
  useEffect(() => {
    convert();
  }, [input, from, to]);


  function flip() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="App">
      <div className="heading">
        <h1>Currency converter</h1>
      </div>
      <div className="container">
        <div className="left">
          <h3>Amount</h3>
          <input
            type="text"
            placeholder="Enter the amount"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="middle">
          <h3>From</h3>
          <Dropdown
            className='seletor'
            options={options}
            onChange={(e) => setFrom(e.value)}
            value={from}
            placeholder="From"
          />
        </div>
        <div className="switch">
          <HiSwitchHorizontal size="25px" onClick={() => flip()} />
        </div>
        <div className="right">
          <h3>To</h3>
          <Dropdown
            className='seletor'
            options={options}
            onChange={(e) => setTo(e.value)}
            value={to}
            placeholder="To"
          />
          <button className='botao' onClick={() => convert()}>Convert</button>
        </div>
      </div>
      <div className="result">
        
        <h2>Converted Amount:</h2>
        <p>
          {input} {from} = {output.toFixed(2)} {to}
        </p>
      </div>
    </div>
  );
}

export default App;
