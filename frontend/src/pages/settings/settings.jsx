import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, Shield, Moon, Sun, Globe, Key, ArrowLeft } from 'lucide-react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import '../../styles/global.css';

function Settings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [darkMode, setDarkMode] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
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

    const handleSaveChanges = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <Container fluid className="p-4">
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Cambios guardados exitosamente
                </Alert>
            )}
            
            <Card className="shadow-sm">
                <Card.Body>
                    <div className="d-flex align-items-center mb-4">
                        <Button 
                            variant="link" 
                            className="me-3 p-0 text-secondary"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft size={20} />
                        </Button>
                        <h2 className="mb-0">Configuración</h2>
                    </div>

                    <Row>
                        {/* Sidebar de navegación */}
                        <Col md={3} className="mb-4">
                            <div className="list-group">
                                <Button 
                                    variant="link"
                                    className={`list-group-item list-group-item-action d-flex align-items-center gap-2 ${activeTab === 'profile' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('profile')}
                                >
                                    <User size={18} />
                                    Perfil
                                </Button>
                                <Button 
                                    variant="link"
                                    className={`list-group-item list-group-item-action d-flex align-items-center gap-2 ${activeTab === 'security' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('security')}
                                >
                                    <Shield size={18} />
                                    Seguridad
                                </Button>
                                <Button 
                                    variant="link"
                                    className={`list-group-item list-group-item-action d-flex align-items-center gap-2 ${activeTab === 'notifications' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('notifications')}
                                >
                                    <Bell size={18} />
                                    Notificaciones
                                </Button>
                        
                            </div>
                        </Col>

                        {/* Contenido principal */}
                        <Col md={9}>
                            {activeTab === 'profile' && (
                                <div>
                                    <h4 className="mb-4">Perfil de Usuario</h4>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre completo</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Correo electrónico</Form.Label>
                                            <Form.Control 
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Rol</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                value={profileData.role}
                                                disabled
                                            />
                                        </Form.Group>
                                        <Button variant="primary" onClick={handleSaveChanges}>
                                            Guardar cambios
                                        </Button>
                                    </Form>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div>
                                    <h4 className="mb-4">Preferencias de Notificaciones</h4>
                                    <Form>
                                        <Form.Check 
                                            type="switch"
                                            id="email-notifications"
                                            label="Notificaciones por correo"
                                            checked={notifications.email}
                                            onChange={() => handleNotificationChange('email')}
                                            className="mb-3"
                                        />
                                        <Form.Check 
                                            type="switch"
                                            id="browser-notifications"
                                            label="Notificaciones del navegador"
                                            checked={notifications.browser}
                                            onChange={() => handleNotificationChange('browser')}
                                            className="mb-3"
                                        />
                                        <Form.Check 
                                            type="switch"
                                            id="update-notifications"
                                            label="Actualizaciones del sistema"
                                            checked={notifications.updates}
                                            onChange={() => handleNotificationChange('updates')}
                                            className="mb-3"
                                        />
                                        <Button variant="primary" onClick={handleSaveChanges}>
                                            Guardar preferencias
                                        </Button>
                                    </Form>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div>
                                    <h4 className="mb-4">Seguridad</h4>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Contraseña actual</Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nueva contraseña</Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Confirmar nueva contraseña</Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                        <Button variant="primary" onClick={handleSaveChanges}>
                                            Cambiar contraseña
                                        </Button>
                                    </Form>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Settings;