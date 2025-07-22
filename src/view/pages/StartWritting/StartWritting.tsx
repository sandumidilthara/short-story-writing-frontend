// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch, RootState } from '../../../store/store.ts';
// import { getAllCategories } from '../../../slices/homeSlice.ts';
//
// interface StoryFormData {
//     name: string;
//     category: string;
//     content: string;
//     imageUrl: string;
//     createdAt: Date;
// }
//
// export function StartWritting() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch<AppDispatch>();
//     const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.home);
//
//     const [formData, setFormData] = useState<StoryFormData>({
//         name: '',
//         category: '',
//         content: '',
//         imageUrl: '',
//         createdAt: new Date() // Auto-fill with current date
//     });
//
//     const [errors, setErrors] = useState<Partial<StoryFormData>>({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//
//     // Fetch categories when component mounts
//     useEffect(() => {
//         if (categories.length === 0) {
//             dispatch(getAllCategories());
//         }
//     }, [dispatch, categories.length]);
//
//     // Update createdAt every second to keep it current
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setFormData(prev => ({
//                 ...prev,
//                 createdAt: new Date()
//             }));
//         }, 1000);
//
//         return () => clearInterval(interval);
//     }, []);
//
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//
//         // Clear error when user starts typing
//         if (errors[name as keyof StoryFormData]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: ''
//             }));
//         }
//     };
//
//     const validateForm = (): boolean => {
//         const newErrors: Partial<StoryFormData> = {};
//
//         if (!formData.name.trim()) {
//             newErrors.name = 'Story name is required';
//         }
//
//         if (!formData.category) {
//             newErrors.category = 'Category is required';
//         }
//
//         if (!formData.content.trim()) {
//             newErrors.content = 'Story content is required';
//         } else if (formData.content.trim().length < 100) {
//             newErrors.content = 'Story content should be at least 100 characters';
//         }
//
//         if (!formData.imageUrl.trim()) {
//             newErrors.imageUrl = 'Image URL is required';
//         } else {
//             // Basic URL validation
//             try {
//                 new URL(formData.imageUrl);
//             } catch {
//                 newErrors.imageUrl = 'Please enter a valid URL';
//             }
//         }
//
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//
//         if (!validateForm()) {
//             return;
//         }
//
//         setIsSubmitting(true);
//
//         try {
//             // Here you would typically make an API call to save the story
//             console.log('Story data to submit:', formData);
//
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 2000));
//
//             // Navigate to success page or story view
//             alert('Story created successfully!');
//             navigate('/');
//
//         } catch (error) {
//             console.error('Error creating story:', error);
//             alert('Failed to create story. Please try again.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//
//     const handleCancel = () => {
//         navigate('/');
//     };
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
//             {/* Header */}
//             <div className="bg-white shadow-sm border-b">
//                 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//                     <div className="flex items-center justify-between">
//                         <h1 className="text-2xl font-bold text-gray-900">Create New Story</h1>
//                         <button
//                             onClick={handleCancel}
//                             className="text-gray-500 hover:text-gray-700 transition duration-200"
//                         >
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Form */}
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <form onSubmit={handleSubmit} className="space-y-8">
//                     {/* Story Name */}
//                     <div className="bg-white rounded-xl shadow-lg p-8">
//                         <div className="mb-6">
//                             <label htmlFor="name" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
//                                 <span className="mr-2">📝</span>
//                                 Story Title
//                             </label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                                 placeholder="Enter your story title..."
//                                 className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition duration-200 ${
//                                     errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'
//                                 }`}
//                             />
//                             {errors.name && (
//                                 <p className="mt-2 text-red-600 text-sm flex items-center">
//                                     <span className="mr-1">⚠️</span>
//                                     {errors.name}
//                                 </p>
//                             )}
//                         </div>
//                     </div>
//
//                     {/* Category & Image URL */}
//                     <div className="grid md:grid-cols-2 gap-8">
//                         {/* Category */}
//                         <div className="bg-white rounded-xl shadow-lg p-8">
//                             <label htmlFor="category" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
//                                 <span className="mr-2">📚</span>
//                                 Category
//                             </label>
//                             <select
//                                 id="category"
//                                 name="category"
//                                 value={formData.category}
//                                 onChange={handleInputChange}
//                                 className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition duration-200 ${
//                                     errors.category ? 'border-red-500 bg-red-50' : 'border-gray-200'
//                                 }`}
//                             >
//                                 <option value="">Select a category...</option>
//                                 {categoriesLoading ? (
//                                     <option value="">Loading categories...</option>
//                                 ) : (
//                                     categories.map((category, index) => (
//                                         <option key={category.id || index} value={category.name}>
//                                             {category.name}
//                                         </option>
//                                     ))
//                                 )}
//                             </select>
//                             {errors.category && (
//                                 <p className="mt-2 text-red-600 text-sm flex items-center">
//                                     <span className="mr-1">⚠️</span>
//                                     {errors.category}
//                                 </p>
//                             )}
//                         </div>
//
//                         {/* Image URL */}
//                         <div className="bg-white rounded-xl shadow-lg p-8">
//                             <label htmlFor="imageUrl" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
//                                 <span className="mr-2">🖼️</span>
//                                 Cover Image URL
//                             </label>
//                             <input
//                                 type="url"
//                                 id="imageUrl"
//                                 name="imageUrl"
//                                 value={formData.imageUrl}
//                                 onChange={handleInputChange}
//                                 placeholder="https://example.com/image.jpg"
//                                 className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition duration-200 ${
//                                     errors.imageUrl ? 'border-red-500 bg-red-50' : 'border-gray-200'
//                                 }`}
//                             />
//                             {errors.imageUrl && (
//                                 <p className="mt-2 text-red-600 text-sm flex items-center">
//                                     <span className="mr-1">⚠️</span>
//                                     {errors.imageUrl}
//                                 </p>
//                             )}
//                             {formData.imageUrl && !errors.imageUrl && (
//                                 <div className="mt-4">
//                                     <img
//                                         src={formData.imageUrl}
//                                         alt="Preview"
//                                         className="w-full h-32 object-cover rounded-lg"
//                                         onError={(e) => {
//                                             e.currentTarget.style.display = 'none';
//                                         }}
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//
//                     {/* Story Content */}
//                     <div className="bg-white rounded-xl shadow-lg p-8">
//                         <label htmlFor="content" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
//                             <span className="mr-2">✍️</span>
//                             Story Content
//                         </label>
//                         <textarea
//                             id="content"
//                             name="content"
//                             value={formData.content}
//                             onChange={handleInputChange}
//                             placeholder="Start writing your story here..."
//                             rows={15}
//                             className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition duration-200 resize-none ${
//                                 errors.content ? 'border-red-500 bg-red-50' : 'border-gray-200'
//                             }`}
//                         />
//                         <div className="flex justify-between items-center mt-2">
//                             {errors.content && (
//                                 <p className="text-red-600 text-sm flex items-center">
//                                     <span className="mr-1">⚠️</span>
//                                     {errors.content}
//                                 </p>
//                             )}
//                             <p className="text-gray-500 text-sm ml-auto">
//                                 {formData.content.length} characters
//                             </p>
//                         </div>
//                     </div>
//
//                     {/* Created At Display */}
//                     <div className="bg-gray-50 rounded-xl p-6">
//                         <div className="flex items-center justify-between">
//                             <span className="flex items-center text-gray-700 font-medium">
//                                 <span className="mr-2">📅</span>
//                                 Created At:
//                             </span>
//                             <span className="text-gray-900 font-mono">
//                                 {formData.createdAt.toLocaleString()}
//                             </span>
//                         </div>
//                     </div>
//
//                     {/* Action Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-4 justify-end">
//                         <button
//                             type="button"
//                             onClick={handleCancel}
//                             className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-semibold"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className={`px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition duration-300 font-semibold flex items-center justify-center ${
//                                 isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//                             }`}
//                         >
//                             {isSubmitting ? (
//                                 <>
//                                     <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Publishing...
//                                 </>
//                             ) : (
//                                 <>
//                                     <span className="mr-2">🚀</span>
//                                     Publish Story
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store.ts';
import { getAllCategories } from '../../../slices/homeSlice.ts';
import {
    createStoryRequest,
    updateFormField,
    clearForm,
    clearError,
    resetSuccess
} from '../../../slices/startWritingSlice.ts';

export function StartWritting() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

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
        success
    } = useSelector((state: RootState) => state.write);

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
                            <label htmlFor="name" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
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
                            <label htmlFor="category" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
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
                            <label htmlFor="imageUrl" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
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
                            <div className="flex items-center justify-between">
                                <span className="flex items-center text-gray-700 font-medium">
                                    <span className="mr-2">👤</span>
                                    Author:
                                </span>
                                <span className="text-gray-900 font-mono">
                                    {author}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center text-gray-700 font-medium">
                                    <span className="mr-2">📧</span>
                                    Email:
                                </span>
                                <span className="text-gray-900 font-mono">
                                    {authorEmail}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-700 font-medium">
                                <span className="mr-2">📅</span>
                                Created At:
                            </span>
                            <span className="text-gray-900 font-mono">
                                {createdAt.toLocaleString()}
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
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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