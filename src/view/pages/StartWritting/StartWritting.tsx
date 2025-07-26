

import React, { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store.ts';
import { getAllCategories } from '../../../slices/homeSlice.ts';
import {
    createStoryRequest,
    updateFormField,
    clearForm,
    clearError,
    resetSuccess,
    setUserFromToken
} from '../../../slices/startWritingSlice.ts';

// JWT decode utility function
const decodeJWT = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};

// Check if token is expired - existing JWT decode logic use karala
const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = decodeJWT(token);
        if (!decoded || !decoded.exp) {
            return true;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp <= currentTime;
    } catch (error) {
        console.error('Token expiry check error:', error);
        return true;
    }
};

// Auto logout function
const performAutoLogout = (navigate: any, dispatch: any, message: string = 'Your session has expired. Please log in again.') => {
    // Clear all tokens
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('refreshToken');

    // Clear form data
    dispatch(clearForm());

    // Show alert
    alert(message);

    // Redirect to login
    navigate('/login');
};

export function StartWritting() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const intervalRef = useRef<number | null>(null);
    const warningShownRef = useRef<boolean>(false);

    // Get data from both slices
    const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.home);
    const {
        name,
        category,
        content,
        imageUrl,
        author,
        authorEmail,
        createdAt,
        loading,
        error,
        success,
        isAuthenticated
    } = useSelector((state: RootState) => state.write);

    // Auto logout check function
    const checkTokenExpiry = useCallback(() => {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

        if (!token) {
            performAutoLogout(navigate, dispatch, 'Please log in to continue.');
            return;
        }

        if (isTokenExpired(token)) {
            performAutoLogout(navigate, dispatch, 'Your 24-hour session has expired. Please log in again.');
            return;
        }

        // Check if token will expire in next 5 minutes (warning)
        const decoded = decodeJWT(token);
        if (decoded && decoded.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = decoded.exp - currentTime;

            // Show warning if token expires in 5 minutes (show only once)
            if (timeUntilExpiry <= 300 && timeUntilExpiry > 0 && !warningShownRef.current) {
                warningShownRef.current = true;
                const minutes = Math.ceil(timeUntilExpiry / 60);
                alert(`Your session will expire in ${minutes} minute(s). Please save your work and refresh the page to continue.`);
            }

            // Reset warning if time is more than 5 minutes
            if (timeUntilExpiry > 300) {
                warningShownRef.current = false;
            }
        }
    }, [navigate, dispatch]);

    // Setup auto logout interval
    useEffect(() => {
        // Check immediately
        checkTokenExpiry();

        // Set up interval to check every minute
        intervalRef.current = setInterval(() => {
            checkTokenExpiry();
        }, 60000); // Check every 60 seconds

        // Cleanup interval on component unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [checkTokenExpiry]);

    // Check authentication and extract user info from JWT
    useEffect(() => {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

        if (!token) {
            performAutoLogout(navigate, dispatch, 'Please log in to write a story');
            return;
        }

        if (isTokenExpired(token)) {
            performAutoLogout(navigate, dispatch, 'Session expired. Please log in again');
            return;
        }

        const decodedToken = decodeJWT(token);
        if (!decodedToken) {
            performAutoLogout(navigate, dispatch, 'Invalid session. Please log in again');
            return;
        }

        // Extract user info from token and set in state
        const userEmail = decodedToken.email || decodedToken.sub || '';
        const username = decodedToken.username || decodedToken.name || userEmail.split('@')[0] || 'Anonymous';

        dispatch(setUserFromToken({
            email: userEmail,
            username: username
        }));

    }, [dispatch, navigate]);

    // Fetch categories when component mounts
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getAllCategories());
        }
    }, [dispatch, categories.length]);

    // Handle success navigation
    useEffect(() => {
        if (success) {
            navigate('/');
            dispatch(resetSuccess());
        }
    }, [success, navigate, dispatch]);

    // Clear any existing errors when component mounts
    useEffect(() => {
        dispatch(clearError());
        return () => {
            dispatch(clearForm());
        };
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name: fieldName, value } = e.target;
        dispatch(updateFormField({ field: fieldName, value }));
    };

    const validateForm = (): boolean => {
        if (!name.trim()) {
            alert('Story name is required');
            return false;
        }

        if (!category) {
            alert('Category is required');
            return false;
        }

        if (!content.trim()) {
            alert('Story content is required');
            return false;
        } else if (content.trim().length < 100) {
            alert('Story content should be at least 100 characters');
            return false;
        }

        if (!imageUrl.trim()) {
            alert('Image URL is required');
            return false;
        } else {
            // Basic URL validation
            try {
                new URL(imageUrl);
            } catch {
                alert('Please enter a valid URL');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Double check authentication before submitting
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (!token || isTokenExpired(token)) {
            performAutoLogout(navigate, dispatch, 'Session expired. Please log in again');
            return;
        }

        // Dispatch the create story action
        dispatch(createStoryRequest({
            name,
            category,
            content,
            imageUrl,
            author,
            authorEmail,
            createdAt
        }));
    };

    const handleCancel = () => {
        dispatch(clearForm());
        navigate('/');
    };

    // Get session info for display
    const getSessionInfo = () => {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (!token) return null;

        const decoded = decodeJWT(token);
        if (!decoded || !decoded.exp) return null;

        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = decoded.exp - currentTime;

        if (timeUntilExpiry <= 0) return null;

        const hours = Math.floor(timeUntilExpiry / 3600);
        const minutes = Math.floor((timeUntilExpiry % 3600) / 60);

        return { hours, minutes, totalSeconds: timeUntilExpiry };
    };

    const sessionInfo = getSessionInfo();

    // Show loading if authentication is being checked
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Session Status Indicator */}
            {sessionInfo && (
                <div className={`${sessionInfo.totalSeconds <= 300 ? 'bg-red-100 border-red-200' : 'bg-green-100 border-green-200'} border-b`}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                        <div className="flex items-center justify-center">
                            <div className={`flex items-center text-sm ${sessionInfo.totalSeconds <= 300 ? 'text-red-700' : 'text-green-700'}`}>
                                <div className={`w-2 h-2 rounded-full animate-pulse mr-2 ${sessionInfo.totalSeconds <= 300 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                <span>
                                    {sessionInfo.totalSeconds <= 300
                                        ? `⚠️ Session expires in ${sessionInfo.hours}h ${sessionInfo.minutes}m - Please save your work!`
                                        : `🔐 Session Active - ${sessionInfo.hours}h ${sessionInfo.minutes}m remaining`
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Create New Story</h1>
                        <button
                            onClick={handleCancel}
                            className="text-gray-500 hover:text-gray-700 transition duration-200"
                            disabled={loading}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Story Name */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="mb-6">
                            <label htmlFor="name"
                                   className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                                <span className="mr-2">📝</span>
                                Story Title
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                placeholder="Enter your story title..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition duration-200"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Category & Image URL */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Category */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <label htmlFor="category"
                                   className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                                <span className="mr-2">📚</span>
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition duration-200"
                                disabled={loading}
                            >
                                <option value="">Select a category...</option>
                                {categoriesLoading ? (
                                    <option value="">Loading categories...</option>
                                ) : (
                                    categories.map((cat, index) => (
                                        <option key={cat.id || index} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        {/* Image URL */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <label htmlFor="imageUrl"
                                   className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                                <span className="mr-2">🖼️</span>
                                Cover Image URL
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={handleInputChange}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition duration-200"
                                disabled={loading}
                            />
                            {imageUrl && (
                                <div className="mt-4">
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        className="w-full h-32 object-cover rounded-lg"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Story Content */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <label htmlFor="content" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                            <span className="mr-2">✍️</span>
                            Story Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={content}
                            onChange={handleInputChange}
                            placeholder="Start writing your story here..."
                            rows={15}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition duration-200 resize-none"
                            disabled={loading}
                        />
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-gray-500 text-sm ml-auto">
                                {content.length} characters
                            </p>
                        </div>
                    </div>

                    {/* Author Info Display (Read-only) */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center mr-2">
                                <span className="flex items-center text-gray-700 font-medium">
                                    <span className="mr-2">👤</span>
                                    Author:
                                </span>
                                <span className="text-gray-900 font-mono ml-2">
                                    {author}
                                </span>
                            </div>
                            <div className="flex items-center mr-2">
                                <span className="flex items-center text-gray-700 font-medium">
                                    <span className="mr-2">📧</span>
                                    Email:
                                </span>
                                <span className="text-gray-900 font-mono ml-2">
                                    {authorEmail}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center mr-2">
                            <span className="flex items-center text-gray-700 font-medium">
                                <span className="mr-2">📅</span>
                                Created At:
                            </span>
                            <span className="text-gray-900 font-mono ml-2">
                                {new Date(createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                            <div className="flex items-center">
                                <span className="text-red-500 mr-2">⚠️</span>
                                <span className="text-red-700 font-medium">Error: {error}</span>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-semibold"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition duration-300 font-semibold flex items-center justify-center ${
                                loading ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <span className="mr-2">🚀</span>
                                    Publish Story
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}