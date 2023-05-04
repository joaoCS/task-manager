import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: ""
};


const userSlice = createSlice({
	name: "user", 
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.username = action.payload;
		}
	}
});

export const selectUser = (state) => {
	return state.user;
};

export const { addUser } = userSlice.actions;

export default userSlice.reducer;