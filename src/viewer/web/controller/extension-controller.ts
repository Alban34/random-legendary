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
                <div class="input-group mb-2">
                    <div class="input-group-text">
                        <input class="form-check-input mt-0" 
                                type="checkbox" 
                                id="${ext}" 
                                name="ext"
                                value="${ext}"
                                ${selectedExtensions.indexOf(ext) !== -1 ? 'checked' : ''}>
                        <label style="margin-left: 10px" for="${ext}">${ext}</label>
                    </div>
                </div>
            `;
        });
        return `
            <div class="btn-group" role="group">
                <button class="btn btn-secondary" onclick="Array.from(document.getElementsByTagName('input')).forEach(item => item.checked = true)">
                    Check all</button>
                <button class="btn btn-secondary" onclick="Array.from(document.getElementsByTagName('input')).forEach(item => item.checked = false)">
                    Uncheck all</button>
                <button class="btn btn-secondary" onclick="Array.from(document.getElementsByTagName('input')).forEach(item => item.checked = !item.checked)">
                    Inverse selection</button>
            </div>
            <button class="btn btn-primary" onclick="document.getElementById('extForm').submit()">Save</button>
            <form action="/extensions" method="post" id="extForm">
                <div class="extensions-list">
                    ${availableExtensionsAsWeb.join('')}
                </div>
            </form>
        `;
    }

}
