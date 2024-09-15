import fs from "node:fs"
import { parse, stringify } from "csv/sync";
import { Mammal } from "../animals/mammal.model";
import { Goat } from "../animals/goat.model";
import { Cow } from "../animals/cow.model";

export class FarmModel {
    protected animals: Mammal[]
    constructor(
        protected file: string
    ) {
        this.animals = this.load()
    }
    getAllAnimals() {
        return this.animals
    }
    load() {
        const fileContent = fs.readFileSync(this.file, 'utf-8');
        const raw_records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        })
        const records: { id: string, age: { years: number, months: number }, teats: number }[] = raw_records.map((record: any) => {
            return {
                id: record.id,
                age: {
                    years: Number(record.age_years),
                    months: Number(record.age_months)
                },
                teats: Number(record.teats)
            }
        })
        return records.map(record => {
            if (record.teats < 3) {
                return new Goat(record.id, record.age, record.teats);
            } else {
                return new Cow(record.id, record.age, record.teats);
            }
        });
    }

    save() {
        const data = this.animals.map(animal => animal.toJSON());
        const csv = stringify(data, { header: true });
        fs.writeFileSync(this.file, csv);
    }

    getAnimalById(id: string) {
        return this.animals.find(animal => animal.getId() === id);
    }

    updateAnimal(animal: Mammal) {
        const index = this.animals.findIndex(a => a.getId() === animal.getId());
        if (index !== -1) {
            this.animals[index] = animal;
            this.save();
        }
    }
}