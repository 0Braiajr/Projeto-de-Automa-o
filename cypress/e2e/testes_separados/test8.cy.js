describe('Teste 8 - Visualizar produto', () => {
  it('Deve abrir a página de detalhes do primeiro produto', () => {
    cy.visit('https://automationexercise.com/');
    cy.contains('Products').click();

    // Abre o primeiro produto pela ação "View Product"
    cy.contains('View Product').click();

    // Valida que está na página de detalhes
    cy.url().should('include', '/product_details/1');
    
    
  });
});