
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, interfaces, request, response, next } from 'inversify-express-utils'
import { IPersonneService, personneServiceKey } from '../services/personne-service';
import { addPersonneValidator, deletePersonneValidator, getPersonneValidator, updatePersonneValidator } from '../requests/personne-requests';
import * as express from 'express';

@controller('/personne')
export class PersonneController implements interfaces.Controller {
    @inject(personneServiceKey) private readonly service: IPersonneService;

    @httpGet('/')
    private async listPersonnes(@request() req: express.Request, @response() res: express.Response, @next() next: express.NextFunction): Promise<void> {
        const personnes = await this.service.listPersonnes();
        res.status(200).json(personnes);
    }

    @httpGet('/:id')
    private async getPersonne(@request() req: express.Request, @response() res: express.Response, @next() next: express.NextFunction): Promise<void> {
        const personne = await this.service.getPersonne(await getPersonneValidator.validate(req.params));
        res.status(200).json(personne);
    }

    @httpPost('/')
    private async createPersonne(@request() req: express.Request, @response() res: express.Response, @next() next: express.NextFunction): Promise<void> {
        const id = await this.service.addPersonne(await addPersonneValidator.validate(req.body));
        res.status(201).json({ id });
    }

    @httpPut('/')
    private async updatePersonne(@request() req: express.Request, @response() res: express.Response) {
        await this.service.updatePersonne(await updatePersonneValidator.validate(req.body));
        res.status(201).json({ message: 'OK' });
    }

    @httpDelete('/:id')
    private async deletePersonne(@request() req: express.Request, @response() res: express.Response) {
        await this.service.deletePersonne(await deletePersonneValidator.validate(req.params));
        res.status(200).json({ message: 'ok' });
    }

}
