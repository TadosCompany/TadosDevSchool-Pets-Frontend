import { Feeding } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import WithRender from './AnimalFeedingsComponent.template.html';
import { AnimalFeedingsEntryComponent } from './entry/AnimalFeedingsEntryComponent';

@WithRender
@Component({
    components: {
        AnimalFeedingsEntryComponent
    }
})
export class AnimalFeedingsComponent extends Vue {
    @Prop()
    public feedings!: ReadonlyArray<Feeding>;
}