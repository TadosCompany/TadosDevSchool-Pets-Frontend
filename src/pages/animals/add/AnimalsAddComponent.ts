import { AnimalTypes, animalTypesDisplayName, Breed } from '@/models';
import services from '@/services';
import { Vue, Component, Watch } from 'vue-property-decorator';
import WithRender from './AnimalsAddComponent.template.html';

@WithRender
@Component({})
export class AnimalsAddComponent extends Vue {
    public animalTypes = [AnimalTypes.Cat, AnimalTypes.Dog].map((type) => ({
        name: animalTypesDisplayName(type),
        value: type,
    }));

    public AnimalTypes = AnimalTypes;

    public animalType: AnimalTypes | null = null;

    public breeds: ReadonlyArray<Breed> = [];

    public breed: Breed | null = null;

    public name: string = '';

    public weight: string = '';

    public tailLength: string = '';

    public working: boolean = false;

    public error: boolean = false;

    public get canCreate(): boolean {
        return (
            !!this.name &&
            !!this.animalType &&
            !!this.breed &&
            ((this.animalType === AnimalTypes.Cat && this.canCreateCat) ||
                (this.animalType === AnimalTypes.Dog && this.canCreateDog))
        );
    }

    public get canCreateCat(): boolean {
        const weight = +this.weight;

        return !isNaN(weight) && weight > 0;
    }

    public get canCreateDog(): boolean {
        const tailLength = +this.tailLength;

        return !isNaN(tailLength) && tailLength > 0;
    }

    public async mounted() {}

    @Watch('animalType')
    public async animalTypeChanged() {
        await this.updateBreeds();
    }

    private async updateBreeds() {
        if (!this.animalType) {
            this.breed = null;
            this.breeds = [];
            return;
        }

        const breeds = await services.breed.getList(this.animalType, null);

        this.breeds = breeds;

        if (!!this.breed) {
            this.breed = breeds.filter((b) => b.id)[0] || null;
        }
    }

    public async create() {
        try {
            this.working = true;
            this.error = false;

            if (!this.animalType || !this.name || !this.breed) return;

            let weight: number | null = null;
            let tailLength: number | null = null;

            switch (this.animalType) {
                case AnimalTypes.Cat:
                    weight = +this.weight;

                    if (isNaN(weight) || weight <= 0) return;
                    break;

                case AnimalTypes.Dog:
                    tailLength = +this.tailLength;

                    if (isNaN(tailLength) || tailLength <= 0) return;
                    break;
            }

            await services.animal.add(
                this.animalType,
                this.breed.id,
                this.name,
                weight || undefined,
                tailLength || undefined
            );

            this.$emit('created');

            this.animalType = null;
            this.name = '';
            this.tailLength = '';
            this.weight = '';
        } catch {
            this.error = true;
        } finally {
            this.working = false;
        }
    }
}
