import { faker } from '@faker-js/faker';

let email;
let senha;

describe('Fluxo de usuário com before()', () => {
  // Executa antes de todos os testes
  before(() => {
    email = faker.internet.email();
    senha = faker.internet.password();

    // Salva credenciais para uso nos testes
    Cypress.env('userEmail', email);
    Cypress.env('userPassword', senha);

    // Cria usuário
    cy.visit('https://automationexercise.com');
    cy.contains('Signup / Login').click();
    cy.get('[data-qa="signup-name"]').type(faker.person.firstName());
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type(senha);
    cy.get('[data-qa="days"]').select('10');
    cy.get('[data-qa="months"]').select('May');
    cy.get('[data-qa="years"]').select('1995');

    // Campos obrigatórios adicionais
    cy.get('[data-qa="first_name"]').type(faker.person.firstName());
    cy.get('[data-qa="last_name"]').type(faker.person.lastName());
    cy.get('[data-qa="address"]').type(faker.location.streetAddress());
    
    // Seleciona país aleatório
    const countries = [
      'India',
      'United States',
      'Canada',
      'Australia',
      'Israel',
      'New Zealand',
      'Singapore'
    ];

    const randomCountry = countries[Math.floor(Math.random() * countries.length)];

    cy.get('[data-qa="country"]').select(randomCountry);
    cy.get('[data-qa="state"]').type(faker.location.state());
    cy.get('[data-qa="city"]').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type(faker.phone.number());

    cy.get('[data-qa="create-account"]').click();
    cy.contains('Account Created!').should('be.visible');

    // Logout para liberar login depois
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('Logout').click();
    cy.contains('Signup / Login').should('be.visible');
  });


  
  // Teste 2 - Login
  it('Teste 1 e 2 -  Deve criar usuario, depois realizar o logout e logar com usário já registrado', () => {
        cy.visit('https://automationexercise.com');
        cy.contains('Signup / Login').click();

        const email = Cypress.env('userEmail');
        const senha = Cypress.env('userPassword');

        cy.log(`Usando email: ${email}`)
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(senha);
        cy.get('[data-qa="login-button"]').click();

        cy.contains('Logged in as').should('be.visible')
    });

    // Teste 3 - Login com usuario e senha incorretos
    it('Teste 3 - Deve exibir mensagem de erro ao tentar logar com credenciais inválidas', () => {
        cy.visit('https://automationexercise.com');
        cy.contains('Signup / Login').click();


        cy.get('[data-qa="login-email"]').type('emailerrado@email.com');
        cy.get('[data-qa="login-password"]').type('senhaerrada');
        cy.get('[data-qa="login-button"]').click();


        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

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

    it('Teste 5 - Deve mostrar mensagem de erro ao tentar registrar email já usado', () => {
        cy.visit('https://automationexercise.com');
        cy.contains('Signup / Login').click();

        cy.get('[data-qa="signup-name"]').type('Teste');
        cy.get('[data-qa="signup-email"]').type(Cypress.env('userEmail'));
        cy.get('[data-qa="signup-button"]').click();

        cy.contains('Email Address already exist!').should('be.visible');
    });

    it('Teste 6 - Formulário de contato', () => {
        cy.visit('https://automationexercise.com');
        cy.contains('Contact us').click();

        cy.get('[data-qa="name"]').type(faker.person.fullName());
        cy.get('[data-qa="email"]').type(faker.internet.email());
        cy.get('[data-qa="subject"]').type('Teste de contato');
        cy.get('[data-qa="message"]').type(faker.lorem.paragraph());
        cy.get('[data-qa="submit-button"]').click();

        cy.contains('Success! Your details have been submitted successfully').should('be.visible');
    });

    it('Teste 8 - Deve abrir a página de detalhes do primeiro produto', () => {
    cy.visit('https://automationexercise.com/');
    cy.contains('Products').click();

    // Abre o primeiro produto pela ação "View Product"
    cy.contains('View Product').click();

    // Valida que está na página de detalhes
    cy.url().should('include', '/product_details/1');
  });

    it('Teste 9 - Deve buscar produto pelo nome e validar resultados', () => {
    cy.visit('http://automationexercise.com');
    cy.contains('Products').click();

    cy.url().should('include', '/products');
    cy.contains('All Products').should('be.visible');

    cy.get('#search_product').type('Tshirt');
    cy.get('#submit_search').click();

    cy.contains('Searched Products').should('be.visible');

    // Espera até que os produtos apareçam
    cy.get('.product-image-wrapper', { timeout: 10000 }).should('have.length.greaterThan', 0);
  });

    it('Teste 10 - Deve assinar newsletter com email fake', () => {
    cy.visit('https://automationexercise.com');

    cy.get('#susbscribe_email').type(faker.internet.email());
    cy.get('#subscribe').click();

    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

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
