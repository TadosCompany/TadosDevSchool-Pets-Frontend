import { AnimalTypes } from './AnimalTypes';

export interface IBreedData {
    readonly id: number;
    readonly name: string;
    readonly animalType: AnimalTypes;
}

export class Breed {
    public constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly animalType: AnimalTypes
    ) {}

    public static fromObject(data: IBreedData): Breed {
        return new Breed(data.id, data.name, data.animalType);
    }
}
