import { Animals, Foods } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import WithRender from './FoodsListEntryComponent.template.html';

@WithRender
@Component({})
export class FoodsListEntryComponent extends Vue {
    @Prop()
    public food!: Foods.Food;

    public get type(): string {
        return Animals.animalTypesDisplayName(this.food.animalType);
    }
}
