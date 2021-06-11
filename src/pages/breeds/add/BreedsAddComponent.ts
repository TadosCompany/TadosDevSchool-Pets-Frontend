import { AnimalTypes, animalTypesDisplayName } from '@/models';
import services from '@/services';
import { Vue, Component } from 'vue-property-decorator';
import WithRender from './BreedsAddComponent.template.html';

@WithRender
@Component({})
export class BreedsAddComponent extends Vue {
    public animalTypes = [AnimalTypes.Cat, AnimalTypes.Dog].map((type) => ({
        name: animalTypesDisplayName(type),
        value: type,
    }));

    public animalType: AnimalTypes | null = null;

    public name: string = '';

    public working: boolean = false;

    public error: boolean = false;

    public get canCreate(): boolean {
        return !!this.animalType && !!this.name;
    }

    public async create() {
        try {
            this.working = true;
            this.error = false;

            if (!this.animalType || !this.name) return;

            await services.breed.add(this.animalType, this.name);

            this.$emit('created');

            this.animalType = null;
            this.name = '';
        } catch {
            this.error = true;
        } finally {
            this.working = false;
        }
    }
}
