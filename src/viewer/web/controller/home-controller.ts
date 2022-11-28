import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { inject } from 'inversify';
import TYPES from '../../../types';
import { DataManager } from '../../../data/data-manager.interface';

@controller('/')
export class HomeController extends AbstractController {

    constructor(
        @inject(TYPES.DataManager) private readonly dataManager: DataManager
    ) {
        super();
    }

    @httpGet('/')
    public get(): string {
        return this.writeHTMLResponse(
            `
            Welcome to this Legendary: Marvel randomizer.
            <br/><br/>
            Please make your selection from the navigation bar on top.
            <br/><br/>
            All your data will be stored in ${this.dataManager.getDataLocation()}
        `);
    }
}
