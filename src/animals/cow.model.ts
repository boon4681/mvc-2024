import { Mammal } from "./mammal.model";


export class Cow extends Mammal {
    constructor(
        id: string,
        age: { years: number, months: number },
        teats: number
    ) {
        super('cow', id, age, teats)
    }
    // teats reduce return true
    updateTeats(): boolean {
        if (this.teats === 4 && Math.random() < 0.05) {
            this.teats = 3;
            return true
        } else if (this.teats === 3 && Math.random() < 0.2) {
            this.teats = 4;
        }
        return false
    }
    getMilk() {
        return this.age.years + this.age.months;
    }
    regenerateTeats() {
        if (this.teats === 3 && Math.random() < 0.2) {
            this.teats = 4;
        }
    }
}