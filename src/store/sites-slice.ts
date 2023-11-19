import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Site from "../models/Site";

const initialSitesState: { sites: Site[] } = { sites: [] };

const sitesSlice = createSlice({
  name: "sites",
  initialState: initialSitesState,
  reducers: {
    getSites(state, action: PayloadAction<Site[]>) {
      state.sites = action.payload;
    },
    addSite(state, action: PayloadAction<Site>) {
      state.sites.push(action.payload);
    },
    editSite(state, action: PayloadAction<Site>) {
      const editedSite = action.payload;
      const index = state.sites.findIndex((site) => site.id === editedSite.id);
      state.sites[index] = editedSite;
    },
    deleteSite(state, action: PayloadAction<string>) {
      state.sites = state.sites.filter((site) => site.id !== action.payload);
    },
  },
});

export default sitesSlice.reducer;

export const sitesActions = sitesSlice.actions;
