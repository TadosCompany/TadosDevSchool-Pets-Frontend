import { Animals, Foods } from '@/models';
import axios from 'axios';

interface FoodGetListRequest {
    readonly animalType: Animals.AnimalTypes | null;
    readonly search: string | null;
}

interface FoodGetListResponse {
    readonly foods: ReadonlyArray<Foods.IFoodData>;
}

interface FoodGetRequest {
    readonly id: number;
}

interface FoodGetResponse {
    readonly food: Foods.IFoodData | null;
}

interface FoodAddRequest {
    readonly animalType: Animals.AnimalTypes;
    readonly name: string;
}

interface FoodAddResponse {
    readonly id: number;
}

interface FoodAppendRequest {
    readonly id: number;
    readonly count: number;
}

interface FoodAppendResponse {}

export class FoodService {
    public constructor() {}

    public async getList(
        animalType: Animals.AnimalTypes | null,
        search: string | null
    ): Promise<ReadonlyArray<Foods.Food>> {
        const request: FoodGetListRequest = {
            search,
            animalType: animalType ?? null,
        };

        const response = await axios.post<FoodGetListResponse>(
            '/api/food/getList',
            request
        );

        return (response.data.foods ?? []).map((b) => Foods.Food.fromObject(b));
    }

    public async get(id: number): Promise<Foods.Food | null> {
        const request: FoodGetRequest = {
            id,
        };

        const response = await axios.post<FoodGetResponse>(
            '/api/food/get',
            request
        );

        return !!response?.data?.food
            ? Foods.Food.fromObject(response.data.food)
            : null;
    }

    public async add(
        animalType: Animals.AnimalTypes,
        name: string
    ): Promise<number> {
        const request: FoodAddRequest = {
            animalType,
            name,
        };

        const response = await axios.post<FoodAddResponse>(
            '/api/food/add',
            request
        );

        return response.data.id;
    }

    public async append(id: number, count: number): Promise<void> {
        const request: FoodAppendRequest = { id, count };

        await axios.post<FoodAppendResponse>('/api/food/append', request);
    }
}
