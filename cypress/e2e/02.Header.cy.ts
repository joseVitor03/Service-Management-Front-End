describe('Header', () => {
  beforeEach(() => {
    cy.setCookie('token-oficina', 'any');
  });
  it('verificando se os botões do header redirecionam paga as páginas corretas', () => {
    cy.visit('/services');

    cy.get('div#services').should('have.attr', 'id', 'services').as('btnServices');

    cy.get('div#clients').should('have.attr', 'id', 'clients').click();

    cy.wait(3000);

    cy.url().should('contain', '/clients');

    cy.get('div#employees').should('have.attr', 'id', 'employees').click();

    cy.url().should('contain', '/employees');

    cy.get('div#registers').should('have.attr', 'id', 'registers').click();

    cy.url().should('contain', '/registers');

    cy.get('div#services').click();

    cy.url().should('contain', '/services');
  });
});
