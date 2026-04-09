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
            <section class="page-stack">
                <section class="page-section">
                    <div class="page-section__header">
                        <div>
                            <span class="eyebrow">Legendary Marvel Randomizer</span>
                            <h2 class="page-section__title">Welcome to this Legendary: Marvel randomizer.</h2>
                            <p class="page-section__subtitle">Please make your selection from the navigation bar on top.</p>
                        </div>
                    </div>
                </section>

                <section class="page-section info-panel p-4">
                    <div class="page-section__header">
                        <div>
                            <h3 class="page-section__title mb-0">Your local command center</h3>
                            <p class="page-section__subtitle mb-0">All your data is currently stored in ${this.dataManager.getDataLocation()}</p>
                        </div>
                    </div>

                    <div class="page-stack">
                        <div class="summary-grid">
                            <div class="summary-item">
                                <span class="summary-item__label">What is saved</span>
                                <span class="summary-item__value">Generated games, entered scores, and your selected extensions.</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-item__label">Where to manage it</span>
                                <span class="summary-item__value">Open <a href="/data">Data management</a> from the top navbar to export, import, or reset everything.</span>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <h4 class="page-section__title h5">How export/import works</h4>
                                <ul class="mb-0">
                                    <li><strong>Export my data</strong> downloads one JSON backup file containing all your games, scores, and extension choices.</li>
                                    <li><strong>Import my data</strong> restores a previously exported backup and recreates all of that data in the current app instance.</li>
                                    <li><strong>Empty history</strong> clears the current local data, so export first if you may want to restore it later.</li>
                                </ul>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <h4 class="page-section__title h5">Recommended usage on a deployed website</h4>
                                <ol class="mb-0">
                                    <li>Use the site normally and let players build up their local history.</li>
                                    <li>Before changing browser, device, hosting environment, or clearing site/app data, go to <a href="/data">Data management</a> and export a backup.</li>
                                    <li>On the new deployment or device, open the same page and import that backup file to restore everything.</li>
                                </ol>
                            </div>
                        </div>

                        <div class="alert alert-warning" role="alert">
                            <h4 class="alert-heading">Important</h4>
                            <p class="mb-0">This app stores data in the current local environment. If someone uses another browser, another computer, another hosted instance, or clears the site/app data, their history will not follow automatically unless they export it first and import it again later.</p>
                        </div>
                    </div>
                </section>
            </section>
        `);
    }
}
