import { animalTypesDisplayName, Breed } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import WithRender from './BreedsListEntryComponent.template.html';

@WithRender
@Component({})
export class BreedsListEntryComponent extends Vue {
    @Prop()
    public breed!: Breed;

    public get type(): string {
        return animalTypesDisplayName(this.breed.animalType);
    }
}
