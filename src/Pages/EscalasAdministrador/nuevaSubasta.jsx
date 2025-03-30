import React, { useState } from 'react';
import Header from '../../Layouts/Header';
import './subasta.css';
import { registerColeccionables } from '../../services/coleccionablesService';

function NuevaSubasta() {
    const [nombre, setNombre] = useState('');
    const [escala, setEscala] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [imagenes, setImagenes] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("escala", escala);
        formData.append("fechaLimite", fechaLimite);

        if (imagenes) {
            for (let i = 0; i < imagenes.length; i++) {
                formData.append("imagenes", imagenes[i]);
            }
        }

        try {
            const response = await registerColeccionables(formData);
            console.log("Coleccionable registrado:", response);
            alert("Subasta registrada con éxito");
            setNombre('');
            setEscala('');
            setFechaLimite('');
            setImagenes(null);
        } catch (error) {
            console.error("Error al registrar la subasta:", error);
            alert("Error al registrar la subasta");
        }
    };

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="nueva-subasta-container">
                <div className="nueva-subasta-card">
                    <h1 className="nueva-subasta-title">Registra una Nueva Subasta</h1>
                    <form onSubmit={handleSubmit} className="nueva-subasta-form">
                        <label>Nombre del Artículo</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="nueva-subasta-input" placeholder="Hotweels Sth"/>
                        <label>Escala</label>
                        <select value={escala} onChange={(e) => setEscala(e.target.value)} required className="nueva-subasta-select">
                            <option value="">Selecciona una escala</option>
                            <option value="118">1/18</option>
                            <option value="124">1/24</option>
                            <option value="143">1/43</option>
                            <option value="164">1/64</option>
                        </select>

                        <label>Fecha Límite</label>
                        <input type="datetime-local" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} required className="nueva-subasta-input"/>

                        <label className="nueva-subasta-file-label">Subir Imágenes
                            <input type="file" onChange={(e) => setImagenes(e.target.files)} multiple accept="image/*" className="nueva-subasta-file-input"/>
                        </label>

                        <button type="submit" className="nueva-subasta-button">Publicar Subasta</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NuevaSubasta;
