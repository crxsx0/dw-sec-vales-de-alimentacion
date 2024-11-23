import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, Shield, Moon, Sun, Globe, Key, ArrowLeft } from 'lucide-react';
import '../../styles/global.css';

function Settings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTabs] = useState('profile');
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        browser: false,
        updates: true
    });
    const [profileData, setProfileData] = useState({
        name: 'Usuario Demo',
        email: 'usuario@ejemplo.com',
        role: 'Administrador'
    });

    const handleNotificationChange = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="settings-container">
            <button 
                className="back-button"
                onClick={() => navigate('/dashboard')}
            >
                <ArrowLeft size={20} />
                Volver al Dashboard
            </button>

            <div className="settings-header">
                <h1>Configuración</h1>
                <p>Administra tu cuenta y preferencias del sistema</p>
            </div>

            <div className="settings-content">
                <div className="settings-sidebar">
                    <button 
                        className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <User size={20} />
                        <span>Perfil</span>
                    </button>
                    <button 
                        className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <Bell size={20} />
                        <span>Notificaciones</span>
                    </button>
                    <button 
                        className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <Shield size={20} />
                        <span>Seguridad</span>
                    </button>
                    <button 
                        className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appearance')}
                    >
                        <Globe size={20} />
                        <span>Apariencia</span>
                    </button>
                </div>

                <div className="settings-main">
                    {activeTab === 'profile' && (
                        <div className="settings-section">
                            <h2>Perfil</h2>
                            <div className="profile-form">
                                <div className="mb-3">
                                    <label className="form-label">Nombre completo</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Correo electrónico</label>
                                    <input 
                                        type="email" 
                                        className="form-control"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Rol</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={profileData.role}
                                        disabled
                                    />
                                </div>
                                <button className="btn btn-primary">Guardar cambios</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;