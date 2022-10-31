import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import fs from 'fs-extra';

@controller('/static')
export class StaticController extends AbstractController {

    @httpGet('/styles.css')
    public getStyle(): Buffer {
        return fs.readFileSync('./assets/styles.css');
    }

    @httpGet('/bootstrap.css')
    public getBootstrap() {
        return fs.readFileSync('./node_modules/bootstrap/dist/css/bootstrap.min.css');
    }

    @httpGet('/bootstrap.min.css.map')
    public getBootstrapMinMap() {
        return fs.readFileSync('./node_modules/bootstrap/dist/css/bootstrap.min.css.map');
    }

    @httpGet('/bootstrap.js')
    public getBootstrapJS() {
        return fs.readFileSync('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
    }

    @httpGet('/bootstrap.bundle.min.js.map')
    public getBootstrapJSMap() {
        return fs.readFileSync('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map');
    }
}
