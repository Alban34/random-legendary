import { controller, httpGet } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { STYLES } from '../generated/styles';
import { BOOTSTRAP_MIN_CSS } from '../generated/bootstrap.min.css';
import { BOOTSTRAP_BUNDLE_MIN } from '../generated/bootstrap.bundle.min';
import { BOOTSTRAP_MIN_CSS_MAP } from '../generated/bootstrap.min.css.map';
import { BOOTSTRAP_BUNDLE_MIN_MAP } from '../generated/bootstrap.bundle.min.map';

@controller('/static')
export class StaticController extends AbstractController {

    @httpGet('/styles.css')
    public getStyle(): string {
        return this.decodeBase64(STYLES);
    }

    @httpGet('/bootstrap.css')
    public getBootstrap() {
        return this.decodeBase64(BOOTSTRAP_MIN_CSS);
    }

    @httpGet('/bootstrap.min.css.map')
    public getBootstrapMinMap() {
        return this.decodeBase64(BOOTSTRAP_MIN_CSS_MAP);
    }

    @httpGet('/bootstrap.js')
    public getBootstrapJS() {
        return this.decodeBase64(BOOTSTRAP_BUNDLE_MIN);
    }

    @httpGet('/bootstrap.bundle.min.js.map')
    public getBootstrapJSMap() {
        return this.decodeBase64(BOOTSTRAP_BUNDLE_MIN_MAP);
    }

    private decodeBase64(base64encoded: string): string {
        return Buffer.from(base64encoded, 'base64').toString('utf-8');
    }
}
