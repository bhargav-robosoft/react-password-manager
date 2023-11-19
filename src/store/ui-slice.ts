import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  isLoading: false,
  showMessage: false,
  message: "",
  isError: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMessage(
      state,
      action: PayloadAction<{ message: string; isError: boolean }>
    ) {
      state.showMessage = true;
      state.message = action.payload.message;
      state.isError = action.payload.isError;
    },
    hideMessage(state) {
      state.showMessage = false;
      state.message = "";
      state.isError = false;
    },
    clear(state) {
      state.showMessage = false;
      state.message = "";
      state.isError = false;
    },
  },
});

export default uiSlice.reducer;

export const uiActions = uiSlice.actions;
