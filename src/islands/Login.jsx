import React, { useState } from "react";

export default function AuthSideBackground() {
    
    const [tab, setTab] = useState('login');
    let formulario;

    if (tab === 'login') {
        formulario = (
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Correo
                    </label>
                    <input type="email" placeholder="tu@correo.cl" className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900" />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Contraseña
                    </label>
                    <input type="password" placeholder="••••••••" className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900" />
                </div>

                <div className="flex justify-end -mt-1.5">
                    <a href="/recuperar-contraseña" onClick={(e) => e.preventDefault()} className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">¿Olvidaste tu contraseña?</a>
                </div>

                <button type="button" className="w-full h-11 rounded-xl cursor-pointer bg-slate-900 text-white font-semibold text-sm transition-transform transition-all hover:text-gray-300 active:scale-[.98]">
                    Entrar
                </button>
            </div>
        );
    } else {
        formulario = (
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Nombre
                    </label>
                    <input type="text" placeholder="Cómo te gustaría que te llamemos" className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900" />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Correo
                    </label>
                    <input type="email" placeholder="tu@correo.cl" className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900" />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Contraseña
                    </label>
                    <input type="text" placeholder="Mínimo 8 caracteres" className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900" />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Contraseña
                    </label>
                    <input type="password" placeholder="••••••••" className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900" />
                </div>

                <button type="button" className="w-full h-11 rounded-xl cursor-pointer bg-slate-900 text-white font-semibold text-sm transition-transform transition-all hover:text-gray-300 active:scale-[.98]">
                    Registrarse
                </button>
            </div>
        );
    }

    return (
        <div className="relative bg-slate-950 min-h-screen overflow-hidden">
            <img src="/waves.jpg" alt="Background" className="absolute inset-0 object-cover w-full h-full" />

            <div className="fixed inset-0 flex items-center justify-center p-5 pointer-events-none opacity-90">
                <div className="pointer-events-auto w-full max-w-[400px] bg-white backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/40 border border-white/20 p-8">

                    <div className="flex items-center mb-2 select-none">
                        <span className="material-symbols-outlined gap-2 pr-2 bg-gradient-to-r via-slate-500 to-slate-800 bg-clip-text text-transparent">waves</span>
                        <span className="text-lg font-bold tracking-tight text-slate-900">Sonora</span>
                    </div>

                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Entra a tu cuenta</h1>
                    <p className="text-sm text-slate-500 mt-1.5 mb-6">Usa tu correo y contraseña para continuar.</p>

                    <div className="flex gap-1 bg-slate-100 p-1 rounded-full mb-6">
                        <button type="button" onClick={() => setTab('login')} className={`flex-1 h-9 cursor-pointer rounded-full text-sm font-semibold flex items-center justify-center ${tab === 'login' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}>
                            Iniciar sesión
                        </button>
                        <button type="button" onClick={() => setTab('register')} className={`flex-1 h-9 cursor-pointer rounded-full text-sm font-semibold flex items-center justify-center ${tab === 'register' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}>
                            Crear cuenta
                        </button>
                    </div>
                    {formulario}
                </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 sm:bottom-10 sm:left-10 sm:right-10">
                <p className="text-white text-xs sm:text-sm leading-relaxed text-left opacity-50">Catálogo educativo con audio propio, libre o autorizado. <br /> CIT2308 · Desarrollo Web · Universidad Diego Portales</p>
            </div>

        </div>
    );
}