import { ADD_POKEMON, ADD_TYPES, PREV, NEXT, CHANGE_PAGE, FILTER, ORDER, SEARCH } from "./types";

const initialState = {
    allPokemons: [],
    pokemons: [],
    types: [],
    notResult: false,
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
        case CHANGE_PAGE:
            return {
                ...state,
                numPage: payload
            }
        case FILTER: {
            let newListPokemon = null;
            if (payload === 'all') newListPokemon = state.allPokemons
            else if (payload === 'api') newListPokemon = [...state.allPokemons].filter(pokemon => pokemon.origen === payload);
            else if (payload === 'db') newListPokemon = [...state.allPokemons].filter(pokemon => pokemon.origen === payload);
            else newListPokemon = [...state.allPokemons].filter(pokemon => pokemon.tipos.includes(payload));
            if (!newListPokemon.length) state.notResult = true;
            else state.notResult = false;
            return { ...state, pokemons: newListPokemon, numPage: 1 };
        }
        case ORDER: {
            let orderPokemon = null;
            if (payload === 'default') orderPokemon = state.allPokemons
            if (payload === 'asc') orderPokemon = [...state.pokemons].sort((a, b) => a.nombre.localeCompare(b.nombre));
            if (payload === 'desc') orderPokemon = [...state.pokemons].sort((a, b) => b.nombre.localeCompare(a.nombre));
            return {
                ...state, pokemons: orderPokemon,
            }
        }
        case SEARCH:
            if (!payload) return {
                ...state,
                notResult: true
            }
            return {
                ...state,
                pokemons: payload,
                notResult: false
            }
        default:
            return state
    }
}