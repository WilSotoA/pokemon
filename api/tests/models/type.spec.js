const { Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Type model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));

    describe('Validators', () => {
        beforeEach(() => Type.sync({ force: true }));

        describe('name', () => {
            it('should throw an error if name is null', async () => {
                try {
                    await Type.create();
                    throw new Error('It requires a valid name');
                } catch (error) {
                    expect(error.name).to.equal('SequelizeValidationError');
                    expect(error.message).to.contain('notNull Violation');
                }
            });

            it('should work when its a valid name', async () => {
                const createdPokemon = await Type.create({ nombre: 'normal' });
                expect(createdPokemon.nombre).to.equal('normal');
            });
        });
    });

});

