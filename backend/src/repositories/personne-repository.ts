import { IPersonne } from '../models/personne';
import { v4 } from 'uuid';
import { injectable } from 'inversify';
import { writeFileSync, readFileSync } from 'fs';
import { PersonneNotFoundError } from '../errors/errors';

export interface IPersonneRepository {
    listPersonnes() : Promise<IPersonne[]>;
    createPersonne(nom: string, prenom: string, age: number): Promise<string>;
    getPersonne(id: string): Promise<IPersonne>;
    updatePersonne(id: string, nom: string, prenom: string, age: number): Promise<void>;
    deletePersonne(id: string): Promise<void>;
}

export const personneRepositoryKey = Symbol.for('PersonneRepository');

@injectable()
export class PersonneRepository implements IPersonneRepository {
    private listePersonnes: IPersonne[];
    private dbPath: string = "db/personnes.json";
    constructor() {
        const personnesArray: string = readFileSync(this.dbPath).toString();
        // console.log(personnesArray);
        this.listePersonnes = JSON.parse(personnesArray);
    }

    public async listPersonnes() : Promise<IPersonne[]> {
        return this.listePersonnes;
    }

    public async createPersonne(nom: string, prenom: string, age: number): Promise<string> {
        const id = v4();
        this.listePersonnes.push({
            id, nom, prenom, age
        });
        this.save(this.listePersonnes);
        return id;
    }

    public async getPersonne(id: string): Promise<IPersonne> {
        const personne: IPersonne | undefined = this.listePersonnes.find((value) => {
            if (value.id === id) {
                return true;
            }
        })
        if (personne) {
            return personne;
        }
        throw new PersonneNotFoundError();
    }

    public async updatePersonne(id: string, nom: string, prenom: string, age: number): Promise<void> {
        let found : boolean = false;
        this.listePersonnes.forEach( (value, index, tableau) => {
            if (value.id===id) {
                tableau[index] ={id, nom, prenom, age};
                this.save(this.listePersonnes);
                found=true;
            }
        });
        if (!found) {
            console.log('UpdatePersonne : je jette un Not found...');
            throw new PersonneNotFoundError();
        }
    }

    public async deletePersonne(id: string): Promise<void> {
        let found : boolean = false;
        this.listePersonnes.forEach( (value, index, tableau) => {
            if (value.id === id) {
                tableau.splice(index, 1);
                this.save(this.listePersonnes);
                found=true;
            }
        });
        if (!found) {
            console.log('DeletePersonne : je jette un not found.');
            throw new PersonneNotFoundError();
        };
    }

    private async save(dbArray: IPersonne[]): Promise<void> {
        writeFileSync(this.dbPath, JSON.stringify(dbArray, null, "\t"))
    }
}