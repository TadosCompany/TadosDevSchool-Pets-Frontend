import { Feeding } from '../feedings';
import { AnimalBase, IAnimalBaseData } from './AnimalBase';
import { AnimalTypes } from './AnimalTypes';
import { Food } from '../foods';

export interface ICatData extends IAnimalBaseData {
    readonly type: AnimalTypes.Cat;
    readonly weight: number;
}

export class Cat extends AnimalBase {
    public constructor(
        id: number,
        name: string,
        breedName: string,
        feedings: ReadonlyArray<Feeding>,
        favoriteFood: Food | null,
        public readonly weight: number
    ) {
        super(id, name, breedName, feedings, favoriteFood);
    }

    public readonly type: AnimalTypes.Cat = AnimalTypes.Cat;

    public static fromObject(data: ICatData): Cat {
        return new Cat(
            data.id,
            data.name,
            data.breedName,
            data.feedings.map((f) => Feeding.fromObject(f)),
            !!data.favoriteFood ? Food.fromObject(data.favoriteFood) : null,
            data.weight
        );
    }
}
