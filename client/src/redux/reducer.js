import { ADD_POKEMON, ADD_TYPES, PREV, NEXT, FILTER, ORDER } from "./types";

const initialState = {
    allPokemons: [],
    pokemons: [],
    types: [],
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
        case ADD_TYPES:
            if (Array.isArray(payload)) {
                return {
                    ...state,
                    types: [...payload]
                };
            }
            return {
                ...state,
                types: [...payload]
            };
        case PREV:
            if (state.numPage === 1) return { ...state, numPage: Math.floor(state.pokemons.length / state.numCards) + 1 };
            return {
                ...state,
                numPage: state.numPage - 1
            };
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
            };
        case FILTER: {
            let newListPokemon = null;
            payload === 'all'
                ? newListPokemon = state.allPokemons
                : newListPokemon = [...state.allPokemons].filter(pokemon => pokemon.tipos.includes(payload));
            return { ...state, pokemons: newListPokemon, numPage: 1 };
        }
        case ORDER: {
            let orderPokemon = null;
            if (payload === 'default') orderPokemon = state.allPokemons
            if (payload === 'asc') orderPokemon = [...state.allPokemons].sort((a, b) => a.nombre.localeCompare(b.nombre));
            if (payload === 'desc') orderPokemon = [...state.allPokemons].sort((a, b) => b.nombre.localeCompare(a.nombre));
            return {
                ...state, pokemons: orderPokemon,
            }
        }
        default:
            return state
    }
}