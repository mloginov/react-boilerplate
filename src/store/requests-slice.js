import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import RequestsManager from '../api/requests-manager';

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async () => RequestsManager.fetchRequests()
);

const requestsAdapter = createEntityAdapter();
const initialState = requestsAdapter.getInitialState({
  status: 'idle',
});

export const slice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        requestsAdapter.setAll(state, action.payload);
        state.status = 'idle';
      });
  },
});

export const {
  selectById: selectRequestById,
  selectIds: selectRequestsIds,
  selectEntities: selectRequestsEntities,
  selectAll: selectAllRequests,
  selectTotal: selectTotalRequests,
} = requestsAdapter.getSelectors((state) => state.requests);

export default slice.reducer;
