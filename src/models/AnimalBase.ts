import { Breed, IBreedData } from './Breed';
import { Feeding, IFeedingData } from './Feeding';

export interface IAnimalBaseData {
    readonly id: number;
    readonly name: string;
    readonly breed: IBreedData;
    readonly feedings: ReadonlyArray<IFeedingData>;
}

export abstract class AnimalBase {
    protected constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly breed: Breed,
        public readonly feedings: ReadonlyArray<Feeding>
    ) {}
}
