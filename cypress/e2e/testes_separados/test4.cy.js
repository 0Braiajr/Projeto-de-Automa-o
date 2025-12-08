describe('Teste 4 - Logout', () => {
  it ('Teste 4 - Logout', () => {
        cy.visit('https://automationexercise.com');
        cy.contains('Signup / Login').click();

        const email = Cypress.env('userEmail');
        const senha = Cypress.env('userPassword');

        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(senha);
        cy.get('[data-qa="login-button"]').click();

        cy.contains('Logout').click();
        cy.contains('Signup / Login').should('be.visible');
    });
});