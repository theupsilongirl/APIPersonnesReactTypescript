import { inject, injectable } from 'inversify';
import { IPersonne } from '../models/personne';
import { IPersonneRepository, personneRepositoryKey } from '../repositories/personne-repository';
import { IAddPersonneRequest, IDeletePersonneRequest, IGetPersonneRequest, IUpdatePersonneRequest } from '../requests/personne-requests';

export interface IPersonneService {
    listPersonnes() : Promise<IPersonne[]>;
    addPersonne(request: IAddPersonneRequest): Promise<string>;
    updatePersonne(request: IUpdatePersonneRequest): Promise<void>;
    getPersonne(request: IGetPersonneRequest): Promise<IPersonne>;
    deletePersonne(request: IDeletePersonneRequest): Promise<void>;
}

export const personneServiceKey = Symbol.for('PersonneService');

@injectable()
export class PersonneService implements IPersonneService {
    @inject(personneRepositoryKey) private repository : IPersonneRepository;

    public async listPersonnes() : Promise<IPersonne[]> {
        const personnes = await this.repository.listPersonnes() ;
        return personnes ;
    }

    public async addPersonne(request: IAddPersonneRequest): Promise<string> {
        const id = await this.repository.createPersonne(request.nom, request.prenom, request.age);
        return id;
    }

    public async updatePersonne(request: IUpdatePersonneRequest): Promise<void> {
        await this.repository.updatePersonne(request.id, request.nom, request.prenom, request.age);
    }

    public async getPersonne(request: IGetPersonneRequest): Promise<IPersonne> {
        const personne = await this.repository.getPersonne(request.id);
        return personne;
    }

    public async deletePersonne(request: IDeletePersonneRequest): Promise<void> {
        await this.repository.deletePersonne(request.id);
    }
}


