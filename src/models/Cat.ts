import { AnimalBase, IAnimalBaseData } from './AnimalBase';
import { AnimalTypes } from './AnimalTypes';
import { Breed } from './Breed';
import { Feeding } from './Feeding';

export interface ICatData extends IAnimalBaseData {
    readonly type: AnimalTypes.Cat;
    readonly weight: number;
}

export class Cat extends AnimalBase {
    public constructor(
        id: number,
        name: string,
        breed: Breed,
        feedings: ReadonlyArray<Feeding>,
        public readonly weight: number
    ) {
        super(id, name, breed, feedings);
    }

    public readonly type: AnimalTypes.Cat = AnimalTypes.Cat;

    public static fromObject(data: ICatData): Cat {
        return new Cat(
            data.id,
            data.name,
            data.breed,
            data.feedings.map((f) => Feeding.fromObject(f)),
            data.weight
        );
    }
}
