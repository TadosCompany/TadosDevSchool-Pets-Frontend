import moment from 'moment';

export interface IFeedingData {
    readonly dateTimeUtc: string;
    readonly foodName: string;
    readonly count: number;
}

export class Feeding {
    public constructor(
        public readonly dateTimeUtc: moment.Moment,
        public readonly foodName: string,
        public readonly count: number
    ) {}

    public static fromObject(data: IFeedingData): Feeding {
        return new Feeding(
            moment.utc(data.dateTimeUtc),
            data.foodName,
            data.count
        );
    }
}
