

export abstract class Mammal {
    constructor(
        protected type: string,
        protected id: string,
        protected age: { years: number, months: number },
        protected teats: number
    ) { }
    abstract getMilk(): number;
    getId() {
        return this.id;
    }
    getAge() {
        return this.age;
    }
    getTeats() {
        return this.teats;
    }
    toJSON() {
        return {
            id: this.id,
            age_years: this.age.years,
            age_months: this.age.months,
            teats: this.teats
        }
    }
}