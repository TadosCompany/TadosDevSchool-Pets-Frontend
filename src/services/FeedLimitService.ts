import { Animals, FeedLimits } from '@/models';
import axios from 'axios';

interface FeedLimitGetListRequest {
    readonly animalType: Animals.AnimalTypes | null;
    readonly search: string | null;
}

interface FeedLimitGetListResponse {
    readonly feedLimits: ReadonlyArray<FeedLimits.IFeedLimitData>;
}

interface FeedLimitAddRequest {
    readonly breedId: number;
    readonly maxPerDay: number;
}

interface FeedLimitAddResponse {
    readonly id: number;
}

interface FeedLimitEditRequest {
    readonly id: number;
    readonly maxPerDay: number;
}

interface FeedLimitGetRequest {
    readonly id: number;
}

interface FeedLimitGetResponse {
    readonly feedLimit: FeedLimits.FeedLimit | null;
}

export class FeedLimitService {
    public constructor() {}

    public async getList(
        animalType: Animals.AnimalTypes | null,
        search: string | null
    ): Promise<ReadonlyArray<FeedLimits.FeedLimit>> {
        const request: FeedLimitGetListRequest = {
            animalType,
            search,
        };

        const response = await axios.post<FeedLimitGetListResponse>(
            '/api/feedLimit/getList',
            request
        );

        return (response.data.feedLimits ?? []).map((f) =>
            FeedLimits.FeedLimit.fromObject(f)
        );
    }

    public async get(id: number): Promise<FeedLimits.FeedLimit | null> {
        const request: FeedLimitGetRequest = { id };

        const response = await axios.post<FeedLimitGetResponse>(
            '/api/feedLimit/get',
            request
        );

        return !!response?.data?.feedLimit
            ? FeedLimits.FeedLimit.fromObject(response.data.feedLimit)
            : null;
    }

    public async add(breedId: number, maxPerDay: number): Promise<number> {
        const request: FeedLimitAddRequest = {
            breedId,
            maxPerDay,
        };

        const response = await axios.post<FeedLimitAddResponse>(
            '/api/feedLimit/add',
            request
        );

        return response.data.id;
    }

    public async edit(id: number, maxPerDay: number): Promise<void> {
        const request: FeedLimitEditRequest = {
            id,
            maxPerDay,
        };

        await axios.post('/api/feedLimit/edit', request);
    }
}
