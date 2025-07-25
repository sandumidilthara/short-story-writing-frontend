import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../api.ts";

interface StoryFormData {
    name: string;
    category: string;
    content: string;
    imageUrl: string;
    author: string;
    authorEmail: string;
    createdAt: Date;
    error: string | null | undefined;
    loading: boolean;
    success: boolean;
}

const initialState: StoryFormData = {
    name: '',
    category: '',
    content: '',
    imageUrl: '',
    author: 'Anonymous Writer',
    authorEmail: 'anonymous@storyapp.com',
    createdAt: new Date(),
    error: null,
    loading: false,
    success: false,
};

// Story create කරන async thunk
export const createStoryRequest = createAsyncThunk(
    'story/create',
    async (data: {
        name: string;
        category: string;
        content: string;
        imageUrl: string;
        author: string;
        authorEmail: string;
        createdAt: Date;
    }) => {
        const response = await backendApi.post("/story/save", data);
        const message = response.data.message;
        alert(message);
        return response.data; // Return data for fulfilled case
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
            state.author = 'Anonymous Writer';
            state.authorEmail = 'anonymous@storyapp.com';
            state.createdAt = new Date();
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
            state.createdAt = new Date();
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
                // Clear form after successful submission
                state.name = '';
                state.category = '';
                state.content = '';
                state.imageUrl = '';
                state.author = 'Anonymous Writer';
                state.authorEmail = 'anonymous@storyapp.com';
                state.createdAt = new Date();
                alert("Story created successfully!");
            })
            .addCase(createStoryRequest.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.error.message;
                alert("Error creating story: " + state.error);
            })


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
            })


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
            })


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
    updateCreatedAt
} = startWritingSlice.actions;


export const startWritingReducer = startWritingSlice.reducer;
export default startWritingSlice.reducer