import { createSlice } from "@reduxjs/toolkit";

const estadoIni = {
    libros: [],
    detalle: {
        tipo: '',
        topografico: '',
        titulo: '',
        autores: '',
        editorial: '',
        isbn: '',
        paginas: '',
        ejemplares: '',
        resumen: '',
        tema: '',
    }
}

const reducers = createSlice(
    {
        name: 'bibloAPP',
        initialState: estadoIni,
        reducers: {
            setLibros: (state, action) => {
                console.log(action.payload);
                state.libros = action.payload;
            },
            setDetalle: (state, action) => {
                console.log(action.payload);
                state.detalle = action.payload;
            },
        }
    }
)

export const { setLibros, setDetalle } = reducers.actions;
export default reducers.reducer;