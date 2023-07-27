const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', async () => {
        try {
          await Pokemon.create({});
          throw new Error('It requires a valid name');
        } catch (error) {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message).to.contain('notNull Violation');
        }
      });

      it('should work when its a valid name', async () => {
        const createdPokemon = await Pokemon.create({ nombre: 'Pikachu', imagen: 'pikachu.jpg', vida: 100, ataque: 50, defensa: 40 });
        expect(createdPokemon.nombre).to.equal('Pikachu');
      });
    });

    describe('imagen', () => {
      it('should throw an error if imagen is null', async () => {
        try {
          await Pokemon.create({ nombre: 'Bulbasaur', vida: 80, ataque: 60, defensa: 70 });
          throw new Error('It requires a valid imagen');
        } catch (error) {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message).to.contain('notNull Violation');
        }
      });

      it('should work when its a valid imagen', async () => {
        const createdPokemon = await Pokemon.create({ nombre: 'Bulbasaur', imagen: 'bulbasaur.jpg', vida: 80, ataque: 60, defensa: 70 });
        expect(createdPokemon.imagen).to.equal('bulbasaur.jpg');
      });
    });

    describe('vida', () => {
      it('should throw an error if vida is null', async () => {
        try {
          await Pokemon.create({ nombre: 'Bulbasaur', imagen: 'bulbasaur.jpg', ataque: 60, defensa: 70 });
          throw new Error('It requires a valid vida');
        } catch (error) {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message).to.contain('notNull Violation');
        }
      });
      it('should throw an error if vida is different to string', async () => {
        try {
          await Pokemon.create({ nombre: 'Bulbasaur', imagen: 'bulbasaur.jpg', vida: "100", ataque: 60, defensa: 70 });
          throw new Error('vida must be a numerical value');
        } catch (error) {
          expect(error.message).to.equal('vida must be a numerical value');
        }
      });

      it('should work when its a valid vida', async () => {
        const createdPokemon = await Pokemon.create({ nombre: 'Bulbasaur', imagen: 'bulbasaur.jpg', vida: 80, ataque: 60, defensa: 70 });
        expect(createdPokemon.vida).to.equal(80);
      });
    });

    describe('ataque', () => {
      it('should throw an error if ataque is null', async () => {
        try {
          await Pokemon.create({ nombre: 'Bulbasaur', imagen: 'bulbasaur.jpg', vida: 70, defensa: 60 });
          throw new Error('It requires a valid ataque');
        } catch (error) {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message).to.contain('notNull Violation');
        }
      });
      it('should throw an error if ataque is different to string', async () => {
        try {
          await Pokemon.create({ nombre: 'Bulbasaur', imagen: 'bulbasaur.jpg', vida: 100, ataque: "60", defensa: 70 });
          throw new Error('ataque must be a numerical value');
        } catch (error) {
          expect(error.message).to.equal('ataque must be a numerical value');
        }
      });

      it('should work when its a valid ataque', async () => {
        const createdPokemon = await Pokemon.create({ nombre: 'Bulbasaur', imagen: 'bulbasaur.jpg', vida: 80, ataque: 60, defensa: 70 });
        expect(createdPokemon.ataque).to.equal(60);
      });
    });

    describe('defensa', () => {
      it('should throw an error if defensa is null', async () => {
        try {
          await Pokemon.create({ nombre: 'Bulbasaur', imagen: 'bulbasaur.jpg', vida: 70, ataque: 60 });
          throw new Error('It requires a valid defensa');
        } catch (error) {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message).to.contain('notNull Violation');
        }
      });
      it('should throw an error if defensa is different to string', async () => {
        try {
          await Pokemon.create({ nombre: 'Bulbasaur', imagen: 'bulbasaur.jpg', vida: 100, ataque: 60, defensa: "70" });
          throw new Error('defensa must be a numerical value');
        } catch (error) {
          expect(error.message).to.equal('defensa must be a numerical value');
        }
      });

      it('should work when its a valid defensa', async () => {
        const createdPokemon = await Pokemon.create({ nombre: 'Bulbasaur', imagen: 'bulbasaur.jpg', vida: 80, ataque: 60, defensa: 70 });
        expect(createdPokemon.defensa).to.equal(70);
      });
    });

  });

});

