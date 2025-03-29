import React, { useState, useEffect } from 'react';
import { getLatestBid, placeBid } from '../../services/bidService';
//import { jwtDecode } from 'jwt-decode'; // Importación corregida

const BidModal = ({ item, onClose }) => {
    const [bidAmount, setBidAmount] = useState('');
  const [latestBid, setLatestBid] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
              <small>Por usuario: {latestBid.userId}</small>
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
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Pujar'}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default BidModal;