import { AnimalTypes, Breed, IBreedData } from '@/models';
import axios from 'axios';

interface BreedGetListRequest {
    readonly animalType: AnimalTypes | null;
    readonly search: string | null;
}

interface BreedGetListResponse {
    readonly breeds: ReadonlyArray<IBreedData>;
}

interface BreedGetRequest {
    readonly id: number;
}

interface BreedGetResponse {
    readonly breed: IBreedData | null;
}

interface BreedAddRequest {
    readonly animalType: AnimalTypes;
    readonly name: string;
}

interface BreedAddResponse {
    readonly id: number;
}

export class BreedService {
    public constructor() {}

    public async getList(
        animalType: AnimalTypes | null,
        search: string | null
    ): Promise<ReadonlyArray<Breed>> {
        const request: BreedGetListRequest = {
            search,
            animalType: animalType ?? null,
        };

        const response = await axios.post<BreedGetListResponse>('/api/breed/getList', request);

        return (response.data.breeds ?? []).map((b) => Breed.fromObject(b));
    }

    public async get(id: number): Promise<Breed | null> {
        const request: BreedGetRequest = {
            id,
        };

        const response = await axios.post<BreedGetResponse>('/api/breed/get', request);

        return !!response?.data?.breed
            ? Breed.fromObject(response.data.breed)
            : null;
    }

    public async add(animalType: AnimalTypes, name: string): Promise<number> {
        const request: BreedAddRequest = {
            animalType,
            name
        };

        const response = await axios.post<BreedAddResponse>('/api/breed/add', request);

        return response.data.id;
    }
}
