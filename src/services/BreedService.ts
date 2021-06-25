import { Animals, Breeds } from '@/models';
import axios from 'axios';

interface BreedGetListRequest {
    readonly animalType: Animals.AnimalTypes | null;
    readonly search: string | null;
}

interface BreedGetListResponse {
    readonly breeds: ReadonlyArray<Breeds.IBreedData>;
}

interface BreedGetRequest {
    readonly id: number;
}

interface BreedGetResponse {
    readonly breed: Breeds.IBreedData | null;
}

interface BreedAddRequest {
    readonly animalType: Animals.AnimalTypes;
    readonly name: string;
}

interface BreedAddResponse {
    readonly id: number;
}

export class BreedService {
    public constructor() {}

    public async getList(
        animalType: Animals.AnimalTypes | null,
        search: string | null
    ): Promise<ReadonlyArray<Breeds.Breed>> {
        const request: BreedGetListRequest = {
            search,
            animalType: animalType ?? null,
        };

        const response = await axios.post<BreedGetListResponse>(
            '/api/breed/getList',
            request
        );

        return (response.data.breeds ?? []).map((b) =>
            Breeds.Breed.fromObject(b)
        );
    }

    public async get(id: number): Promise<Breeds.Breed | null> {
        const request: BreedGetRequest = {
            id,
        };

        const response = await axios.post<BreedGetResponse>(
            '/api/breed/get',
            request
        );

        return !!response?.data?.breed
            ? Breeds.Breed.fromObject(response.data.breed)
            : null;
    }

    public async add(
        animalType: Animals.AnimalTypes,
        name: string
    ): Promise<number> {
        const request: BreedAddRequest = {
            animalType,
            name,
        };

        const response = await axios.post<BreedAddResponse>(
            '/api/breed/add',
            request
        );

        return response.data.id;
    }
}
