

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store.ts';
import {
    getAllCategories,
    toggleDropdown,
    selectCategory, closeDropdown
} from '../../../slices/homeSlice.ts';

export function Home() {


    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {
        categories,
        loading,
        error,
        isDropdownOpen,

    } = useSelector((state: RootState) => state.home);

    const handleToggleDropdown = () => {
        dispatch(toggleDropdown());

        if (!isDropdownOpen && categories.length === 0) {
            dispatch(getAllCategories());
        }
    };

    const handleSelectCategory = (category: any) => {
        dispatch(selectCategory(category));
        dispatch(closeDropdown());
        navigate(`/category/${category.name}`); // Go to dynamic page
    };


    const features = [
        {
            icon: "✍️",
            title: "Intuitive Writing Tools",
            description: "Advanced editor with auto-save, formatting options, and distraction-free writing mode to unleash your creativity."
        },
        {
            icon: "👥",
            title: "Vibrant Community",
            description: "Connect with fellow writers, get feedback, join writing challenges, and grow together in our supportive community."
        },
        {
            icon: "🏆",
            title: "Recognition & Rewards",
            description: "Participate in contests, win prizes, get featured, and build your reputation as a talented storyteller."
        },
        {
            icon: "🌍",
            title: "Global Reach",
            description: "Share your stories with readers worldwide. Our platform supports multiple languages and cultures."
        },
        {
            icon: "⚡",
            title: "AI Writing Assistant",
            description: "Get suggestions, overcome writer's block, and enhance your storytelling with our intelligent writing companion."
        },
        {
            icon: "🛡️",
            title: "Copyright Protection",
            description: "Your work is protected with timestamp verification and copyright tools to secure your intellectual property."
        }
    ];

    const benefits = [
        {
            title: "Build Your Author Brand",
            description: "Create a professional writer profile, showcase your portfolio, and attract followers who love your work.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
        },
        {
            title: "Monetize Your Stories",
            description: "Turn your passion into profit with premium subscriptions, story sales, and sponsored content opportunities.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
        },
        {
            title: "Learn & Improve",
            description: "Access writing masterclasses, get expert feedback, and join workshops to continuously improve your craft.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">

            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-transparent to-blue-100 opacity-50"></div>
                <div className="max-w-7xl mx-auto relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                                <span className="mr-2">💡</span>
                                Transform Your Ideas Into Stories
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                Your Stories
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Deserve </span>
                                The World
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Join the most innovative storytelling platform where creativity meets opportunity.
                                Write, publish, earn, and connect with millions of readers globally.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">


                                <Link
                                    to="/startWriting"
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center justify-center font-semibold"
                                >
                                    <span className="mr-2">✍️</span>
                                    Start Writing Today
                                </Link>


                                <div className="relative">
                                    <button
                                        onClick={handleToggleDropdown}
                                        className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl hover:bg-purple-600 hover:text-white transition duration-300 flex items-center justify-center font-semibold w-full sm:w-auto"
                                    >
                                        <span className="mr-2">⭐</span>
                                        See Success Stories
                                        <svg
                                            className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>


                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
                                            {loading && (
                                                <div className="px-4 py-3 text-gray-500 text-sm flex items-center">
                                                    <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Loading categories...
                                                </div>
                                            )}

                                            {error && (
                                                <div className="px-4 py-3 text-red-500 text-sm">
                                                    Error: {error}
                                                </div>
                                            )}

                                            {!loading && !error && categories.length === 0 && (
                                                <div className="px-4 py-3 text-gray-500 text-sm">
                                                    No categories found
                                                </div>
                                            )}


                                            {!loading && categories.length > 0 && categories.map((category, index) => (
                                                <button
                                                    key={category.id || index}
                                                    onClick={() => handleSelectCategory(category)}
                                                    className="w-full text-left px-4 py-3 hover:bg-purple-50 hover:text-purple-600 transition duration-200 text-sm border-b border-gray-100 last:border-b-0"
                                                >
                                                    {category.name || 'Unknown Category'}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 pt-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                                    <div className="text-gray-600">Active Writers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">2M+</div>
                                    <div className="text-gray-600">Stories Published</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">10M+</div>
                                    <div className="text-gray-600">Monthly Readers</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-3xl transform rotate-3 opacity-20"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform -rotate-3 opacity-20"></div>
                            <img
                                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop"
                                alt="Creative writing workspace"
                                className="relative rounded-3xl shadow-2xl w-full h-96 object-cover z-10"
                            />
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <span className="text-xl">🎯</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">98%</div>
                                        <div className="text-gray-600 text-sm">Success Rate</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-8 -right-8 bg-white p-6 rounded-2xl shadow-xl z-20">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <span className="text-xl">🥇</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">#1</div>
                                        <div className="text-gray-600 text-sm">Writing Platform</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <span className="mr-2">⭐</span>
                            Platform Features
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Everything You Need to
                            <span className="text-purple-600"> Succeed</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our platform is designed with writers in mind, providing all the tools and support you need to create, share, and monetize your stories.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group">
                                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 border border-gray-100 h-150">
                                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                        <span className="text-2xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="benefits" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <span className="mr-2">🏆</span>
                            Your Success Story
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Turn Your Passion Into
                            <span className="text-blue-600"> Profit</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="group">
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-500 transform hover:scale-105">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={benefit.image}
                                            alt={benefit.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                    <div className="p-8 h-120">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}


