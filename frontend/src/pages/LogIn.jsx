import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import axios from "axios";

// LoginWithImage.jsx
// Single-file React component styled with TailwindCSS.
// Usage: import LoginWithImage from './LoginWithImage';
// Make sure Tailwind is configured in your project (PostCSS / tailwind.config.js).

export default function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        
        if (email == "" || password == "") {
            setError("Campos necesarios")
        } else {
            axios.post("http://localhost:4000/api/users/login", {
                email,
                password
            })
            .then(response => {
                console.log(response)
                const {email, role} = response.data.user
                const objToSession = {
                    email,
                    role
                }
                const sessionString = JSON.stringify(objToSession)

                console.log(sessionString)

                sessionStorage.setItem('userData', sessionString)
                
                navigate('/dashboard')
            })
            .catch(error => {
                console.error("Error al iniciar sesión:", error);
                setError("Credenciales Incorrectos")
                setTimeout(()=>{
                    setError("")
                },2000)
            });

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* Left: Image - on small screens the image sits above the form; on md+ it stays to the left */}
                <div className="hidden md:block">
                    <img
                        src={logo}
                        alt="Decorative"
                        className="w-full h-full object-cover block"
                    />
                </div>

                {/* For small screens, show a smaller image on top */}
                <div className="md:hidden w-full ">
                    <img
                        src={logo}
                        alt="Decorative"
                        className="w-full h-70 object-cover"
                    />
                </div>

                {/* Right: Form */}
                <div className="p-6 md:p-10 flex items-center">
                    <div className="w-full">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Iniciar sesión</h2>
                        <p className="text-sm text-gray-500 mb-6">Accede a tu cuenta introduciendo tus credenciales.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email o cedula
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                    placeholder="tucorreo@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="password"
                                        type={"password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>


                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm text-[#5F3092] hover:underline">
                                    ¿Olvidaste la contraseña?
                                </a>
                            </div>

                            <div>
                                
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#5F3092] hover:bg-[#490b8c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Entrar
                                </button>
                                
                            </div>
                            <div>
                                {error&& <span className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-red-600 bg-red-300 p-1">{error}</span>}
                            </div>
                            
                        </form>
                        

                    </div>
                    
                </div>
            </div>
            
        </div>
        
    );
}
