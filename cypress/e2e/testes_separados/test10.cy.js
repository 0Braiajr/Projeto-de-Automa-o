import { faker } from '@faker-js/faker';

describe('Teste 10 - Newsletter', () => {
  it('Deve assinar newsletter com email fake', () => {
    cy.visit('https://automationexercise.com');

    cy.get('#susbscribe_email').type(faker.internet.email());
    cy.get('#subscribe').click();
    
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });
});