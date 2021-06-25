import { Feeding } from '../feedings';
import { AnimalBase, IAnimalBaseData } from './AnimalBase';
import { AnimalTypes } from './AnimalTypes';

export interface IDogData extends IAnimalBaseData {
    readonly type: AnimalTypes.Dog;
    readonly tailLength: number;
}

export class Dog extends AnimalBase {
    public constructor(
        id: number,
        name: string,
        breedName: string,
        feedings: ReadonlyArray<Feeding>,
        public readonly tailLength: number
    ) {
        super(id, name, breedName, feedings);
    }

    public readonly type: AnimalTypes.Dog = AnimalTypes.Dog;

    public static fromObject(data: IDogData): Dog {
        return new Dog(
            data.id,
            data.name,
            data.breedName,
            data.feedings.map((f) => Feeding.fromObject(f)),
            data.tailLength
        );
    }
}
