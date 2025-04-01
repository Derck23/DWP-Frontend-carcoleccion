export const setupWebSocket = (onMessage, onOpen, onClose, onError) => {
  // Cambia la URL para usar el mismo dominio que tu API backend
  const ws = new WebSocket('wss://dwp-backend-carcoleccion.onrender.com');

  ws.onopen = () => {
    console.log('Connected to currency WebSocket');
    onOpen(true);
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'exchange_rates') {
        onMessage({
          rates: data.data,
          baseCurrency: data.base,
          lastUpdate: data.date
        });
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  ws.onclose = () => {
    console.log('Disconnected from currency WebSocket');
    onClose(false);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    onError(false, error);
  };

  // Función para cambiar moneda base
  const changeBaseCurrency = (currency) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'change_base',
        currency: currency
      }));
    }
  };

  return {
    close: () => ws.close(),
    changeBaseCurrency
  };
};

export const calculateConversion = (amount, from, to, rates, baseCurrency) => {
  if (!rates || !baseCurrency) return 0;
  
  // Manejar casos donde las tasas no estén disponibles
  if (from === to) return amount;
  
  if (from === baseCurrency) {
    const rate = rates[to] || 1;
    return amount * rate;
  } else if (to === baseCurrency) {
    const rate = rates[from] || 1;
    return amount / rate;
  } else {
    const fromRate = rates[from] || 1;
    const toRate = rates[to] || 1;
    return (amount / fromRate) * toRate;
  }
};