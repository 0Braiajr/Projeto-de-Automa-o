import { faker } from '@faker-js/faker';

describe('Teste 6 - Formulário de contato', () => {
  it('Deve enviar mensagem de contato com sucesso', () => {
    cy.visit('https://automationexercise.com');
    cy.contains('Contact us').click();

    cy.get('[data-qa="name"]').type(faker.person.fullName());
    cy.get('[data-qa="email"]').type(faker.internet.email());
    cy.get('[data-qa="subject"]').type('Teste de contato');
    cy.get('[data-qa="message"]').type(faker.lorem.paragraph());
    cy.get('[data-qa="submit-button"]').click();

    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
  });
});