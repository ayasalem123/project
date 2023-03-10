import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllAppointments = createAsyncThunk(
  'user/getAllAppointments',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get('http://localhost:5000/book');
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get('http://localhost:5000/allusers');
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);

export const DeleteAppointment = createAsyncThunk(
  'user/DeleteAppointment',
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/delete/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const DoneAppointment = createAsyncThunk(
  'user/DoneAppointment',
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/done/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const blockuser = createAsyncThunk(
  'user/blockuser',
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/block/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const unblockuser = createAsyncThunk(
  'user/unblockuser',
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/unblock/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'admin',
  initialState: {},
  extraReducers: {
    [getAllAppointments.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllAppointments.fulfilled]: (state, action) => {
      state.loading = true;
      state.Allappointments = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [getAllAppointments.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [DeleteAppointment.pending]: (state, action) => {
      state.loading = true;
    },
    [DeleteAppointment.fulfilled]: (state, action) => {
      state.loading = true;
      state.Dletedappointment = action.payload;
      state.Allappointments = state.Allappointments.filter(
        (el) => el._id !== state.Dletedappointment._id
      );
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [DeleteAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [DoneAppointment.pending]: (state, action) => {
      state.loading = true;
    },
    [DoneAppointment.fulfilled]: (state, action) => {
      state.loading = true;
      console.log(action.payload.id);
      state.Allappointments = state.Allappointments.map((el) => {
        if (el._id == action.payload.id) {
          return [...el, (el.done = true)];
        }
        return el;
      });
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [DoneAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = true;
      state.Allusers = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [blockuser.pending]: (state, action) => {
      state.loading = true;
    },
    [blockuser.fulfilled]: (state, action) => {
      state.loading = true;
      state.blockeduser = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [blockuser.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    
  },
});
export default userSlice.reducer;
