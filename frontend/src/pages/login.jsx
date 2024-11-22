import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import '../components/Login/login.css';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            setEmailError('Por favor ingresa un email válido');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateEmail(email)) {
            return;
        }

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (email === 'usuario@ejemplo.com' && password === 'contraseña123') {
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                onLogin();
                navigate('/dashboard');
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (error) {
            setError('Error al iniciar sesión. Por favor intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            <div className="container d-flex justify-content-center align-items-center vh-100 position-relative">
                <div className="login-card card shadow-lg glass-effect">
                    <div className="text-center mt-4">
                        <div className="logo-container">
                            <h1 className="logo-text">Sistema de Vales</h1>
                        </div>
                    </div>

                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
                        
                        {error && (
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <AlertCircle className="me-2" size={18} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">Correo electrónico</label>
                                <input 
                                    type="email" 
                                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                    placeholder="ejemplo@correo.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateEmail(e.target.value);
                                    }}
                                    required
                                />
                                {emailError && (
                                    <div className="invalid-feedback">
                                        {emailError}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <div className="input-group">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button 
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Recordar mi correo
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary w-100"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </button>
                        </form>

                        <div className="mt-3 text-center">
                            <a href="#" className="text-decoration-none forgot-password">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;