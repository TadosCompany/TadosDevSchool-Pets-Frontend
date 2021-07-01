import { FeedLimits } from '@/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './FeedLimitsListComponent.template.html';
import { FeedLimitsListEntryComponent } from './list-entry/FeedLimitsListEntryComponent';

@WithRender
@Component({
    components: {
        FeedLimitsListEntryComponent,
    },
})
export class FeedLimitsListComponent extends Vue {
    @Prop()
    public feedLimits!: ReadonlyArray<FeedLimits.FeedLimit>;
}