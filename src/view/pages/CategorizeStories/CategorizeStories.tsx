
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../store/store.ts";
import { fetchStoriesByCategory } from "../../../slices/storySlice.ts";

export function CategorizeStories() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { categoryName } = useParams<{ categoryName: string }>();

    const { stories, loading, error } = useSelector((state: RootState) => state.story);

    useEffect(() => {
        if (categoryName) {
            dispatch(fetchStoriesByCategory(categoryName));
        }
    }, [dispatch, categoryName]);

    const handleReadStory = (storyId: string) => {
        navigate(`/story/${storyId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">

            <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-transparent to-blue-100 opacity-50"></div>
                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-medium">
                            <span className="mr-2">📚</span>
                            Story Collection
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Stories in:
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> {categoryName}</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Discover amazing stories from talented writers in this category. Each story is crafted with
                            passion and creativity.
                        </p>
                    </div>
                </div>
            </section>


            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">


                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center space-y-4">
                                <div className="inline-flex items-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full">
                                    <svg className="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading amazing stories...
                                </div>
                            </div>
                        </div>
                    )}


                    {error && (
                        <div className="flex items-center justify-center py-20">
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
                                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                                <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                                <p className="text-red-600">{error}</p>
                            </div>
                        </div>
                    )}


                    {!loading && !error && stories.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {stories.map((story) => (
                                <div
                                    key={story.id}
                                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
                                    onClick={() => handleReadStory(story.id)}
                                >
                                    {/* Story Image */}
                                    {story.imageUrl && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={story.imageUrl}
                                                alt={story.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            {/* Category Badge on Image */}
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                    <span className="mr-1">📖</span>
                                                    {story.category}
                                                </span>
                                            </div>
                                        </div>
                                    )}


                                    <div className="p-6 space-y-4">
                                        {/* Story Title */}
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                                            {story.name}
                                        </h3>


                                        <div className="flex items-center space-x-2">
                                            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-full">
                                                <span className="text-sm">✍️</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    By <span className="font-semibold text-gray-900">{story.author}</span>
                                                </p>
                                            </div>
                                        </div>


                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                            <div className="flex items-center space-x-2">
                                                <div className="bg-gray-100 p-1.5 rounded-full">
                                                    <span className="text-xs">📅</span>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(story.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>


                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent card click
                                                    handleReadStory(story.id);
                                                }}
                                                className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center space-x-1 group-hover:underline transition-all duration-300"
                                            >
                                                <span>Read More</span>
                                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}


                    {!loading && !error && stories.length === 0 && (
                        <div className="text-center py-20">
                            <div className="space-y-6">
                                <div className="text-6xl">📚</div>
                                <h3 className="text-2xl font-bold text-gray-900">No Stories Yet</h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    This category doesn't have any stories yet. Be the first to share your creativity!
                                </p>
                                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition duration-300 font-semibold">
                                    <span className="mr-2">✍️</span>
                                    Write First Story
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}