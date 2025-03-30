export const setupWebSocket = (onMessage, onOpen, onClose, onError) => {
  const ws = new WebSocket('ws://localhost:3003');

  ws.onopen = () => {
    console.log('Connected to currency WebSocket');
    onOpen(true);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'exchange_rates') {
      onMessage({
        rates: data.data,
        baseCurrency: data.base,
        lastUpdate: data.date
      });
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

  return ws;
};

export const calculateConversion = (amount, from, to, rates, baseCurrency) => {
  if (!rates || !baseCurrency) return 0;
  
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