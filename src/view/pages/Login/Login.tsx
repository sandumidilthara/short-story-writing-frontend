



import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

type FormData = {
    email: string;
    password: string;
};


export function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const authenticateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call for demo
            console.log('Login attempt with:', formData);

            // Simulate successful login
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert("Successfully logged in!");
            navigate('/');



        } catch (error) {
            console.error(error);
            alert("Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-20 left-40 w-36 h-36 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative w-full max-w-md">

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <span className="mr-2">✍️</span>
                            Writer's Portal
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600">
                            Continue your storytelling journey
                        </p>
                    </div>


                    {/*<div className="mb-6">*/}
                    {/*    <button*/}
                    {/*        onClick={() => console.log("Navigate to home")}*/}
                    {/*        className="text-sm text-purple-600 hover:text-purple-900 underline transition duration-300"*/}
                    {/*    >*/}
                    {/*        ← Go Back*/}
                    {/*    </button>*/}
                    {/*</div>*/}


                    <div className="space-y-6">

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition duration-300 bg-white/50"
                                />
                                <div className="absolute right-3 top-3.5 text-gray-400">
                                    📧
                                </div>
                            </div>
                        </div>


                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition duration-300 bg-white/50"
                                />
                                <div className="absolute right-3 top-3.5 text-gray-400">
                                    🔒
                                </div>
                            </div>
                        </div>


                        <button
                            onClick={authenticateUser}
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-[1.02] transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <span className="mr-2">{isLoading ? '⏳' : '🚀'}</span>
                            {isLoading ? 'Signing In...' : 'Sign In to Your Account'}
                        </button>
                    </div>


                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/register">
                            <button
                                onClick={() => console.log("Navigate to register")}
                                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition duration-300"
                            >
                                Create Account
                            </button>
                                </Link>
                        </p>
                    </div>
                </div>


                <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-lg font-bold text-gray-900">50K+</div>
                            <div className="text-xs text-gray-600">Writers</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-gray-900">2M+</div>
                            <div className="text-xs text-gray-600">Stories</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-gray-900">10M+</div>
                            <div className="text-xs text-gray-600">Readers</div>
                        </div>
                    </div>
                </div>


                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl">
                    <div className="flex items-center space-x-2">
                        <div className="bg-green-100 p-1.5 rounded-lg">
                            <span className="text-sm">🏆</span>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-sm">#1</div>
                            <div className="text-gray-600 text-xs">Platform</div>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-2xl shadow-xl">
                    <div className="flex items-center space-x-2">
                        <div className="bg-purple-100 p-1.5 rounded-lg">
                            <span className="text-sm">⚡</span>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-sm">24/7</div>
                            <div className="text-gray-600 text-xs">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}