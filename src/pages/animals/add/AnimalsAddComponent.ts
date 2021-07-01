import { Animals, Breeds, Foods } from '@/models';
import services from '@/services';
import { Vue, Component, Watch } from 'vue-property-decorator';
import WithRender from './AnimalsAddComponent.template.html';

@WithRender
@Component({})
export class AnimalsAddComponent extends Vue {
    public animalTypes = Animals.ANIMAL_TYPES.map(
        (type) => ({
            name: Animals.animalTypesDisplayName(type),
            value: type,
        })
    );

    public AnimalTypes = Animals.AnimalTypes;

    public animalType: Animals.AnimalTypes | null = null;

    public breeds: ReadonlyArray<Breeds.Breed> = [];

    public breed: Breeds.Breed | null = null;

    public foods: ReadonlyArray<Foods.Food> = [];

    public food: Foods.Food | null = null;

    public name: string = '';

    public weight: string = '';

    public tailLength: string = '';

    public eyesColor: string = '';

    public working: boolean = false;

    public error: boolean = false;

    public get canCreate(): boolean {
        return (
            !!this.name &&
            !!this.animalType &&
            !!this.breed &&
            ((this.animalType === Animals.AnimalTypes.Cat &&
                this.canCreateCat) ||
                (this.animalType === Animals.AnimalTypes.Dog &&
                    this.canCreateDog) ||
                (this.animalType === Animals.AnimalTypes.Hamster &&
                    this.canCreateHamster))
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

    public get canCreateHamster(): boolean {
        return !!this.eyesColor;
    }

    public async mounted() {}

    @Watch('animalType')
    public async animalTypeChanged() {
        await this.updateBreeds();
        await this.updateFoods();
    }

    private async updateBreeds() {
        if (!this.animalType) {
            this.breed = null;
            this.breeds = [];
            return;
        }

        const breeds = await services.breed.getList(this.animalType, null);

        this.breeds = breeds;

        const breed = this.breed;

        if (!!breed) {
            this.breed = breeds.filter((b) => b.id === breed.id)[0] || null;
        }
    }

    private async updateFoods() {
        if (!this.animalType) {
            this.food = null;
            this.foods = [];
            return;
        }

        const foods = await services.food.getList(this.animalType, null);

        this.foods = foods;

        const food = this.food;

        if (!!food) {
            this.food = foods.filter((f) => f.id === food.id)[0] || null;
        }
    }

    public async create() {
        try {
            this.working = true;
            this.error = false;

            if (!this.animalType || !this.name || !this.breed) return;

            let weight: number | null = null;
            let tailLength: number | null = null;
            let eyesColor: string | null = null;

            switch (this.animalType) {
                case Animals.AnimalTypes.Cat:
                    weight = +this.weight;

                    if (isNaN(weight) || weight <= 0) return;
                    break;

                case Animals.AnimalTypes.Dog:
                    tailLength = +this.tailLength;

                    if (isNaN(tailLength) || tailLength <= 0) return;
                    break;

                case Animals.AnimalTypes.Hamster:
                    eyesColor = this.eyesColor;

                    if (!eyesColor) return;
                    break;
            }

            await services.animal.add(
                this.animalType,
                this.breed.id,
                this.name,
                !!this.food ? this.food.id : null,
                weight || undefined,
                tailLength || undefined,
                eyesColor || undefined,
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
