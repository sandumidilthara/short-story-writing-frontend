// src/pages/StoryDetailPage.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../store/store.ts";
import { fetchStoryById, clearCurrentStory } from "../../../slices/contentSlice.ts";

export function StoryDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { storyId } = useParams<{ storyId: string }>();

    const { currentStory, storyLoading, storyError } = useSelector((state: RootState) => state.content);

    useEffect(() => {
        if (storyId) {
            dispatch(fetchStoryById(storyId));
        }

        // Cleanup when component unmounts
        return () => {
            dispatch(clearCurrentStory());
        };
    }, [dispatch, storyId]);

    const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Loading State */}
            {storyLoading && (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center bg-purple-100 text-purple-700 px-6 py-3 rounded-full">
                            <svg className="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading story...
                        </div>
                    </div>
                </div>
            )}

            {/* Error State */}
            {storyError && (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
                        <div className="text-red-500 text-4xl mb-4">⚠️</div>
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Story Not Found</h3>
                        <p className="text-red-600 mb-4">{storyError}</p>
                        <button
                            onClick={handleGoBack}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition duration-300"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            )}

            {/* Story Content */}
            {currentStory && !storyLoading && (
                <>
                    {/* Header with Back Button */}
                    <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <button
                                onClick={handleGoBack}
                                className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Stories
                            </button>
                        </div>
                    </div>

                    {/* Story Header */}
                    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            {/* Story Image */}
                            {currentStory.imageUrl && (
                                <div className="relative h-96 mb-8 rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src={currentStory.imageUrl}
                                        alt={currentStory.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                                    {/* Category Badge */}
                                    <div className="absolute top-6 left-6">
                                        <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                                            <span className="mr-2">📖</span>
                                            {currentStory.category}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Story Meta */}
                            <div className="text-center space-y-6 mb-12">
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    {currentStory.name}
                                </h1>

                                <div className="flex items-center justify-center space-x-6 text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-full">
                                            <span className="text-lg">✍️</span>
                                        </div>
                                        <span className="font-semibold">By {currentStory.author}</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <div className="bg-gray-100 p-2 rounded-full">
                                            <span className="text-lg">📅</span>
                                        </div>
                                        <span>
                                            {new Date(currentStory.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Story Content */}
                    <section className="pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
                                <div className="prose prose-lg prose-purple max-w-none">
                                    <div
                                        className="text-gray-700 leading-relaxed text-lg"
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {currentStory.content}
                                    </div>
                                </div>

                                {/* Story Footer */}
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            Story ID: {currentStory.id}
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <button className="text-purple-600 hover:text-purple-800 transition-colors duration-300">
                                                <span className="mr-2">👏</span>
                                                Appreciate
                                            </button>
                                            <button className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                                                <span className="mr-2">🔗</span>
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}