import { animalTypesDisplayName, Animal } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import WithRender from './AnimalsListEntryComponent.template.html';

@WithRender
@Component({})
export class AnimalsListEntryComponent extends Vue {
    @Prop()
    public animal!: Animal;

    public get type(): string {
        return animalTypesDisplayName(this.animal.type);
    }
}
