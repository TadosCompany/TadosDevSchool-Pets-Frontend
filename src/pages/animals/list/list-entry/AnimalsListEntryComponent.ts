import { Animals } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import WithRender from './AnimalsListEntryComponent.template.html';

@WithRender
@Component({})
export class AnimalsListEntryComponent extends Vue {
    @Prop()
    public animal!: Animals.AnimalListItem;

    public get type(): string {
        return Animals.animalTypesDisplayName(this.animal.type);
    }
}
