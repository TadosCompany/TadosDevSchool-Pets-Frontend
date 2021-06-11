import { IFoodData, Food } from './Food';
import moment from 'moment';

export interface IFeedingData {
    readonly id: number;
    readonly dateTimeUtc: string;
    readonly food: IFoodData;
    readonly count: number;
}

export class Feeding {
    public constructor(
        public readonly id: number,
        public readonly dateTimeUtc: moment.Moment,
        public readonly food: Food,
        public readonly count: number
    ) {}

    public static fromObject(data: IFeedingData): Feeding {
        return new Feeding(
            data.id,
            moment.utc(data.dateTimeUtc),
            Food.fromObject(data.food),
            data.count
        );
    }
}
