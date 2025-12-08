import { faker } from '@faker-js/faker';
describe('Teste 3', () => {
    it('Deve exibir mensagem de erro ao tentar logar com credenciais inválidas', () => {
        cy.visit('https://automationexercise.com');
        cy.contains('Signup / Login').click();
        cy.get('[data-qa="login-email"]').type('emailerrado@email.com');
        cy.get('[data-qa="login-password"]').type('senhaerrada');
        cy.get('[data-qa="login-button"]').click();
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

});