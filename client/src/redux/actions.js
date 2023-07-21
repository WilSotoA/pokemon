import { ADD_POKEMON, ADD_TYPES, PREV, NEXT, CHANGE_PAGE, ORDER, FILTER, SEARCH } from "./types";
import axios from 'axios';
const { VITE_SERVER_URL } = import.meta.env;



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

export const changePage = (page) => {
    return {
        type: CHANGE_PAGE,
        payload: page
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

export const searchName = (name) => {
    const endpoint = `${VITE_SERVER_URL}name?name=${name}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: SEARCH,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: SEARCH,
                payload: '',
            });
        }
    }
}