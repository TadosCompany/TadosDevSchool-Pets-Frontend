import { Feeding } from '@/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import WithRender from './AnimalFeedingsEntryComponent.template.html';

@WithRender
@Component({})
export class AnimalFeedingsEntryComponent extends Vue {
    @Prop()
    public feeding!: Feeding;

    public get fedAt(): string {
        return this.feeding.dateTimeUtc.local().format('DD.MM.YYYY HH:mm:ss');
    }
}
