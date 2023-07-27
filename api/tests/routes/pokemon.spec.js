/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  nombre: "bullet",
  imagen: "jpg",
  vida: 70,
  ataque: 55,
  defensa: 40,
  velocidad: 90,
  altura: 1,
  peso: 6,
  tipos: ["ghost", "electric"],
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );

  describe("GET /pokemons", () => {
    it("should get 200", async () => await agent.get("/pokemons").expect(200));
    it("response with an array of objects", async () => {
      const response = await agent.get("/pokemons")
      expect(response.body).to.be.an.instanceof(Array);
    });
  });

  describe("GET /detail/:idPokemon", () => {
    it("should get 200", async () =>
      await agent.get("/pokemons/detail/1").expect(200));
    it("response of an object with the pokemon properties", async () => {
      const response = await agent.get("/pokemons/detail/1");
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("nombre");
      expect(response.body).to.have.property("imagen");
      expect(response.body).to.have.property("vida");
      expect(response.body).to.have.property("ataque");
      expect(response.body).to.have.property("defensa");
      expect(response.body).to.have.property("velocidad");
      expect(response.body).to.have.property("altura");
      expect(response.body).to.have.property("peso");
      expect(response.body).to.have.property("tipos");
    });
  });

  describe("POST /pokemons", () => {
    const newPokemon = {
      nombre: "Bulllet",
      imagen: "jpg",
      vida: 70,
      ataque: 55,
      defensa: 40,
      velocidad: 90,
      altura: 1,
      peso: 6,
      tipos: ["ghost", "electric"],
    };
    it("should get 200", async () => {
      await agent.post("/pokemons").send(newPokemon).expect(200);
    });
    it("response of an object with the pokemon properties", async () => {
      const response = await agent.post("/pokemons").send(newPokemon);
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("nombre");
      expect(response.body).to.have.property("imagen");
      expect(response.body).to.have.property("origen");
      expect(response.body).to.have.property("tipos");
    });
    it("error response if the pokemon already exists", async () => {
      const response = await agent.post("/pokemons").send(pokemon);
      expect(response.body).to.deep.equal({ error: 'Pokemon ya creado' });
    });
  });

  describe("GET /pokemons/name?name=pokemon'", () => {
    it("should get 200", async () => {
      await agent.get("/pokemons/name?name=bullet").expect(200);
    });
    it("response of an object with the pokemon properties", async () => {
      const response = await agent.get("/pokemons/name?name=bullet")
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("nombre");
      expect(response.body).to.have.property("imagen");
      expect(response.body).to.have.property("origen");
      expect(response.body).to.have.property("tipos");
    });
    it("error response if the pokemon not found", async () => {
      const response = await agent.get("/pokemons/name?name=billy")
      expect(response.body).to.deep.equal({ error: "No se encontró el Pokémon con el nombre billy" });
    });
  });

  describe("GET /pokemons/types", () => {
    it("should get 200", async () => await agent.get("/pokemons/types").expect(200));
    it("response with an array of objects", async () => {
      const response = await agent.get("/pokemons/types")
      expect(response.body).to.be.an.instanceof(Array);
    });
  });
});

