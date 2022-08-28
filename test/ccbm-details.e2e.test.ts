import { expect } from "chai";
import { DetailsPage } from "../src/page-objects/ccbm/details-page";

const url = `https://ccbmdev.sustainability360.co.nz`;



describe('[CCBM] Testing details page', () => {
    let detailsPage: DetailsPage;
    beforeEach(async () => {
        detailsPage = new DetailsPage(url);
        await detailsPage.getBrowser();
        await detailsPage.goTo();
    });

    it('Testing if it shows details page', async () => {
        const text = await detailsPage.getTextByXPATH(`/html/body/div[1]/ion-app/ion-content/ion-router-outlet/div/ion-content/ul/li[1]`);
        expect(text).to.be.equal('Details')
    });

    afterEach(async () => {
        detailsPage.close();
    })

})