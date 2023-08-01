import { createSlice } from "@reduxjs/toolkit";
import Immutable from "seamless-immutable";

const GeneralReducer = createSlice({
  name: "general",
  initialState: Immutable({
    data: "",
    topicName: "", // Add the new field for storing the topic name
  }),
  reducers: {
    storeSummarry(state, action) {
      state.data = action.payload;
    },
    storeTopicName(state, action) {
      state.topicName = action.payload; // New reducer function to store the topic name
    },
  },
});

export const { storeSummarry, storeTopicName } = GeneralReducer.actions;

export default GeneralReducer.reducer;
