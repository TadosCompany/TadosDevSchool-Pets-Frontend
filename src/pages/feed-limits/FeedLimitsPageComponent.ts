import { Animals, FeedLimits } from '@/models';
import services from '@/services';
import { Vue, Component } from 'vue-property-decorator';
import { FeedLimitsAddComponent } from './add/FeedLimitsAddComponent';
import WithRender from './FeedLimitsPageComponent.template.html';
import { FeedLimitsListComponent } from './list/FeedLimitsListComponent';

@WithRender
@Component({
    components: {
        FeedLimitsAddComponent,
        FeedLimitsListComponent,
    },
})
export class FeedLimitsPageComponent extends Vue {
    public loading: boolean = false;

    public animalTypes = [
        {
            name: 'Не выбран',
            value: null,
        },
        ...Animals.ANIMAL_TYPES.map((type) => ({
            name: Animals.animalTypesDisplayName(type),
            value: type,
        })),
    ];

    public search: string = '';

    public animalType: Animals.AnimalTypes | null = null;

    public feedLimits: ReadonlyArray<FeedLimits.FeedLimit> = [];

    public async mounted() {
        await this.update();
    }

    private async update() {
        this.loading = true;

        try {
            const feedLimits = await services.feedLimit.getList(
                this.animalType,
                this.search
            );

            this.feedLimits = feedLimits;
        } finally {
            this.loading = false;
        }
    }
}
