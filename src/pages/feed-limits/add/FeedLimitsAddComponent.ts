import { Animals, Breeds } from '@/models';
import services from '@/services';
import { Vue, Component, Watch } from 'vue-property-decorator';
import WithRender from './FeedLimitsAddComponent.template.html';

@WithRender
@Component({})
export class FeedLimitsAddComponent extends Vue {
    public animalTypes = Animals.ANIMAL_TYPES.map((type) => ({
        name: Animals.animalTypesDisplayName(type),
        value: type,
    }));

    public animalType: Animals.AnimalTypes | null = null;

    public breeds: ReadonlyArray<Breeds.Breed> = [];

    public breed: Breeds.Breed | null = null;

    public maxPerDay: string = '1';

    public working: boolean = false;

    public error: boolean = false;

    public get canCreate(): boolean {
        const maxPerDay = +this.maxPerDay;

        return !!this.breed && !isNaN(maxPerDay) && maxPerDay > 0;
    }

    public async mounted() {}

    @Watch('animalType')
    public async animalTypeChanged() {
        await this.updateBreeds();
    }

    private async updateBreeds() {
        if (!this.animalType) {
            this.breed = null;
            this.breeds = [];
            return;
        }

        const breeds = await services.breed.getList(this.animalType, null);

        this.breeds = breeds;

        const breed = this.breed;

        if (!!breed) {
            this.breed = breeds.filter((b) => b.id === breed.id)[0] || null;
        }
    }

    public async create() {
        try {
            this.working = true;
            this.error = false;

            if (!this.canCreate) return;

            const breed = this.breed!;
            const maxPerDay = +this.maxPerDay;

            await services.feedLimit.add(breed.id, maxPerDay);

            this.$emit('created');

            this.animalType = null;
            this.maxPerDay = '1';
        } catch {
            this.error = true;
        } finally {
            this.working = false;
        }
    }
}
