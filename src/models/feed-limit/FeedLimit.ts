import { IBreedData, Breed } from '../breeds';

export interface IFeedLimitData {
    readonly id: number;
    readonly breed: IBreedData;
    readonly maxPerDay: number;
}

export class FeedLimit {
    public constructor(
        public readonly id: number,
        public readonly breed: Breed,
        public readonly maxPerDay: number
    ) {}

    public static fromObject(data: IFeedLimitData): FeedLimit {
        return new FeedLimit(
            data.id,
            Breed.fromObject(data.breed),
            data.maxPerDay
        );
    }
}
