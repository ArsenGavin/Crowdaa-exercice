import { ImageObj } from "../../src/entity/imageObj.entity";

describe('Presence of images and React components', () => {
    let mockData: ImageObj[]; // Define mockData as an array of ImageObj

    beforeEach(() => {
        // Load mockImg.json fixture data and assign it to mockData
        cy.fixture('mockImg.json').then((data: ImageObj[]) => {
            mockData = data;
        });

        // Visit the specified URL before each test
        cy.visit('http://localhost:3000/');
    });

    it('contains thirty-two images', () => {
        // Ensure there are 32 images on the page
        cy.get('img').should('have.length', 32);
    });

    it('contains Homepage, Gallery, ImageItem, ImageItemDetail', () => {
        // Ensure specific components with specified classes exist
        cy.get('.homepageContainer').should('have.length', 1);
        cy.get('.galleryContainer').should('have.length', 1);
        cy.get('.imgItem').should('have.length', 30);
        cy.get('.itemDetailContainer').should('have.length', 1);
    });

    it('shows error GIF if fetch fails', () => {
        // Intercept GET request and respond with error status code and message
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/photos', {
            statusCode: 500,
            body: 'Failed to fetch data',
            delayMs: 100,
        });

        // Ensure error box is visible
        cy.get('.errorBox').should('be.visible');
    });

    it('shows loading GIF while fetching data', () => {
        // Intercept GET request and respond with mocked data after delay
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/photos', (req: any) => {
            req.reply(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            statusCode: 200,
                            body: 'Mocked data',
                        });
                    }, 1000);
                });
            });
        }).as('fetchData');

        // Ensure loading box is visible before data is fetched
        cy.get('.loadBox').should('be.visible');
        cy.wait('@fetchData');
        // Ensure loading box is not present after data is fetched
        cy.get('.loadBox').should('not.exist');
    });

    it('creates imgData in localStorage if it is empty after fetch', () => {
        // Clear local storage
        cy.clearLocalStorage();

        // Intercept GET request and respond with mockData after delay
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/photos', (req: any) => {
            req.reply(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            statusCode: 200,
                            body: mockData,
                        });
                    }, 1000);
                });
            });
        }).as('fetchData');

        // Ensure localStorage is initially empty
        cy.window().its('localStorage').invoke('getItem', 'imgData').should('be.null');

        cy.wait('@fetchData').then(() => {
            // Check if imgData is created in localStorage and has the correct length
            cy.window().its('localStorage').invoke('getItem', 'imgData').then((imgData: string | null) => {
                expect(imgData).to.not.be.null;
                if (imgData) {
                    expect(JSON.parse(imgData) as ImageObj[]).to.have.lengthOf(30);
                } else {
                    throw new Error('imgData is null');
                }
            });
        });
    });

    it('retrieves and types imgData from localStorage if it is not empty after fetch', () => {
        // Set imgData in localStorage with mockData
        cy.window().its('localStorage').invoke('setItem', 'imgData', JSON.stringify(mockData));

        // Intercept GET request and respond with mockData after delay
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/photos', (req: any) => {
            req.reply(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            statusCode: 200,
                            body: mockData,
                        });
                    }, 1000);
                });
            });
        }).as('fetchData');

        // Retrieve imgData from localStorage and compare with mockData
        cy.window().its('localStorage').invoke('getItem', 'imgData').then((imgData: string | null) => {
            if (imgData !== null) {
                expect(JSON.parse(imgData) as ImageObj[]).to.deep.equal(mockData);
            } else {
                throw new Error('imgData is null');
            }
        });
    });

    it('clicks on each imgItem and verifies titleImage and imgItemDetail', () => {
        // Iterate over each imgItem and perform click operation
        cy.get('.imgItem').each(($item: any) => {
            // Click on the imgItem forcefully
            cy.wrap($item).click({ force: true });
            // Ensure titleImage is visible
            cy.get('.titleImage').should('be.visible');

            let imgUrl = $item.attr('src');

            if (imgUrl) {
                // Replace "150" with "600" in the imgUrl
                imgUrl = imgUrl.replace('150', '600');
                // Ensure imgItemDetail has the correct src attribute
                cy.get('.imgItemDetail').should('have.attr', 'src', imgUrl);
            } else {
                throw new Error('Image URL not found');
            }
        });
    });

});
