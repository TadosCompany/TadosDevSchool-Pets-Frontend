import {
    AnimalListItemBase,
    IAnimalListItemBaseData,
} from './AnimalListItemBase';
import { AnimalTypes } from './AnimalTypes';

export interface ICatListItemData extends IAnimalListItemBaseData {
    readonly type: AnimalTypes.Cat;
    readonly weight: number;
}

export class CatListItem extends AnimalListItemBase {
    public constructor(
        id: number,
        name: string,
        breedName: string,
        public readonly weight: number
    ) {
        super(id, name, breedName);
    }

    public readonly type: AnimalTypes.Cat = AnimalTypes.Cat;

    public static fromObject(data: ICatListItemData): CatListItem {
        return new CatListItem(data.id, data.name, data.breedName, data.weight);
    }
}
