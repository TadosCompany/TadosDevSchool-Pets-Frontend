import {
    AnimalListItemBase,
    IAnimalListItemBaseData,
} from './AnimalListItemBase';
import { AnimalTypes } from './AnimalTypes';

export interface IDogListItemData extends IAnimalListItemBaseData {
    readonly type: AnimalTypes.Dog;
    readonly tailLength: number;
}

export class DogListItem extends AnimalListItemBase {
    public constructor(
        id: number,
        name: string,
        breedName: string,
        public readonly tailLength: number
    ) {
        super(id, name, breedName);
    }

    public readonly type: AnimalTypes.Dog = AnimalTypes.Dog;

    public static fromObject(data: IDogListItemData): DogListItem {
        return new DogListItem(
            data.id,
            data.name,
            data.breedName,
            data.tailLength
        );
    }
}
