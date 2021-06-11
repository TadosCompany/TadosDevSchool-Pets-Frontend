import { AnimalTypes } from './AnimalTypes';
import { Cat, ICatData } from './Cat';
import { Dog, IDogData } from './Dog';

export type IAnimalData = ICatData | IDogData;

export type Animal = Cat | Dog;

export function animalFromObject(data: IAnimalData): Animal {
    switch (data.type) {
        case AnimalTypes.Cat:
            return Cat.fromObject(data);

        case AnimalTypes.Dog:
            return Dog.fromObject(data);
    }
}
