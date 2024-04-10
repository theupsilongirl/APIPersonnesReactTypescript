import "reflect-metadata";

import { Container } from 'inversify';

import { IPersonneService, personneServiceKey, PersonneService } from '../services/personne-service'
import { IPersonneRepository, personneRepositoryKey, PersonneRepository } from '../repositories/personne-repository';

import { PersonneController } from '../controllers/personne-controller';

const myContainer = new Container();
myContainer.bind<IPersonneService>(personneServiceKey).to(PersonneService).inSingletonScope();
myContainer.bind<IPersonneRepository>(personneRepositoryKey).to(PersonneRepository).inSingletonScope();
myContainer.bind<PersonneController>("controller").to(PersonneController).inSingletonScope();
export { myContainer };