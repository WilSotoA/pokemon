import { ADD_POKEMON, PREV, NEXT } from "./types";

const initialState = {
    pokemons: [],
    allPokemons: [],
    numPage: 1,
    numCards: 12
};
export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_POKEMON:
        if (Array.isArray(payload)) {
            return {
                ...state,
                pokemons: [...payload],
                allPokemons: [...payload]
            };
        }
        return {
            ...state,
            pokemons: [payload, ...state.allPokemons],
            allPokemons: [payload, ...state.allPokemons]
        };
        case PREV:
            if (state.numPage === 1) return { ...state, numPage: Math.floor(state.pokemons.length / state.numCards) + 1 };
            return {
                ...state,
                numPage: state.numPage - 1
            }
        case NEXT:
            if (state.numPage === Math.floor(state.pokemons.length / state.numCards) + 1) {
                return {
                    ...state,
                    numPage: 1
                }
            }
            return {
                ...state,
                numPage: state.numPage + 1
            }
        default:
            return state
    }
}