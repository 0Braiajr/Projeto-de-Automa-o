import { faker } from '@faker-js/faker';

describe('Teste 15 - Fluxo completo de compra', () => {
  it('Teste 15 - Deve registrar usuário, adicionar produto ao carrinho, finalizar compra e excluir conta', () => {
    cy.visit('http://automationexercise.com');
    cy.contains('Home').should('be.visible');

    cy.contains('Signup / Login').click();

    const nome = faker.person.firstName();
    const email = faker.internet.email();
    const senha = faker.internet.password();

    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type(senha);

    cy.get('[data-qa="days"]').select('10');
    cy.get('[data-qa="months"]').select('May');
    cy.get('[data-qa="years"]').select('1995');

    cy.get('[data-qa="first_name"]').type(nome);
    cy.get('[data-qa="last_name"]').type(faker.person.lastName());

    cy.get('[data-qa="address"]').type(faker.location.streetAddress());
    cy.get('[data-qa="country"]').select('Canada');
    cy.get('[data-qa="state"]').type(faker.location.state());
    cy.get('[data-qa="city"]').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type(faker.phone.number());

    cy.get('[data-qa="create-account"]').click();

    cy.contains('Account Created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();

    cy.contains(`Logged in as ${nome}`).should('be.visible');

    cy.contains('Products').click();
    cy.contains('Add to cart').first().click();

    cy.contains('View Cart').click();

    cy.url().should('include', '/view_cart');
    cy.get('.cart_info').should('be.visible');

    cy.contains('Proceed To Checkout').click();

    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    cy.get('.form-control').type('Pedido de teste automatizado');
    cy.contains('Place Order').click();

    cy.get('[data-qa="name-on-card"]').type(nome);
    cy.get('[data-qa="card-number"]').type('4111111111111111'); // cartão fake válido para testes
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2025');

    cy.get('[data-qa="pay-button"]').click();

    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

    cy.contains('Delete Account').click();

    cy.contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });
});
