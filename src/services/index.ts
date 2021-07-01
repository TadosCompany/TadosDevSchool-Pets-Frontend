import { AnimalService } from './AnimalService';
import { BreedService } from './BreedService';
import { FoodService } from './FoodService';
import { FeedLimitService } from './FeedLimitService';

const services = {
    animal: new AnimalService(),
    breed: new BreedService(),
    food: new FoodService(),
    feedLimit: new FeedLimitService(),
};

export default services;
