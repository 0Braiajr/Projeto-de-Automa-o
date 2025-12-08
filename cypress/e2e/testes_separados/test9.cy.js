describe('Teste 9 - Buscar produto', () => {
  it('Deve buscar produto pelo nome e validar resultados', () => {
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
});
