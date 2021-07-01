import { Feeding, IFeedingData } from '../feedings';
import { Food, IFoodData } from '../foods';

export interface IAnimalBaseData {
    readonly id: number;
    readonly name: string;
    readonly breedName: string;
    readonly feedings: ReadonlyArray<IFeedingData>;
    readonly favoriteFood: IFoodData | null;
}

export abstract class AnimalBase {
    protected constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly breedName: string,
        public readonly feedings: ReadonlyArray<Feeding>,
        public readonly favoriteFood: Food | null
    ) {}
}
