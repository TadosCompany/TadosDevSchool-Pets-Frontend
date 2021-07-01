import { Animals, FeedLimits } from '@/models';
import services from '@/services';
import { Vue, Component } from 'vue-property-decorator';
import WithRender from './FeedLimitEditPageComponent.template.html';

@WithRender
@Component({})
export class FeedLimitEditPageComponent extends Vue {
    public feedLimit: FeedLimits.FeedLimit | null = null;

    public working: boolean = false;

    public error: boolean = false;

    public animalType: string = '';

    public breedName: string = '';

    public maxPerDay: string = '0';

    public get canSave(): boolean {
        const maxPerDay = +this.maxPerDay;

        return !isNaN(maxPerDay) && maxPerDay > 0;
    }

    public async mounted() {
        await this.update();
    }

    public async update() {
        this.working = true;

        try {
            const id = +this.$route.params.id;
            const feedLimit = await services.feedLimit.get(id);

            if (!!feedLimit) {
                this.animalType = Animals.animalTypesDisplayName(
                    feedLimit.breed.animalType
                );
                this.breedName = feedLimit.breed.name;

                this.maxPerDay = String(feedLimit.maxPerDay);

                this.feedLimit = feedLimit;
            }
        } finally {
            this.working = false;
        }
    }

    public async save() {
        this.working = true;
        this.error = false;

        try {
            if (!this.canSave) return;

            const id = this.feedLimit!.id;
            const maxPerDay = +this.maxPerDay;

            await services.feedLimit.edit(id, maxPerDay);

            this.$router.push({ name: 'feed-limits' });
        } catch {
            this.error = true;
        } finally {
            this.working = false;
        }
    }
}
