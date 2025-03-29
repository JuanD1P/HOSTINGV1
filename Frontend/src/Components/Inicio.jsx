import React from 'react';
import { useNavigate } from 'react-router-dom';

function Inicio() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bienvenido a PETHOME</h1>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        display: 'inline-block',
        marginTop: '20px'
      }}>
        <button 
          onClick={() => navigate('/AdopMasUser')}
          style={{
            display: 'block', width: '100%', marginBottom: '10px',
            padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px'
          }}>
          Buscar Adopciones
        </button>
        <button 
          onClick={() => navigate('/ReportUser')}
          style={{
            display: 'block', width: '100%',
            padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px'
          }}>
          Reportes
        </button>
      </div>
    </div>
  );
}

export default Inicio;
