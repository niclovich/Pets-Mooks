import { faker } from '@faker-js/faker';

class MockingPet {
    generatePets(quantity) {
        const pets = [];
        const species = ['dog', 'cat', 'rabbit', 'bird', 'hamster', 'parrot'];

        for (let i = 0; i < quantity; i++) {
            const pet = {
                name: faker.animal.dog(),
                specie: species[Math.floor(Math.random() * species.length)],
                birthDate: faker.date.past({ years: 10 }),
                adopted: false
            };
            pets.push(pet);
        }

        return pets;
    }
}

export default new MockingPet();
