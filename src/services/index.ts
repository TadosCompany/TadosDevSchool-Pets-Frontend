import { AnimalService } from './AnimalService';
import { BreedService } from './BreedService';
import { FoodService } from './FoodService';

const services = {
    animal: new AnimalService(),
    breed: new BreedService(),
    food: new FoodService(),
};

export default services;
