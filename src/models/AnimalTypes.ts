export enum AnimalTypes {
    Cat = 1,
    Dog = 2,
}

const AnimalTypesDisplayNames = new Map<AnimalTypes, string>([
    [AnimalTypes.Cat, 'Кошка'],
    [AnimalTypes.Dog, 'Собака'],
]);

export function animalTypesDisplayName(type: AnimalTypes): string {
    return AnimalTypesDisplayNames.get(type) || 'Неизвестный тип';
}
