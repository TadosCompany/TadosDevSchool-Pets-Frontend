import { Animals } from '@/models';
import services from '@/services';
import { Component, Vue } from 'vue-property-decorator';
import { AnimalsAddComponent } from './add/AnimalsAddComponent';
import WithRender from './AnimalsPageComponent.template.html';
import { AnimalsListComponent } from './list/AnimalsListComponent';

@WithRender
@Component({
    components: {
        AnimalsAddComponent,
        AnimalsListComponent,
    },
})
export class AnimalsPageComponent extends Vue {
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

    public animals: ReadonlyArray<Animals.AnimalListItem> = [];

    public async mounted() {
        await this.update();
    }

    private async update() {
        this.loading = true;

        try {
            const animals = await services.animal.getList(
                this.animalType,
                this.search
            );

            this.animals = animals;
        } finally {
            this.loading = false;
        }
    }
}
