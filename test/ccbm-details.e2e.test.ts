import { DetailsPage } from "../src/page-objects/ccbm/details-page";

const url = `ccbmdev.sustainability360.co.nz`;



describe('[CCBM] Testing details page', () => {
    let detailsPage: DetailsPage;
    beforeEach(() => {
        detailsPage = new DetailsPage(url);
    });

    it('Testing if logo exists', () => {

    })
})