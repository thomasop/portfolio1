import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
}

const theme = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light"
        },
    }
})

export default theme