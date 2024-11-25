// src/pages/login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, X } from 'lucide-react';
import '../../styles/global.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: localStorage.getItem('userEmail') || '', // Cargar email guardado
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      if (formData.email === 'admin@admin.com' && formData.password === 'admin123') {
        // Guardar email si recordarme está activo
        if (formData.rememberMe) {
          localStorage.setItem('userEmail', formData.email);
        } else {
          // Eliminar si no está activo
          localStorage.removeItem('userEmail'); 
        }
        
        onLogin();
        navigate('/dashboard');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetMessage('Por favor ingrese su correo electrónico');
      return;
    }
    
    try {
      // Aquí iría la lógica real de envío de correo de recuperación
      // Por ahora solo mostraremos un mensaje de éxito
      setResetMessage('Se ha enviado un correo con las instrucciones para recuperar su contraseña');
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetMessage('');
        setResetEmail('');
      }, 3000);
    } catch (error) {
      setResetMessage('Error al enviar el correo de recuperación');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Ingrese sus credenciales para continuar</p>
        </div>
        
        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Recordarme
              </label>
            </div>
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setShowForgotPassword(true)}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
        </form>

        {showForgotPassword && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Recuperar Contraseña</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowForgotPassword(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleForgotPassword}>
                    <div className="mb-3">
                      <label htmlFor="resetEmail" className="form-label">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="resetEmail"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="Ingrese su correo electrónico"
                      />
                    </div>
                    {resetMessage && (
                      <div className={`alert ${resetMessage.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                        {resetMessage}
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100">
                      Enviar instrucciones
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;