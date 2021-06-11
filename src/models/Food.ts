import { AnimalTypes } from './AnimalTypes';

export interface IFoodData {
    readonly id: number;
    readonly name: string;
    readonly animalType: AnimalTypes;
    readonly count: number;
}

export class Food {
    public constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly animalType: AnimalTypes,
        public readonly count: number
    ) {}

    public static fromObject(data: IFoodData): Food {
        return new Food(data.id, data.name, data.animalType, data.count);
    }
}
