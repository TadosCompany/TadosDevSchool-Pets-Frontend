import { AnimalTypes } from './AnimalTypes';
import { Cat, ICatData } from './Cat';
import { Dog, IDogData } from './Dog';
import { Hamster, IHamsterData } from './Hamster';

export type IAnimalData = ICatData | IDogData | IHamsterData;

export type Animal = Cat | Dog | Hamster;

export function fromObject(data: IAnimalData): Animal {
    switch (data.type) {
        case AnimalTypes.Cat:
            return Cat.fromObject(data);

        case AnimalTypes.Dog:
            return Dog.fromObject(data);

        case AnimalTypes.Hamster:
            return Hamster.fromObject(data);
    }
}
