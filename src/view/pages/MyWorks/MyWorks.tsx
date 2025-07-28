



import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import type {RootReducerState} from "../../../slices/rootReducer.ts";
import {
    deleteStory,
    loadUserStories,
    setEditingStory,
    setSelectedStory,
    setUpdateData,
    updateStory,
    clearError
} from "../../../slices/myWorkSlice.ts";

interface Story {
    id: string;
    name: string;
    category: string;
    author: string;
    authorEmail: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
}

export function MyWorks() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        stories,
        loading,
        error,
        userEmail,
        selectedStory,
        editingStory,
        updateData,
        isUpdating
    } = useSelector((state: RootReducerState) => state.myWork);

    useEffect(() => {
        dispatch(loadUserStories() as any);
    }, [dispatch]);


    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000); // Clear error after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleDeleteStory = async (storyId: string) => {
        if (!storyId) {
            alert('Error: Story ID not found');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this story?')) {
            return;
        }

        try {
            console.log('Attempting to delete story with ID:', storyId);
            await dispatch(deleteStory(storyId) as any).unwrap();
            alert('Story deleted successfully!');
        } catch (error: any) {
            console.error('Delete error:', error);
            alert(`Error deleting story: ${error}`);
        }
    };

    const handleEditStory = (story: Story) => {
        if (!story || !story.id) {
            alert('Error: Story data is incomplete');
            return;
        }

        console.log('Editing story:', story);
        dispatch(setEditingStory(story));
    };

    const handleUpdateStory = async () => {
        if (!editingStory || !editingStory.id) {
            alert('Error: No story selected for editing or story ID missing');
            return;
        }


        if (!updateData.name.trim()) {
            alert('Please enter a story name');
            return;
        }
        if (!updateData.category.trim()) {
            alert('Please enter a category');
            return;
        }
        if (!updateData.content.trim()) {
            alert('Please enter story content');
            return;
        }

        try {
            console.log('Updating story with ID:', editingStory.id);
            console.log('Update data:', updateData);

            await dispatch(updateStory({
                storyId: editingStory.id,
                updateData
            }) as any).unwrap();

            alert('Story updated successfully!');
            navigate("/");
        } catch (error: any) {
            console.error('Update error:', error);
            alert(`Error updating story: ${error}`);
        }
    };

    const handleRetryLoad = () => {
        dispatch(loadUserStories() as any);
    };

    const handleCloseSelectedStory = () => {
        dispatch(setSelectedStory(null));
    };

    const handleCloseEditModal = () => {
        dispatch(setEditingStory(null));
    };

    const handleUpdateDataChange = (field: string, value: string) => {
        dispatch(setUpdateData({ [field]: value }));
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateContent = (content: string, maxLength: number = 150) => {
        return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <svg className="animate-spin h-16 w-16 text-purple-600" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <span className="mr-2">📚</span>
                        Loading Your Stories
                    </div>
                    <p className="text-xl text-gray-600">Please wait while we fetch your amazing stories...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
                        <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <span className="text-2xl">😕</span>
                        </div>
                        <div className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <span className="mr-2">⚠️</span>
                            Something Went Wrong
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
                        <button
                            onClick={handleRetryLoad}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center justify-center font-semibold w-full"
                        >
                            <span className="mr-2">🔄</span>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">

            {error && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    <div className="flex items-center">
                        <span className="mr-2">⚠️</span>
                        {error}
                    </div>
                </div>
            )}


            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-transparent to-blue-100 opacity-50"></div>
                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <span className="mr-2">✍️</span>
                            Your Creative Journey
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                            My
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Stories</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
                            Welcome back, <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{userEmail}</span>.
                            Here's your collection of amazing stories that inspire and captivate readers worldwide.
                        </p>
                    </div>
                </div>
            </section>


            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {stories.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 w-32 h-32 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                                <span className="text-6xl">📚</span>
                            </div>
                            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <span className="mr-2">🌟</span>
                                Ready to Begin
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Story Collection Awaits</h2>
                            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                                You haven't written any stories yet, but every great author started with a blank page.
                                Your storytelling journey begins with a single word.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    <span className="mr-2">📖</span>
                                    Your Published Works
                                </div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                    Stories That
                                    <span className="text-purple-600"> Inspire</span>
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {stories.map((story) => (
                                    <div key={story.id} className="group">
                                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden h-full">
                                            <div className="relative h-48 overflow-hidden">
                                                {story.imageUrl ? (
                                                    <img
                                                        src={story.imageUrl}
                                                        alt={story.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center group-hover:scale-110 transition duration-500">
                                                        <span className="text-white text-4xl">📖</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                                <div className="absolute top-4 right-4">
                                                    <span className="bg-white/90 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                        {story.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition duration-300">
                                                    {story.name}
                                                </h3>

                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                                    {truncateContent(story.content)}
                                                </p>

                                                <div className="flex items-center justify-between text-sm text-gray-500 mb-6 border-t border-gray-100 pt-4">
                                                    <div className="flex items-center">
                                                        <span className="mr-1">📅</span>
                                                        {formatDate(story.createdAt)}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="mr-1">✍️</span>
                                                        {story.author}
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => dispatch(setSelectedStory(story))}
                                                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center"
                                                    >
                                                        <span className="mr-2">📖</span>
                                                        Read
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditStory(story)}
                                                        className="bg-gradient-to-r from-emerald-200 to-teal-300 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300"
                                                        title="Edit Story"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteStory(story.id)}
                                                        className="bg-gradient-to-r from-rose-300 to-pink-400 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300"
                                                        title="Delete Story"
                                                    >
                                                        🗑️
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>


            {selectedStory && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <div className="inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                                    <span className="mr-1">📚</span>
                                    {selectedStory.category}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedStory.name}</h2>
                                <p className="text-gray-600">by {selectedStory.author}</p>
                            </div>
                            <button
                                onClick={handleCloseSelectedStory}
                                className="text-gray-500 hover:text-gray-700 hover:bg-white rounded-full p-2 transition duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[70vh]">
                            {selectedStory.imageUrl && (
                                <img
                                    src={selectedStory.imageUrl}
                                    alt={selectedStory.name}
                                    className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
                                />
                            )}

                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                                    {selectedStory.content}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                                <div className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p className="flex items-center">
                                        <span className="mr-2">📅</span>
                                        Published on {formatDate(selectedStory.createdAt)}
                                    </p>
                                    <p className="flex items-center">
                                        <span className="mr-2">🆔</span>
                                        Story ID: {selectedStory.id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {editingStory && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <div className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                                    <span className="mr-1">✏️</span>
                                    Edit Mode
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Edit Your Story</h2>
                                <p className="text-gray-600">
                                    Update your story details and content
                                    {editingStory.id && <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">ID: {editingStory.id}</span>}
                                </p>
                            </div>
                            <button
                                onClick={handleCloseEditModal}
                                className="text-gray-500 hover:text-gray-700 hover:bg-white rounded-full p-2 transition duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[70vh]">
                            <div className="space-y-6">

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">
                                        <span className="flex items-center">
                                            <span className="mr-2">📝</span>
                                            Story Name *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={updateData.name}
                                        onChange={(e) => handleUpdateDataChange('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                                        placeholder="Enter your amazing story title"
                                    />
                                </div>


                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">
                                        <span className="flex items-center">
                                            <span className="mr-2">🏷️</span>
                                            Category *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={updateData.category}
                                        onChange={(e) => handleUpdateDataChange('category', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                                        placeholder="e.g., Adventure, Romance, Mystery, Sci-Fi..."
                                    />
                                </div>


                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">
                                        <span className="flex items-center">
                                            <span className="mr-2">🖼️</span>
                                            Cover Image URL (Optional)
                                        </span>
                                    </label>
                                    <input
                                        type="url"
                                        value={updateData.imageUrl}
                                        onChange={(e) => handleUpdateDataChange('imageUrl', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                                        placeholder="https://example.com/your-story-cover.jpg"
                                    />
                                </div>


                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">
                                        <span className="flex items-center">
                                            <span className="mr-2">📖</span>
                                            Story Content *
                                        </span>
                                    </label>
                                    <textarea
                                        value={updateData.content}
                                        onChange={(e) => handleUpdateDataChange('content', e.target.value)}
                                        rows={12}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition duration-300"
                                        placeholder="Write your captivating story here... Let your imagination flow!"
                                    />
                                </div>


                                <div className="flex gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={handleCloseEditModal}
                                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center"
                                        disabled={isUpdating}
                                    >
                                        <span className="mr-2">❌</span>
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdateStory}
                                        disabled={isUpdating || !updateData.name.trim() || !updateData.category.trim() || !updateData.content.trim()}
                                        className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating Your Story...
                                            </>
                                        ) : (
                                            <>
                                                <span className="mr-2">💾</span>
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}