import { Feeding, IFeedingData } from '../feedings';

export interface IAnimalBaseData {
    readonly id: number;
    readonly name: string;
    readonly breedName: string;
    readonly feedings: ReadonlyArray<IFeedingData>;
}

export abstract class AnimalBase {
    protected constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly breedName: string,
        public readonly feedings: ReadonlyArray<Feeding>
    ) {}
}
