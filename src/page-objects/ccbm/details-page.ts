import { PuppeteerLaunchOptions } from "puppeteer";
import { BasePage } from "../base-page";

export class DetailsPage extends BasePage {
    private url = `https://ccbm${this.env ? this.env : ''}.sustainability360.co.nz`;
    constructor(url?: string, env?: string, options?: PuppeteerLaunchOptions) {
        super(url, env, options);
    }

    async open() {
        await this.goTo(this.url);
    }
}