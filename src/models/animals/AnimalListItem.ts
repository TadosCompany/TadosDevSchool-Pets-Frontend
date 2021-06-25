import { AnimalTypes } from './AnimalTypes';
import { CatListItem, ICatListItemData } from './CatListItem';
import { DogListItem, IDogListItemData } from './DogListItem';

export type IAnimalListItemData = ICatListItemData | IDogListItemData;

export type AnimalListItem = CatListItem | DogListItem;

export function fromObject(data: IAnimalListItemData): AnimalListItem {
    switch (data.type) {
        case AnimalTypes.Cat:
            return CatListItem.fromObject(data);

        case AnimalTypes.Dog:
            return DogListItem.fromObject(data);
    }
}
