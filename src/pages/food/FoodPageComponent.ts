import { Animals, Foods } from '@/models';
import services from '@/services';
import { Vue, Component } from 'vue-property-decorator';
import WithRender from './FoodPageComponent.template.html';

@WithRender
@Component({})
export class FoodPageComponent extends Vue {
    public food: Foods.Food | null = null;

    public appendCount: string = '1';

    public name: string = '';

    public type: string = '';

    public count: string = '';

    public working: boolean = false;

    public error: boolean = false;

    public get canAppend(): boolean {
        const count = +this.appendCount;

        return !isNaN(count) && count > 0;
    }

    public async mounted() {
        await this.update();
    }

    public async append() {
        if (!this.food) return;

        this.working = true;
        this.error = false;

        try {
            const id = this.food.id;
            const count = +this.appendCount;

            await services.food.append(id, count);
            await this.update();
        } catch {
            this.error = true;
        } finally {
            this.working = false;
        }
    }

    public async update() {
        this.working = true;

        try {
            const id = +this.$route.params.id;
            this.food = await services.food.get(id);

            if (!!this.food) {
                this.name = this.food.name;
                this.type = Animals.animalTypesDisplayName(
                    this.food.animalType
                );
                this.count = String(this.food.count);
            }
        } finally {
            this.working = false;
        }
    }
}
