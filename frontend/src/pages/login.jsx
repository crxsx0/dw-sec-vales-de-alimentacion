import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      if (email === 'usuario@ejemplo.com' && password === 'contraseña123') {
        onLogin(); // Actualiza el estado de autenticación
        navigate('/dashboard');
      } else {
        alert('Credenciales incorrectas');
      }
    };

    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-sm" style={{width: '350px'}}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-100"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Login