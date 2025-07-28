

import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store.ts';
import {
    registerUser,
    updateFormField,
    clearForm,
    clearError,
    resetSuccess
} from '../../../slices/registerSlice.ts';

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {
        name,
        email,
        password,
        termsAccepted,
        loading,
        error,
        success
    } = useSelector((state: RootState) => state.register);


    useEffect(() => {
        if (success) {
            // Show success alert
            alert('🎉 Account created successfully! You can now sign in.');
            // Navigate to login page after successful registration
            navigate('/login');
            dispatch(resetSuccess());
        }
    }, [success, navigate, dispatch]);


    useEffect(() => {
        dispatch(clearError());
        return () => {
            dispatch(clearForm());
        };
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name: fieldName, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        dispatch(updateFormField({ field: fieldName, value: fieldValue }));
    };

    const validateForm = (): boolean => {
        if (!name.trim()) {
            alert('Full name is required');
            return false;
        }

        if (!email.trim()) {
            alert('Email is required');
            return false;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }

        if (!password.trim()) {
            alert('Password is required');
            return false;
        }

        if (password.length < 6) {
            alert('Password should be at least 6 characters long');
            return false;
        }

        if (!termsAccepted) {
            alert('Please accept the Terms of Service and Privacy Policy');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }


        dispatch(registerUser({
            name,
            email,
            password,
            role: 'USER' // Default role for new users
        }));
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
                        <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <span className="mr-2">🌟</span>
                            Join Our Community
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-600">
                            Start your storytelling journey today
                        </p>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition duration-300 bg-white/50"
                                    disabled={loading}
                                />
                                <div className="absolute right-3 top-3.5 text-gray-400">
                                    👤
                                </div>
                            </div>
                        </div>


                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition duration-300 bg-white/50"
                                    disabled={loading}
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
                                    value={password}
                                    onChange={handleInputChange}
                                    placeholder="Create a strong password"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition duration-300 bg-white/50"
                                    disabled={loading}
                                />
                                <div className="absolute right-3 top-3.5 text-gray-400">
                                    🔒
                                </div>
                            </div>
                        </div>


                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                id="termsAccepted"
                                name="termsAccepted"
                                checked={termsAccepted}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                                disabled={loading}
                            />
                            <label htmlFor="termsAccepted" className="text-sm text-gray-600 leading-relaxed">
                                I agree to the{" "}
                                <button type="button" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                                    Terms of Service
                                </button>{" "}
                                and{" "}
                                <button type="button" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                                    Privacy Policy
                                </button>
                            </label>
                        </div>


                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                                <div className="flex items-center">
                                    <span className="text-red-500 mr-2">⚠️</span>
                                    <span className="text-red-700 font-medium">Error: {error}</span>
                                </div>
                            </div>
                        )}


                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-[1.02] transition duration-300 flex items-center justify-center ${
                                loading ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <span className="mr-2">🎉</span>
                                    Create Your Account
                                </>
                            )}
                        </button>
                    </form>


                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login">
                                <button className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition duration-300">
                                    Sign In
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>


                <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-center mb-4">
                        <h3 className="font-semibold text-gray-900 text-sm">Why Join Us?</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-xl mb-1">✍️</div>
                            <div className="text-xs text-gray-600">Free Writing Tools</div>
                        </div>
                        <div>
                            <div className="text-xl mb-1">👥</div>
                            <div className="text-xs text-gray-600">Join Community</div>
                        </div>
                        <div>
                            <div className="text-xl mb-1">💰</div>
                            <div className="text-xs text-gray-600">Earn Money</div>
                        </div>
                    </div>
                </div>


                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-100 p-1.5 rounded-lg">
                            <span className="text-sm">🚀</span>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-sm">Free</div>
                            <div className="text-gray-600 text-xs">Forever</div>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-2xl shadow-xl">
                    <div className="flex items-center space-x-2">
                        <div className="bg-purple-100 p-1.5 rounded-lg">
                            <span className="text-sm">⭐</span>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-sm">5 Min</div>
                            <div className="text-gray-600 text-xs">Setup</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}