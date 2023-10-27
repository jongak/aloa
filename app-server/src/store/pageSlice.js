import { createSlice } from "@reduxjs/toolkit";

const pagingSlice = createSlice({
  name: "viewPage",
  initialState: { page: 1, pageList: [], allList: [], regionList: [] },
  reducers: {
    prev(state, action) {
      state.page -= action.payload.step;
    },
    next(state, action) {
      state.page += action.payload.step;
    },
    setPage(state, action) {
      state.page = action.payload.newPage;
    },
    setPageList(state, action) {
      state.pageList = action.payload.newPageList;
    },
    // 이러면 무결성 깨짐 다른방법 강구해볼것
    pushList(state, action) {
      var ch = true;
      state.pageList.forEach((page) => {
        if (page.id == action.payload.newPage.id) ch = false;
      });
      if (ch) {
        state.pageList.unshift(action.payload.newPage);
        state.pageList = state.pageList.slice(0, 4);
      }
    },
    setAllList(state, action) {
      state.allList = action.payload.newAllList;
    },
    setRegionList(state, action) {
      state.regionList = action.payload.newRegionList;
    },
  },
});

export default pagingSlice;
export const {
  next,
  prev,
  setPage,
  setPageList,
  setAllList,
  pushList,
  setRegionList,
} = pagingSlice.actions;
