import { Animals, Foods } from '@/models';
import services from '@/services';
import { Component, Vue } from 'vue-property-decorator';
import { FoodsAddComponent } from './add/FoodsAddComponent';
import WithRender from './FoodsPageComponent.template.html';
import { FoodsListComponent } from './list/FoodsListComponent';

@WithRender
@Component({
    components: {
        FoodsAddComponent,
        FoodsListComponent,
    },
})
export class FoodsPageComponent extends Vue {
    public loading: boolean = false;

    public animalTypes = [
        {
            name: 'Не выбран',
            value: null,
        },
        ...[Animals.AnimalTypes.Cat, Animals.AnimalTypes.Dog].map((type) => ({
            name: Animals.animalTypesDisplayName(type),
            value: type,
        })),
    ];

    public search: string = '';

    public animalType: Animals.AnimalTypes | null = null;

    public foods: ReadonlyArray<Foods.Food> = [];

    public async mounted() {
        await this.update();
    }

    private async update() {
        this.loading = true;

        try {
            const foods = await services.food.getList(
                this.animalType,
                this.search
            );

            this.foods = foods;
        } finally {
            this.loading = false;
        }
    }
}
