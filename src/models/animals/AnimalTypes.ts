export enum AnimalTypes {
    Cat = 1,
    Dog = 2,

    Hamster = 3,
}

const AnimalTypesDisplayNames = new Map<AnimalTypes, string>([
    [AnimalTypes.Cat, 'Кошка'],
    [AnimalTypes.Dog, 'Собака'],
    [AnimalTypes.Hamster, 'Хомяк'],
]);

export function animalTypesDisplayName(type: AnimalTypes): string {
    return AnimalTypesDisplayNames.get(type) || 'Неизвестный тип';
}

export const ANIMAL_TYPES = [
    AnimalTypes.Cat,
    AnimalTypes.Dog,
    AnimalTypes.Hamster,
];
