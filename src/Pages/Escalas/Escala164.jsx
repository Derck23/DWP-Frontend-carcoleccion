import React, { useEffect, useState } from 'react';
import Header from '../../Layouts/Header';
import { colecciones } from '../../services/coleccionablesService';
import BidModal from './BidModal'; // Asegúrate de que la ruta sea correcta
import './Escala.css'; // Agrega estilos para las tarjetas

function Escala164() {
    const [coleccionables, setColeccionables] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchColeccionables = async () => {
            try {
                const data = await colecciones("164"); // Llamar al servicio con la escala 164
                setColeccionables(data);
            } catch (error) {
                console.error("Error al obtener los coleccionables:", error);
            }
        };

        fetchColeccionables();
    }, []);

    return (
        <div>
          <Header />
          <h1>Escala 1:64</h1>
          <div className="cards-container">
            {coleccionables.map((item) => (
              <div key={item.id} className="card">
                <h3>{item.nombre}</h3>
                        <p>Fecha Límite: {new Date(item.fechaLimite).toLocaleDateString()}</p>
                        {item.imagenes && item.imagenes.length > 0 && (
                        <img src={item.imagenes[0]} alt={item.nombre} className="card-image" />
                        )}
                <button 
                  onClick={() => setSelectedItem(item)}
                  className="view-detail-button"
                >
                  Ofertar
                </button>
              </div>
            ))}
          </div>
          
          {selectedItem && (
            <BidModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </div>
      );
}

export default Escala164;