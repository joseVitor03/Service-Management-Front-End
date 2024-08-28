describe('Clients', () => {
  beforeEach(() => {
    cy.setCookie('token-oficina', 'any');
    cy.visit('/clients');
  });
  it('verificando se os elementos da rota /clients estão visíveis', () => {
    cy.get('input#name').should('have.attr', 'placeholder', 'maria');
    cy.get('input#car').should('have.attr', 'placeholder', 'cruze');
    cy.get('input#plate').should('have.attr', 'placeholder', 'ABC-1D23');
    cy.get('input#year').should('have.attr', 'placeholder', '2010');
    cy.get('button').should('contain.text', 'Buscar');

    cy.get('th').should('have.length', 5);
    cy.get('th:nth-child(1)').should('contain.text', 'Nome');
    cy.get('th:nth-child(2)').should('contain.text', 'Carro');
    cy.get('th:nth-child(3)').should('contain.text', 'Cor do Veículo');
    cy.get('th:nth-child(4)').should('contain.text', 'Ano');
    cy.get('th:nth-child(5)').should('contain.text', 'Placa');

    cy.get('#btnAddClient').should('exist').should('have.attr', 'title', 'cadastrar cliente');
  });
  it('verificando se a filtragem esta funcionando e o botão de remover filtragem', () => {
    cy.get('tbody>tr').should('have.length', 4).as('tabela');

    cy.get('tbody>tr:nth-child(1)>td:nth-child(1)').should('contain.text', 'FULANO');
    cy.get('tbody>tr:nth-child(2)>td:nth-child(1)').should('contain', 'CICLANO');
    cy.get('tbody>tr:nth-child(3)>td:nth-child(1)').should('contain.text', 'CLAUDIA');
    cy.get('tbody>tr:nth-child(4)>td:nth-child(1)').should('contain.text', 'CARLOS');

    cy.get('input#name').type('a');
    cy.get('input#car').type('a');
    cy.get('input#plate').type('A');
    cy.get('input#year').type('2005');
    cy.get('button').should('contain.text', 'Buscar').click();

    cy.get('@tabela').should('have.length', 1);

    cy.get('tbody>tr:nth-child(1)>td:nth-child(1)').should('not.contain.text', 'FULANO');
    cy.get('tbody>tr:nth-child(1)>td:nth-child(1)').should('contain', 'CARLOS');

    cy.get('div#refresh').click();

    cy.get('tbody>tr').should('have.length', 4);
  });
  it(`verificando se ao clicar em algum cliente da tabela, 
  o usuário é redirecionado para a rota /clients/:id`, () => {
    cy.get('tbody>tr:nth-child(1)>td:nth-child(1)').should('contain.text', 'FULANO').click();

    cy.url().should('contain', '/clients/1');
  });
  it(`verificando se ao clicar no botão de cadastrar cliente,
   o usuário é redirecionado para a rota /clients/newClient`, () => {
    cy.get('#btnAddClient').click();

    cy.url().should('contain', '/clients/newClient');
  });
});
