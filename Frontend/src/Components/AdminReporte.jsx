import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../ImagenesP/ImagenesLogin/Logo_Completo.png';
import './DOCSS/Admin.css';

const AdminReporte = () => {
    const [reportes, setReportes] = useState([]);

    useEffect(() => {
        obtenerReportes();
    }, []);

    const obtenerReportes = async () => {
        try {
            const response = await axios.get('https://hostingv1.onrender.com/auth/reportes');
            setReportes(response.data);
        } catch (error) {
            console.error("Error al obtener reportes:", error);
        }
    };

    const eliminarReporte = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este reporte?")) return;

        try {
            await axios.delete(`https://hostingv1.onrender.com/auth/reportes/${id}`);
            obtenerReportes();
        } catch (error) {
            console.error("Error al eliminar el reporte:", error);
        }
    };

    return (
        <div className="admin-container">
            <img src={logo} alt="Logo de la aplicación" className="admin-logo" />
            <h2 className="admin-title">Panel de Reportes</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Especie</th>
                        <th>Descripción</th>
                        <th>Dirección</th>
                        <th>Foto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reportes.map((reporte) => (
                        <tr key={reporte.id}>
                            <td>{reporte.id}</td>
                            <td>{reporte.usuario_id}</td>
                            <td>{reporte.especie}</td>
                            <td>{reporte.descripcion}</td>
                            <td>{reporte.direccion}</td>
                            <td>
                                {reporte.foto ? (
                                    <img
                                        src={`data:image/jpeg;base64,${reporte.foto}`}
                                        alt="Foto del reporte"
                                        className="admin-foto"
                                    />
                                ) : (
                                    "No disponible"
                                )}
                            </td>
                            <td>
                                <button
                                    className="admin-delete-btn"
                                    onClick={() => eliminarReporte(reporte.id)}
                                >
                                    ❌ Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReporte;
