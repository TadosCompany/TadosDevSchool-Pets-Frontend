import { animalTypesDisplayName, Food } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import WithRender from './FoodsListEntryComponent.template.html';

@WithRender
@Component({})
export class FoodsListEntryComponent extends Vue {
    @Prop()
    public food!: Food;

    public get type(): string {
        return animalTypesDisplayName(this.food.animalType);
    }
}
