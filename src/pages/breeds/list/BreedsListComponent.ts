import { Breeds } from '@/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './BreedsListComponent.template.html';
import { BreedsListEntryComponent } from './list-entry/BreedsListEntryComponent';

@WithRender
@Component({
    components: {
        BreedsListEntryComponent,
    },
})
export class BreedsListComponent extends Vue {
    @Prop()
    public breeds!: ReadonlyArray<Breeds.Breed>;
}
