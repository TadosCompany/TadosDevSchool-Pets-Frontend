import { AnimalTypes, Food, IFoodData } from '@/models';
import axios from 'axios';

interface FoodGetListRequest {
    readonly animalType: AnimalTypes | null;
    readonly search: string | null;
}

interface FoodGetListResponse {
    readonly foods: ReadonlyArray<IFoodData>;
}

interface FoodGetRequest {
    readonly id: number;
}

interface FoodGetResponse {
    readonly food: IFoodData | null;
}

interface FoodAddRequest {
    readonly animalType: AnimalTypes;
    readonly name: string;
}

interface FoodAddResponse {
    readonly id: number;
}

interface FoodAppendRequest {
    readonly id: number;
    readonly count: number;
}

interface FoodAppendResponse {
}

export class FoodService {
    public constructor() {}

    public async getList(
        animalType: AnimalTypes | null,
        search: string | null
    ): Promise<ReadonlyArray<Food>> {
        const request: FoodGetListRequest = {
            search,
            animalType: animalType ?? null,
        };

        const response = await axios.post<FoodGetListResponse>('/api/food/getList', request);

        return (response.data.foods ?? []).map((b) => Food.fromObject(b));
    }

    public async get(id: number): Promise<Food | null> {
        const request: FoodGetRequest = {
            id,
        };

        const response = await axios.post<FoodGetResponse>('/api/food/get', request);

        return !!response?.data?.food
            ? Food.fromObject(response.data.food)
            : null;
    }

    public async add(animalType: AnimalTypes, name: string): Promise<number> {
        const request: FoodAddRequest = {
            animalType,
            name
        };

        const response = await axios.post<FoodAddResponse>('/api/food/add', request);

        return response.data.id;
    }

    public async append(id: number, count: number): Promise<void> {
        const request: FoodAppendRequest = { id, count };

        await axios.post<FoodAppendResponse>('/api/food/append', request);
    }
}
