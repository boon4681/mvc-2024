import { Cow } from "../animals/cow.model";
import { Goat } from "../animals/goat.model";
import ValidationService from "../services/validator.service";
import { FarmModel } from "./farm.model";


export class FarmContoller {
    constructor(
        protected model: FarmModel
    ) {
    }


    processAnimal(input: any) {
        const validationResult = ValidationService.validateInput(input);

        if (!validationResult.success) {
            return { success: false, message: validationResult.error.errors[0].message };
        }

        const { id } = validationResult.data;
        const animal = this.model.getAnimalById(id);

        if (!animal) {
            return false;
        }

        if (animal instanceof Goat) {
            return { success: false, goat: true, message: 'This is a goat! Send it back to the mountains.' };
        }

        if (animal instanceof Cow) {
            if (animal.getTeats() === 3) {
                animal.regenerateTeats();
                return { success: false, goat: false, message: 'This cow cannot be milked (not 4 teats).' };
            }

            const reduced = animal.updateTeats();
            const milk = animal.getMilk();
            this.model.updateAnimal(animal);
            let message = `Cow milked successfully. Produced ${milk.toFixed(2)} liters of milk.`
            if (reduced) {
                message += " teats reduced to 3"
            }
            return { success: true, goat: false, message };
        }

        return { success: false, goat: false, message: 'Unknown animal type.' };
    }

}