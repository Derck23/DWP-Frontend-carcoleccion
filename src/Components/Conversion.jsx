import React from 'react';

const Conversion = ({ 
  amount, 
  fromCurrency, 
  toCurrency, 
  convertedAmount,
  lastUpdate,
  isConnected
}) => {
  if (!amount || amount <= 0) return null;

  return (
    <div style={{ 
      marginTop: '10px',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
      fontSize: '0.9em'
    }}>
      <p>
        <strong>Conversión:</strong> {amount} {fromCurrency} ≈ {convertedAmount.toFixed(2)} {toCurrency}
      </p>
      {lastUpdate && (
        <p style={{ fontSize: '0.8em', color: '#666' }}>
          Tasas actualizadas: {lastUpdate}
        </p>
      )}
      <p style={{ color: isConnected ? 'green' : 'red', fontSize: '0.8em' }}>
        {isConnected ? '✔ Tasas en tiempo real' : '✖ Conexión perdida'}
      </p>
    </div>
  );
};

export default Conversion;