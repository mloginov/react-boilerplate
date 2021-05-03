import { configureStore } from '@reduxjs/toolkit';
import requestsReducer from './requests-slice';

export default configureStore({
  reducer: {
    requests: requestsReducer,
  },
});
