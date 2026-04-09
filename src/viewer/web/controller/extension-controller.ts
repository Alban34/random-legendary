import * as express from "express";
import { controller, httpGet, httpPost, requestBody, response } from 'inversify-express-utils';
import { AbstractController } from './abstract-controller';
import { CardLoader } from '../../../card/card-loader';
import { FileDataManager } from '../../../data/file-data-manager';
import { CardManager } from '../../../card/card-manager';
import { inject } from 'inversify';
import TYPES from '../../../types';

@controller('/extensions')
export class ExtensionController extends AbstractController {

    constructor(@inject(TYPES.CardLoader) private readonly cardLoader: CardLoader) {
        super();
    }

    @httpGet('/')
    public get(): string {
        return this.writeHTMLResponse(this.showExtensions());
    }

    @httpPost('/')
    public save(@response() res: express.Response,
                @requestBody() body: any) {
        const dataManager = new FileDataManager();
        const cardLoader = new CardLoader(dataManager);
        cardLoader.saveExtensions(body['ext']);
        res.redirect('/');
    }

    private showExtensions(): string {
        const cardManager = new CardManager();

        const allExtensions = cardManager.getAvailableExtensions(this.cardLoader.loadData());
        let selectedExtensions = this.cardLoader.loadExtensions();
        if (selectedExtensions.length === 0) {
            selectedExtensions = allExtensions;
        }

        const availableExtensionsAsWeb = allExtensions.map((ext) => {
            return `
                <label class="extension-card" for="${ext}">
                    <input class="form-check-input mt-0" 
                            type="checkbox" 
                            id="${ext}" 
                            name="ext"
                            value="${ext}"
                            ${selectedExtensions.indexOf(ext) !== -1 ? 'checked' : ''}>
                    <span>
                        <strong>${ext}</strong>
                        <small class="d-block text-secondary-emphasis">Add this expansion to your active randomizer pool.</small>
                    </span>
                </label>
            `;
        });
        return `
            <section class="page-stack">
                <section class="page-section">
                    <div class="page-section__header">
                        <div>
                            <span class="eyebrow">Collection manager</span>
                            <h2 class="page-section__title">Select my extensions</h2>
                            <p class="page-section__subtitle">Choose the sets you own so the randomizer only serves matchups you can actually build.</p>
                        </div>
                    </div>
                    <div class="extension-toolbar">
                        <button class="btn btn-secondary" onclick="Array.from(document.getElementsByTagName('input')).forEach(item => item.checked = true)">
                            Check all</button>
                        <button class="btn btn-secondary" onclick="Array.from(document.getElementsByTagName('input')).forEach(item => item.checked = false)">
                            Uncheck all</button>
                        <button class="btn btn-secondary" onclick="Array.from(document.getElementsByTagName('input')).forEach(item => item.checked = !item.checked)">
                            Inverse selection</button>
                        <button class="btn btn-primary" onclick="document.getElementById('extForm').submit()">Save</button>
                    </div>
                    <form action="/extensions" method="post" id="extForm" class="extension-panel p-4">
                        <div class="summary-grid mb-3">
                            <div class="summary-item">
                                <span class="summary-item__label">Available extensions</span>
                                <span class="summary-item__value">${allExtensions.length}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-item__label">Currently selected</span>
                                <span class="summary-item__value">${selectedExtensions.length}</span>
                            </div>
                        </div>
                        <div class="extensions-list">
                            ${availableExtensionsAsWeb.join('')}
                        </div>
                    </form>
                </section>
            </section>
            `;
    }

}
