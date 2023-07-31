/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import Cards from "../src/components/Cards";

const mockStore = configureMockStore();

describe("Cards Component", () => {
  test("should display correct pokemons when Redux state and route change", () => {
    const initialState = {
      numPage: 1,
      numCards: 12,
      pokemons: [
        { id: 1, nombre: "Pokemon1", imagen: "imagen1", tipos: ["Tipo1"] },
        { id: 2, nombre: "Pokemon2", imagen: "imagen2", tipos: ["Tipo2"] },
      ],
      notResult: false,
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cards />
        </MemoryRouter>
      </Provider>
    );

    // Verifica que los detalles de los pokemons se muestren en la interfaz
    expect(screen.getByText("Pokemon1")).toBeDefined();
    expect(screen.getByText("Tipo1")).toBeDefined();

    store.clearActions();
    store.getState();
  });

  test("should display no se encontraron resultados", () => {
    const initialState = {
      numPage: 1,
      numCards: 12,
      pokemons: [],
      notResult: true,
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cards />
        </MemoryRouter>
      </Provider>
    );

    // Verifica que los detalles de los pokemons se muestren en la interfaz
    expect(screen.getByText("No se encontraron resultados")).toBeDefined();

    store.clearActions();
    store.getState();
  });
});
