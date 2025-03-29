import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReportUser = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Mis reportes</h1>
      <p>Los usuarios ven aquí sus reportes y pueden generar otro.</p>
      <button 
        onClick={() => navigate('/GenerarReportUser')}
        style={{
          marginTop: '20px', padding: '10px 20px',
          backgroundColor: '#007bff', color: 'white',
          border: 'none', borderRadius: '5px', cursor: 'pointer'
        }}>
        Generar nuevo reporte
      </button>
    </div>
  );
}

export default ReportUser;
