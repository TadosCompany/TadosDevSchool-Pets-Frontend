import { Feeding } from '../feedings';
import { AnimalBase, IAnimalBaseData } from './AnimalBase';
import { AnimalTypes } from './AnimalTypes';
import { Food } from '../foods';

export interface IHamsterData extends IAnimalBaseData {
    readonly type: AnimalTypes.Hamster;
    readonly eyesColor: string;
}

export class Hamster extends AnimalBase {
    public constructor(
        id: number,
        name: string,
        breedName: string,
        feedings: ReadonlyArray<Feeding>,
        favoriteFood: Food | null,
        public readonly eyesColor: string
    ) {
        super(id, name, breedName, feedings, favoriteFood);
    }

    public readonly type: AnimalTypes.Hamster = AnimalTypes.Hamster;

    public static fromObject(data: IHamsterData): Hamster {
        return new Hamster(
            data.id,
            data.name,
            data.breedName,
            data.feedings.map((f) => Feeding.fromObject(f)),
            !!data.favoriteFood ? Food.fromObject(data.favoriteFood) : null,
            data.eyesColor
        );
    }
}
