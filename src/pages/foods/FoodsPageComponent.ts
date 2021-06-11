import { Vue, Component } from 'vue-property-decorator';
import WithRender from './FoodsPageComponent.template.html';
import services from '@/services';
import { AnimalTypes, animalTypesDisplayName, Food } from '@/models';
import { FoodsAddComponent } from './add/FoodsAddComponent';
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
        ...[AnimalTypes.Cat, AnimalTypes.Dog].map((type) => ({
            name: animalTypesDisplayName(type),
            value: type,
        })),
    ];

    public search: string = '';

    public animalType: AnimalTypes | null = null;

    public foods: ReadonlyArray<Food> = [];

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
