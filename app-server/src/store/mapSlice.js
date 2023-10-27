import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "myMap",
  initialState: {
    mapItude: [],
    mapCode: 0,
    mapData: { 28: [], 14: [], 15: [], 39: [] },
    regionId: 2,
  },
  reducers: {
    setMapItude(state, action) {
      state.mapItude = action.payload.newMapItude;
    },
    setMapCode(state, action) {
      state.mapCode = action.payload.newMapCode;
    },
    setMapData(state, action) {
      state.mapData = action.payload.newMapData;
    },
    setRegionId(state, action) {
      state.regionId = action.payload.newRegionId;
    },
  },
});

export default mapSlice;
export const { setMapItude, setMapCode, setMapData, setRegionId } =
  mapSlice.actions;
