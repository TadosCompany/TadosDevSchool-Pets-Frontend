import { Foods } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import WithRender from './FoodsListComponent.template.html';
import { FoodsListEntryComponent } from './list-entry/FoodsListEntryComponent';

@WithRender
@Component({
    components: {
        FoodsListEntryComponent,
    },
})
export class FoodsListComponent extends Vue {
    @Prop()
    public foods!: ReadonlyArray<Foods.Food>;
}
