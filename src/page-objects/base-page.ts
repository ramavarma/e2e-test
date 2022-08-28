import { Browser, ConnectOptions, launch, Page, PuppeteerLaunchOptions } from 'puppeteer';

export class BasePage {
    protected env: string | undefined = process.env.TEST_TARGET_ENV || ''
    private baseUrl: string;
    private defaultBrowserOptions: PuppeteerLaunchOptions = {
        headless: false,
        slowMo: 1000,
        args: [
            '--window-size=1920,1080'
        ]
    }
    private page: Page | undefined;
    protected browser: Browser | undefined;

    constructor(url?: string, env?: string, options?: PuppeteerLaunchOptions) {
        this.baseUrl = url ? url : 'https://www.s360.co.nz';
        if (options) {
            this.defaultBrowserOptions = options; 
        }
        this.launchBrowser()
    }

    getEnv(): string | undefined {
        return this.env
    }

    setEnv(env: string) {
        this.env = env;
    }
    private launchBrowser(): Promise<void> {
        return new Promise((resolve, reject) => {
            launch(this.defaultBrowserOptions).then((browser: Browser) => {
                this.browser = browser;
                resolve();
            }).catch(error => {
                console.warn(error);
                reject(error);
            })
        });
    }

    getBrowser(options?: PuppeteerLaunchOptions): Promise<Browser> {
        return new Promise<Browser>(async (resolve,reject) => {
            if (this.browser) {
                // do nothing resolve the browser
                resolve(this.browser);
            } else if (options) {
                this.defaultBrowserOptions = options;
            }
            try {
                await this.launchBrowser();
                resolve(this.browser!);
            } catch (error: unknown) {
                console.warn(error)
                reject(error);
            };
        });
    }

    getBrowserOptions(): PuppeteerLaunchOptions {
        return this.defaultBrowserOptions;
    }


    getUrl(): string {
        return this.baseUrl;
    }

    setUrl(url: string) {
        this.baseUrl = url;
    }

    goTo(url?: string): Promise<Page> {
        return new Promise<Page>((resolve, reject) => {
            this.browser!.newPage().then((page: Page) => {
                const reqUrl = url ? url : this.baseUrl
                page.goto(reqUrl).then((response) => {
                    console.debug(`Http status received: ${response?.status}`);
                    this.page = page;
                    resolve(page);
                }).catch(error => {
                    console.warn(error.message);
                    reject(error);
                });
            }).catch(error => { 
                console.warn(error.message)
                reject(error);
            })
        });
    }

}