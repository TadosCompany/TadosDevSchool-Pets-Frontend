import { Animals, Breeds } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import WithRender from './BreedsListEntryComponent.template.html';

@WithRender
@Component({})
export class BreedsListEntryComponent extends Vue {
    @Prop()
    public breed!: Breeds.Breed;

    public get type(): string {
        return Animals.animalTypesDisplayName(this.breed.animalType);
    }
}
