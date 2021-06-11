import { Vue, Component } from 'vue-property-decorator';
import WithRender from './AppComponent.template.html';

@WithRender
@Component({})
export class AppComponent extends Vue {}
