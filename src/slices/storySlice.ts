
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { backendApi } from "../api";

interface Story {
    id: string;
    name: string;
    category : string;
    author : string;
    authorEmail :string;
    content : string;
    imageUrl : string;
    createdAt : Date

}

interface StoryState {
    stories: Story[];
    loading: boolean;
    error: string | null;
}

const initialState: StoryState = {
    stories: [],
    loading: false,
    error: null,
};



export const fetchStoriesByCategory = createAsyncThunk(
    'story/getStories',
    async (categoryName: string) => {
        const encodedCategory = encodeURIComponent(categoryName);
        const response = await backendApi.get(`/story/${encodedCategory}`);
        return response.data;
    }
);

const storySlice = createSlice({
    name: "story",
    initialState,
    reducers: {
        clearStories: (state) => {
            state.stories = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoriesByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStoriesByCategory.fulfilled, (state, action: PayloadAction<Story[]>) => {
                state.loading = false;
                state.stories = action.payload;
            })
            .addCase(fetchStoriesByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearStories } = storySlice.actions;
export default storySlice.reducer;
