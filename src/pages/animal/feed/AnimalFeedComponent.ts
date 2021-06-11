import { Animal, Food } from '@/models';
import services from '@/services';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './AnimalFeedComponent.template.html';

@WithRender
@Component({})
export class AnimalFeedComponent extends Vue {
    @Prop()
    public animal!: Animal | null;

    public working: boolean = false;

    public error: boolean = false;

    public foods: ReadonlyArray<Food> = [];

    public food: Food | null = null;

    public count: string = '1';

    public get canFeed(): boolean {
        const count = +this.count;

        if (isNaN(count) || count < 1) return false;

        return !!this.food && count <= this.food.count;
    }

    public async mounted() {
        console.log(this.animal);

        await this.animalWatcher();
    }

    @Watch('animal')
    public async animalWatcher() {
        if (!this.animal) return;

        const foods = await services.food.getList(this.animal.type, null);

        this.foods = foods;

        if (!!this.food) {
            this.food = foods.filter((f) => f.id === this.food!.id)[0] || null;
        }
    }

    public async feed() {
        if (!this.canFeed) return;

        try {
            this.working = true;
            this.error = false;

            const count = +this.count;

            await services.animal.feed(this.animal!.id, this.food!.id, count);

            this.$emit('fed');
        } catch {
            this.error = true;
        } finally {
            this.working = false;
        }
    }
}
