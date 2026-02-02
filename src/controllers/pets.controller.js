import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";
import mongoose from 'mongoose';

// Función para validar si es un ObjectId válido
const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

const getAllPets = async(req,res)=>{
    try {
        const pets = await petsService.getAll();
        res.send({status:"success",payload:pets})
    } catch (error) {
        res.status(500).send({status:"error",error:error.message})
    }
}

const createPet = async(req,res)=> {
    try {
        const {name,specie,birthDate} = req.body;
        if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
        const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
        const result = await petsService.create(pet);
        res.send({status:"success",payload:result})
    } catch (error) {
        res.status(500).send({status:"error",error:error.message})
    }
}

const getPetById = async(req,res)=> {
    try {
        const petId = req.params.pid;
        
        // Validar que el ID sea un ObjectId válido
        if (!isValidObjectId(petId)) {
            return res.status(400).send({status:"error",error:"Invalid pet ID format"})
        }
        
        const pet = await petsService.getById(petId);
        
        if (!pet) {
            return res.status(404).send({status:"error",error:"Pet not found"})
        }
        
        res.send({status:"success",payload:pet})
    } catch (error) {
        res.status(500).send({status:"error",error:error.message})
    }
}

const updatePet = async(req,res) =>{
    try {
        const petUpdateBody = req.body;
        const petId = req.params.pid;
        
        // Validar que el ID sea un ObjectId válido
        if (!isValidObjectId(petId)) {
            return res.status(400).send({status:"error",error:"Invalid pet ID format"})
        }
        
        const result = await petsService.update(petId,petUpdateBody);
        res.send({status:"success",message:"pet updated"})
    } catch (error) {
        res.status(500).send({status:"error",error:error.message})
    }
}

const deletePet = async(req,res)=> {
    try {
        const petId = req.params.pid;
        
        // Validar que el ID sea un ObjectId válido
        if (!isValidObjectId(petId)) {
            return res.status(400).send({status:"error",error:"Invalid pet ID format"})
        }
        
        const result = await petsService.delete(petId);
        
        // Verificar si se eliminó algo
        if (!result || result.deletedCount === 0) {
            return res.status(404).send({status:"error",error:"Pet not found"})
        }
        
        res.send({status:"success",message:"pet deleted"});
    } catch (error) {
        res.status(500).send({status:"error",error:error.message})
    }
}

const createPetWithImage = async(req,res) =>{
    try {
        const file = req.file;
        const {name,specie,birthDate} = req.body;
        if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
        console.log(file);
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image:`${__dirname}/../public/img/${file.filename}`
        });
        console.log(pet);
        const result = await petsService.create(pet);
        res.send({status:"success",payload:result})
    } catch (error) {
        res.status(500).send({status:"error",error:error.message})
    }
}

export default {
    getAllPets,
    createPet,
    getPetById,
    updatePet,
    deletePet,
    createPetWithImage
}