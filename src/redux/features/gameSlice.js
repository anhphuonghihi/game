import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllTopic, GetVocaByIDTopic } from "../../utils/api";
const initialState = {
  topic: {
    data: [],
  },
  loading: false,
  vocaByIDTopic: [],
};
export const fetchAllTopic = createAsyncThunk(
  "/api/topic/GetAllTopic",
  async () => {
    return GetAllTopic();
  }
);
export const fetchVocaByIDTopic = createAsyncThunk(
  "/api/vocalbulary/GetVocaByIDTopic/id",
  async (id) => {
    console.log(id);
    return GetVocaByIDTopic(id);
  }
);
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTopic.fulfilled, (state, action) => {
        state.topic = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAllTopic.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchVocaByIDTopic.fulfilled, (state, action) => {
        state.vocaByIDTopic = action.payload.data.data;
        state.loading = false;
      })
      .addCase(fetchVocaByIDTopic.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export const { increment, decrement, incrementByAmount } = gameSlice.actions;

export default gameSlice.reducer;
