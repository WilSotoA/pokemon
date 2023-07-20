import { ADD_POKEMON, ADD_TYPES, PREV, NEXT, ORDER, FILTER } from "./types";

export function addPokemon(pokemon) {
    return {
        type: ADD_POKEMON,
        payload: pokemon,
    };
}

export function addTypes(types) {
    return {
        type: ADD_TYPES,
        payload: types,
    };
}

export const prevPage = () => {
    return {
        type: PREV
    }
}

export const nextPage = () => {
    return {
        type: NEXT
    }
}

export const filterCards = (tipo) => {
    return {
        type: FILTER,
        payload: tipo
    }
}

export const orderCards = (orden) => {
    return {
        type: ORDER,
        payload: orden
    }
}