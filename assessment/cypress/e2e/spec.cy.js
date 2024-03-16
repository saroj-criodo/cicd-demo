describe('xCruise Website Tests', () => {
  beforeEach(() => {
    // Visit the xCruise home page before each test
    cy.visit('http://localhost:3000'); // Replace with the actual URL
  });

  describe('Navigation Bar', () => {
    it('should display the xCruise logo', () => {
      cy.get('.navbar .logo img').should('be.visible');
    });

    it('should have links to Home, Destinations, and Deals', () => {
      cy.get('.navbar .menu a').contains('Home').should('be.visible');
      cy.get('.navbar .menu a').contains('Destinations').should('be.visible');
      cy.get('.navbar .menu a').contains('Deals').should('be.visible');
    });

    it('should have a background color of #000033', () => {
      cy.get('.navbar').should('have.css', 'background-color', 'rgb(0, 0, 51)');
    });
  });

  describe('Hero Section', () => {
    it('should display the main heading', () => {
      cy.get('.hero h1').contains('DISCOVER THE BEAUTY OF CRUISING WITH US').should('be.visible');
    });

    it('should have a Book Now button', () => {
      cy.get('.hero button').contains('Book Now').should('be.visible');
    });

    it('should display the hero image as a background', () => {
      cy.get('.hero').should('have.css', 'background-image').and('include', 'hero-cruise.png');
    });
  });

  describe('Discover Section', () => {
    it('should display the heading "DISCOVER OUR DESTINATIONS"', () => {
      cy.get('.discover .heading h2').contains('DISCOVER OUR DESTINATIONS').should('be.visible');
    });

    it('should display popular destinations with images', () => {
      cy.get('.discover .popular .pills div img').should('have.length', 3);
    });

    it('should have cards with a cursor pointer on hover', () => {
      cy.get('.discover .card').should('have.css', 'cursor', 'pointer');
    });

    it('popular pills should have a shadow', () => {
      cy.get('.discover .popular .pills > div').first().invoke('css', 'box-shadow').should('not.be.empty');
    });
  });

  describe('Contact Form', () => {
    it('should allow submitting a contact request', () => {
      cy.get('#contact_form').within(() => {
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="number"]').type('1234567890');
        cy.get('input[type="date"]').type('2024-01-01');
        cy.get('textarea').type('Looking forward to my cruise!');
        cy.get('button').click();
      });
    });

    it('should have a white background color', () => {
      cy.get('#contact_form').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    });

    it('submit button should have an orange background color', () => {
      cy.get('#contact_form button').should('have.css', 'background-color', 'rgb(255, 86, 0)');
    });
  });

  describe('Footer Section', () => {
    it('should display contact information', () => {
      cy.get('.footer').find('h3').contains('Contact Us').should('be.visible');
      cy.get('.footer').find('li').contains('New York City').should('be.visible');
    });

    it('should have a background color of #000033', () => {
      cy.get('footer').should('have.css', 'background-color', 'rgb(0, 0, 51)');
    });

    it('footer links should have a color of #fff (white)', () => {
      cy.get('footer a').each(($el) => {
        expect($el).to.have.css('color', 'rgb(255, 255, 255)');
      });
    });
  });
});