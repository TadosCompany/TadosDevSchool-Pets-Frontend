import { AnimalTypes } from './AnimalTypes';
import { CatListItem, ICatListItemData } from './CatListItem';
import { DogListItem, IDogListItemData } from './DogListItem';
import { HamsterListItem, IHamsterListItemData } from './HamsterListItem';

export type IAnimalListItemData =
    | ICatListItemData
    | IDogListItemData
    | IHamsterListItemData;

export type AnimalListItem = CatListItem | DogListItem | HamsterListItem;

export function fromObject(data: IAnimalListItemData): AnimalListItem {
    switch (data.type) {
        case AnimalTypes.Cat:
            return CatListItem.fromObject(data);

        case AnimalTypes.Dog:
            return DogListItem.fromObject(data);

        case AnimalTypes.Hamster:
            return HamsterListItem.fromObject(data);
    }
}
