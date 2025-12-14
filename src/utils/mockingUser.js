import { createHash } from '../utils/index.js';
import { faker } from '@faker-js/faker';

class MockingUser {
    async generateUsers(quantity) {
        const users = [];
        const hashedPassword = await createHash('coder123');

        for (let i = 0; i < quantity; i++) {
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: hashedPassword,
                role: Math.random() > 0.5 ? 'admin' : 'user',
                pets: []
            };
            users.push(user);
        }

        return users;
    }
}

export default new MockingUser();
