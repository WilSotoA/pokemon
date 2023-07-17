const initialState = {
    characters: [],
    allCharacters: [],
    allFavorites: [],
    myFavorites: [],
    numPage: 1,
    numCards: 4
};
export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'add':
            payload
            break
        default:
            return state
    }
}