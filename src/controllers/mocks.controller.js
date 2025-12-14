import { petsService, usersService } from "../services/index.js";
import PetDTO from "../dto/Pet.dto.js";
import mockingUser from "../utils/mockingUser.js";
import mockingPet from "../utils/mockingPet.js";

const getMockingPets = async (req, res) => {
    try {
        const mockPets = [];
        for (let i = 0; i < 100; i++) {
            const pet = {
                name: `Pet ${i + 1}`,
                specie: ['dog', 'cat', 'rabbit'][Math.floor(Math.random() * 3)],
                birthDate: new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
            };
            mockPets.push(pet);
        }
        res.send({ status: "success", payload: mockPets });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

const getMockingUsers = async (req, res) => {
    try {
        const { quantity = 50 } = req.query;
        const users = await mockingUser.generateUsers(parseInt(quantity));
        res.send({ status: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

const generateData = async (req, res) => {
    try {
        const { users, pets } = req.body;

        if (!users || !pets) {
            return res.status(400).send({ status: "error", error: "Missing users or pets parameters" });
        }

        // Generate users
        const generatedUsers = await mockingUser.generateUsers(parseInt(users));

        // Generate pets
        const generatedPets = mockingPet.generatePets(parseInt(pets));

        res.send({
            status: "success",
            message: `Generated ${users} users and ${pets} pets`,
            payload: {
                users: generatedUsers,
                pets: generatedPets
            }
        });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData
};
