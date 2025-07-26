

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../api.ts";

interface StoryFormData {
    name: string;
    category: string;
    content: string;
    imageUrl: string;
    author: string;
    authorEmail: string;
    createdAt: string;
    error: string | null | undefined;
    loading: boolean;
    success: boolean;
    isAuthenticated: boolean;
}

const initialState: StoryFormData = {
    name: '',
    category: '',
    content: '',
    imageUrl: '',
    author: 'Anonymous Writer',
    authorEmail: 'anonymous@storyapp.com',
    createdAt: new Date().toISOString(),
    error: null,
    loading: false,
    success: false,
    isAuthenticated: false,
};

// Story create කරන async thunk with JWT token
export const createStoryRequest = createAsyncThunk(
    'story/create',
    async (data: {
        name: string;
        category: string;
        content: string;
        imageUrl: string;
        author: string;
        authorEmail: string;
        createdAt: string;
    }) => {
        // Get JWT token from storage
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

        if (!token) {
            throw new Error('No authentication token found');
        }

        // Add token to request headers
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await backendApi.post("/story/save", data, config);
        const message = response.data.message;
        alert(message);
        return response.data;
    }
);

export const getAllStoriesRequest = createAsyncThunk(
    'story/getAll',
    async () => {
        const response = await backendApi.get("/story/all");
        return response.data;
    }
);

export const getStoriesByCategoryRequest = createAsyncThunk(
    'story/getByCategory',
    async (categoryName: string) => {
        const response = await backendApi.get(`/story/category/${categoryName}`);
        return response.data;
    }
);

export const getStoryByIdRequest = createAsyncThunk(
    'story/getById',
    async (storyId: string) => {
        const response = await backendApi.get(`/story/${storyId}`);
        return response.data;
    }
);

const startWritingSlice = createSlice({
    name: 'startWriting',
    initialState: initialState,
    reducers: {
        // Form clear කරන action
        clearForm: (state) => {
            state.name = '';
            state.category = '';
            state.content = '';
            state.imageUrl = '';
            // Don't reset author info if user is authenticated
            if (!state.isAuthenticated) {
                state.author = 'Anonymous Writer';
                state.authorEmail = 'anonymous@storyapp.com';
            }
            state.createdAt = new Date().toISOString();
            state.error = null;
            state.success = false;
        },

        updateFormField: (state, action) => {
            const { field, value } = action.payload;
            (state as any)[field] = value;
        },

        clearError: (state) => {
            state.error = null;
        },

        resetSuccess: (state) => {
            state.success = false;
        },

        updateCreatedAt: (state) => {
            state.createdAt = new Date().toISOString();
        },

        // Set user info from JWT token
        setUserFromToken: (state, action) => {
            const { email, username } = action.payload;
            state.author = username;
            state.authorEmail = email;
            state.isAuthenticated = true;
        },

        // Clear authentication
        clearAuthentication: (state) => {
            state.author = 'Anonymous Writer';
            state.authorEmail = 'anonymous@storyapp.com';
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStoryRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                alert("Creating your story, please wait...");
            })
            .addCase(createStoryRequest.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                // Clear form after successful submission but keep user info
                state.name = '';
                state.category = '';
                state.content = '';
                state.imageUrl = '';
                state.createdAt = new Date().toISOString();
                alert("Story created successfully!");
            })
            .addCase(createStoryRequest.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.error.message;

                // Check if error is related to authentication
                if (action.error.message?.includes('authentication') ||
                    action.error.message?.includes('token') ||
                    action.error.message?.includes('unauthorized')) {
                    state.isAuthenticated = false;
                    alert("Authentication expired. Please log in again.");
                } else {
                    alert("Error creating story: " + state.error);
                }
            });

        builder
            .addCase(getAllStoriesRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStoriesRequest.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllStoriesRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                alert("Error fetching stories: " + state.error);
            });

        builder
            .addCase(getStoriesByCategoryRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStoriesByCategoryRequest.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(getStoriesByCategoryRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                alert("Error fetching category stories: " + state.error);
            });

        builder
            .addCase(getStoryByIdRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStoryByIdRequest.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(getStoryByIdRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                alert("Error fetching story: " + state.error);
            });
    }
});

export const {
    clearForm,
    updateFormField,
    clearError,
    resetSuccess,
    updateCreatedAt,
    setUserFromToken,
    clearAuthentication
} = startWritingSlice.actions;

export const startWritingReducer = startWritingSlice.reducer;
export default startWritingSlice.reducer;
