import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/navbar/userSlice";


export const store = configureStore({
	reducer: {
		user: userReducer
	}
});