import React, { useState, useEffect, useRef } from 'react';
import { getLatestBid, placeBid } from '../../services/bidService';
import { setupWebSocket, calculateConversion } from '../../services/currencyService';
import Conversion from '../../Components/Conversion';

const BidModal = ({ item, onClose }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [latestBid, setLatestBid] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Estado para la conversión de moneda
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [lastUpdate, setLastUpdate] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [conversionCurrency, setConversionCurrency] = useState('EUR');
  const ws = useRef(null);

  // Cargar última puja
  useEffect(() => {
    const loadLatestBid = async () => {
      try {
        const bid = await getLatestBid(item.id);
        setLatestBid(bid);
      } catch (error) {
        console.error(error);
      }
    };
    loadLatestBid();
  }, [item.id]);

  // Configurar WebSocket para tasas de cambio
  useEffect(() => {
    ws.current = setupWebSocket(
      ({ rates, baseCurrency, lastUpdate }) => {
        setRates(rates);
        setBaseCurrency(baseCurrency);
        setLastUpdate(lastUpdate);
      },
      setIsConnected,
      setIsConnected,
      (connected, error) => {
        setIsConnected(connected);
        console.error('WebSocket error:', error);
      }
    );

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Calcular conversión
  const convertedAmount = calculateConversion(
    bidAmount || 0,
    'MXN', // Asumiendo que las pujas son en USD
    conversionCurrency,
    rates,
    baseCurrency
  );

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await placeBid(item.id, bidAmount);
      const updatedBid = await getLatestBid(item.id);
      setLatestBid(updatedBid);
      setBidAmount('');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (e) => {
    setConversionCurrency(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{item.nombre}</h2>
        <div className="modal-images">
          {item.imagenes?.map((img, index) => (
            <img key={index} src={img} alt={`${item.nombre} ${index}`} />
          ))}
        </div>
        <div className="bid-section">
          <h3>Pujas</h3>
          {latestBid ? (
            <div className="latest-bid">
              <p>Última puja: ${latestBid.amount}</p>
              <p>Las pujas se hacen en moneda: Peso mexicano: MXN</p>
            </div>
          ) : (
            <p>No hay pujas aún</p>
          )}
          
          <form onSubmit={handleSubmitBid}>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`Mínimo $${latestBid ? latestBid.amount + 1 : 1}`}
              min={latestBid ? latestBid.amount + 1 : 1}
              step="1"
              required
            />
            
            <div style={{ margin: '10px 0' }}>
              <label>Mostrar conversión a: </label>
              <select 
                value={conversionCurrency} 
                onChange={handleCurrencyChange}
                style={{ padding: '5px' }}
              >
                {Object.keys(rates).concat(baseCurrency).sort().map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
            
            <Conversion
              amount={bidAmount}
              fromCurrency="MXN"
              toCurrency={conversionCurrency}
              convertedAmount={convertedAmount}
              lastUpdate={lastUpdate}
              isConnected={isConnected}
            />
            
            <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
              {loading ? 'Enviando...' : 'Pujar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BidModal;