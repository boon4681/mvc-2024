import { Mammal } from "./mammal.model";


export class Goat extends Mammal {
    constructor(
        id: string,
        age: { years: number, months: number },
        teats: number
    ) {
        super('goat', id, age, teats)
    }
    getMilk(): number {
        throw new Error("Method not implemented.");
    }
}