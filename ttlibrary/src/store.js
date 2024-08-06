import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

const store = configureStore({
    reducer: {
        bibloAPP: reducers
    }
})

export default store;