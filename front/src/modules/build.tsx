import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface initSelectSet {
  springJvm: string;
  springLang: string;
  springPack: string;
  springPlat: string;
  springType: string;
}

const initialState: initSelectSet = {
  springJvm: '17',
  springLang: 'java',
  springPack: 'jar',
  springPlat: '2.7.5.RELEASE',
  springType: 'gradle-project',
};

export const selectSilce = createSlice({
  name: 'select',
  initialState,
  reducers: {
    editJvm: (state, action: PayloadAction<string>) => {
      state.springJvm = action.payload;
    },
    editLang: (state, action: PayloadAction<string>) => {
      state.springLang = action.payload;
    },
    editPack: (state, action: PayloadAction<string>) => {
      state.springPack = action.payload;
    },
    editPlat: (state, action: PayloadAction<string>) => {
      state.springPlat = action.payload;
    },
    editType: (state, action: PayloadAction<string>) => {
      state.springType = action.payload;
    },
  },
});

export const { editJvm, editLang, editPack, editPlat, editType } =
  selectSilce.actions;

export default selectSilce.reducer;
