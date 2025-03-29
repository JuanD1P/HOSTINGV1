import React, { useState } from 'react';

const GenerarReportUser = () => {
  const [formData, setFormData] = useState({
    foto: null,
    especie: '',
    descripcion: '',
    direccion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Obtener el usuario_id dinámicamente (por ejemplo, desde localStorage)
    const usuario_id = localStorage.getItem('usuario_id'); // O usa sessionStorage si es el caso
    
    if (!usuario_id) {
      alert('Usuario no autenticado');
      return;
    }
  
    if (!formData.foto || !formData.especie || !formData.descripcion || !formData.direccion) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('usuario_id', usuario_id);  // Aquí ya agregas el usuario_id dinámicamente
    formDataToSend.append('foto', formData.foto);
    formDataToSend.append('especie', formData.especie);
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('direccion', formData.direccion);
  
    console.log('Enviando datos:', Object.fromEntries(formDataToSend.entries()));
  
    try {
      const response = await fetch('https://hostingv1.onrender.com/reporte', {
        method: 'POST',
        body: formDataToSend,
      });
      console.log('Enviando datos:', Object.fromEntries(formDataToSend.entries()));

  
      const result = await response.json();
      if (!response.ok) {
        console.log("Error al enviar el reporte:", result);
        alert('Error al enviar el reporte: ' + (result.error || 'Desconocido'));
      }
      if (response.ok) {
        alert('Reporte enviado con éxito');
        setFormData({ foto: null, especie: '', descripcion: '', direccion: '' });
      } else {
        alert('Error al enviar el reporte: ' + (result.error || 'Desconocido'));
      }
    } catch (error) {
      console.error('Error al enviar reporte:', error);
      alert('Hubo un problema al enviar el reporte');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1>Generar Reporte</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Foto:
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </label>
        <br />
        <label>
          Especie:
          <input type="text" name="especie" value={formData.especie} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Descripción:
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Dirección:
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit" style={{ padding: '10px 20px', marginTop: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Enviar Reporte
        </button>
      </form>
    </div>
  );
};

export default GenerarReportUser;
