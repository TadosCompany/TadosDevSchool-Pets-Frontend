export interface IAnimalListItemBaseData {
    readonly id: number;
    readonly name: string;
    readonly breedName: string;
}

export abstract class AnimalListItemBase {
    protected constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly breedName: string
    ) {}
}
