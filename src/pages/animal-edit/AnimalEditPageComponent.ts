import { Animals, Foods } from '@/models';
import { Vue, Component } from 'vue-property-decorator';
import WithRender from './AnimalEditPageComponent.template.html';
import services from '@/services';

@WithRender
@Component({})
export class AnimalEditPageComponent extends Vue {
    public animal: Animals.Animal | null = null;

    public foods: ReadonlyArray<Foods.Food> = [];

    public food: Foods.Food | null = null;

    public working: boolean = false;

    public error: boolean = false;

    public name: string = '';

    public async mounted() {
        await this.update();
    }

    public async update() {
        this.working = true;

        try {
            const id = +this.$route.params.id;
            const animal = await services.animal.get(id);

            if (!!animal) {
                this.foods = await services.food.getList(animal.type, null);

                let food: Foods.Food | null = null;

                if (!!animal.favoriteFood) {
                    food = this.foods.filter(
                        (f) => f.id === animal.favoriteFood!.id
                    )[0];
                }

                this.food = food;
                this.name = animal.name;

                this.animal = animal;
            }
        } finally {
            this.working = false;
        }
    }

    public async save() {
        this.working = true;
        this.error = false;

        try {
            const animal = this.animal;

            if (!animal) return;

            let foodId: number | null = null;

            const food = this.food;

            if (!!food) foodId = food.id;

            await services.animal.setFavoriteFood(animal.id, foodId);

            this.$router.push({
                name: 'animal',
                params: { id: String(animal.id) },
            });
        } catch {
            this.error = true;
        } finally {
            this.working = false;
        }
    }
}
