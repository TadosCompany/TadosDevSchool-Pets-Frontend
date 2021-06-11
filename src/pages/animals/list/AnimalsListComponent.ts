import { Animal } from '@/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './AnimalsListComponent.template.html';
import { AnimalsListEntryComponent } from './list-entry/AnimalsListEntryComponent';

@WithRender
@Component({
    components: {
        AnimalsListEntryComponent,
    },
})
export class AnimalsListComponent extends Vue {
    @Prop()
    public animals!: ReadonlyArray<Animal>;
}