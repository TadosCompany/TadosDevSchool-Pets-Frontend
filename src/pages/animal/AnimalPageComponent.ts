import { Animal, AnimalTypes, animalTypesDisplayName } from '@/models';
import services from '@/services';
import { Vue, Component } from 'vue-property-decorator';
import WithRender from './AnimalPageComponent.template.html';
import { AnimalFeedComponent } from './feed/AnimalFeedComponent';
import { AnimalFeedingsComponent } from './feedings/AnimalFeedingsComponent';

@WithRender
@Component({
    components: {
        AnimalFeedComponent,
        AnimalFeedingsComponent,
    },
})
export class AnimalPageComponent extends Vue {
    public animal: Animal | null = null;

    public working: boolean = false;

    public name: string = '';

    public type: string = '';

    public breedName: string = '';

    public tailLength: string = '';

    public weight: string = '';

    public async mounted() {
        await this.update();
    }

    public async update() {
        this.working = true;

        try {
            const id = +this.$route.params.id;
            this.animal = await services.animal.get(id);

            if (!!this.animal) {
                this.name = this.animal.name;
                this.type = animalTypesDisplayName(this.animal.type);
                this.breedName = this.animal.breed.name;

                this.tailLength = '';
                this.weight = '';

                switch (this.animal.type) {
                    case AnimalTypes.Cat:
                        this.weight = String(this.animal.weight);
                        break;

                    case AnimalTypes.Dog:
                        this.tailLength = String(this.animal.tailLength);
                        break;
                }
            }
        } finally {
            this.working = false;
        }
    }
}
