import { Animals, FeedLimits } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import WithRender from './FeedLimitsListEntryComponent.template.html';

@WithRender
@Component({})
export class FeedLimitsListEntryComponent extends Vue {
    @Prop()
    public feedLimit!: FeedLimits.FeedLimit;

    public get type(): string {
        return Animals.animalTypesDisplayName(this.feedLimit.breed.animalType);
    }
}
