import React from 'react';
//import { Link } from 'react-router-dom';
import Header from '../../Layouts/Header';

function Contacto() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                
                <main>
                    <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
                        Los mejores coleccionables, expertos en autos a escala
                    </h1>

                    {/* Sección de Redes */}
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        
                    </div>

                    {/* Sección de Auditorio ÚTEO */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                        gap: '20px', 
                        textAlign: 'center', 
                        marginBottom: '20px' 
                    }}>
                        <div>
                            <h3 style={{ color: '#555', marginBottom: '10px' }}>Ubicación</h3>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d59739.85514989446!2d-100.4006088!3d20.6394134!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35a486363880d%3A0xd927286fe3c75218!2sUTEQ!5e0!3m2!1ses!2smx!4v1742021592464!5m2!1ses!2smx"
                                width="100%"
                                height="300"
                                style={{ border: '0' }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                        <div>
                        <h2 style={{ color: '#555', marginBottom: '10px' }}>Redes</h2>
                        <p style={{ color: '#777' }}>Síguenos en nuestras redes sociales para más información.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Contacto;