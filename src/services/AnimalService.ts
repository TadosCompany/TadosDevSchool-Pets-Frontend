import { Animals } from '@/models';
import axios from 'axios';

interface AnimalGetListRequest {
    readonly animalType: Animals.AnimalTypes | null;
    readonly search: string | null;
}

interface AnimalGetListResponse {
    readonly animals: ReadonlyArray<Animals.IAnimalListItemData>;
}

interface AnimalGetRequest {
    readonly id: number;
}

interface AnimalGetResponse {
    readonly animal: Animals.IAnimalData | null;
}

interface AnimalAddRequest {
    readonly type: Animals.AnimalTypes;
    readonly breedId: number;
    readonly name: string;
    readonly weight?: number;
    readonly tailLength?: number;
}

interface AnimalAddResponse {
    readonly id: number;
}

interface AnimalFeedRequest {
    readonly animalId: number;
    readonly foodId: number;
    readonly count: number;
}

interface AnimalFeedResponse {}

export class AnimalService {
    public constructor() {}

    public async getList(
        animalType: Animals.AnimalTypes | null,
        search: string | null
    ): Promise<ReadonlyArray<Animals.AnimalListItem>> {
        const request: AnimalGetListRequest = {
            search,
            animalType: animalType || null,
        };

        const response = await axios.post<AnimalGetListResponse>(
            '/api/animal/getList',
            request
        );

        return (response.data.animals || []).map((b) =>
            Animals.animalListItemFromObject(b)
        );
    }

    public async get(id: number): Promise<Animals.Animal | null> {
        const request: AnimalGetRequest = {
            id,
        };

        const response = await axios.post<AnimalGetResponse>(
            '/api/animal/get',
            request
        );

        return !!response?.data?.animal
            ? Animals.animalFromObject(response.data.animal)
            : null;
    }

    public async add(
        type: Animals.AnimalTypes,
        breedId: number,
        name: string,
        weight?: number,
        tailLength?: number
    ): Promise<number> {
        const request: AnimalAddRequest = {
            type,
            breedId,
            name,
            weight,
            tailLength,
        };

        const response = await axios.post<AnimalAddResponse>(
            '/api/animal/add',
            request
        );

        return response.data.id;
    }

    public async feed(
        animalId: number,
        foodId: number,
        count: number
    ): Promise<void> {
        const request: AnimalFeedRequest = {
            animalId,
            foodId,
            count,
        };

        await axios.post<AnimalFeedResponse>('/api/animal/feed', request);
    }
}
