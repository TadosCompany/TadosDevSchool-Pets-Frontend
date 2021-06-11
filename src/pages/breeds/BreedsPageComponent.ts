import { Vue, Component } from 'vue-property-decorator';
import WithRender from './BreedsPageComponent.template.html';
import services from '@/services';
import { AnimalTypes, animalTypesDisplayName, Breed } from '@/models';
import { BreedsAddComponent } from './add/BreedsAddComponent';
import { BreedsListComponent } from './list/BreedsListComponent';

@WithRender
@Component({
    components: {
        BreedsAddComponent,
        BreedsListComponent,
    },
})
export class BreedsPageComponent extends Vue {
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

    public breeds: ReadonlyArray<Breed> = [];

    public async mounted() {
        await this.update();
    }

    private async update() {
        this.loading = true;

        try {
            const breeds = await services.breed.getList(
                this.animalType,
                this.search
            );

            this.breeds = breeds;
        } finally {
            this.loading = false;
        }
    }
}
