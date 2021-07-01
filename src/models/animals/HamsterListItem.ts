import {
    AnimalListItemBase,
    IAnimalListItemBaseData,
} from './AnimalListItemBase';
import { AnimalTypes } from './AnimalTypes';

export interface IHamsterListItemData extends IAnimalListItemBaseData {
    readonly type: AnimalTypes.Hamster;
    readonly eyesColor: string;
}

export class HamsterListItem extends AnimalListItemBase {
    public constructor(
        id: number,
        name: string,
        breedName: string,
        public readonly eyesColor: string
    ) {
        super(id, name, breedName);
    }

    public readonly type: AnimalTypes.Hamster = AnimalTypes.Hamster;

    public static fromObject(data: IHamsterListItemData): HamsterListItem {
        return new HamsterListItem(
            data.id,
            data.name,
            data.breedName,
            data.eyesColor
        );
    }
}
