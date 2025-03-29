import React, { useEffect, useState } from 'react';
import Header from '../../Layouts/HeaderAdmin';
import { colecciones } from '../../services/coleccionablesService';
import './Escala.css'; // Agrega estilos para las tarjetas

function Escala164A() {
    const [coleccionables, setColeccionables] = useState([]);

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
            <p>Información sobre la escala 1:64.</p>
            <div className="cards-container">
                {coleccionables.map((item, index) => (
                    <div key={item.id} className="card">
                        <h3>{item.nombre}</h3>
                        <p>Precio: ${item.precio}</p>
                        <p>Fecha Límite: {new Date(item.fechaLimite).toLocaleDateString()}</p>
                        {item.imagenes && item.imagenes.length > 0 && (
                            <img src={item.imagenes[0]} alt={item.nombre} className="card-image" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Escala164A;