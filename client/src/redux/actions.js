import { ADD_POKEMON, PREV, NEXT } from "./types";

export function addPokemon(pokemon) {
    return {
        type: ADD_POKEMON,
        payload: pokemon,
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