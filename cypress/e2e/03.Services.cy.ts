describe('Services', () => {
  beforeEach(() => {
    cy.setCookie('token-oficina', 'any');
  });
  it('verificando elementos em tela da rota /services', () => {
    cy.visit('/services');

    cy.get('div#services').should('have.attr', 'id', 'services');
    cy.get('div#clients').should('have.attr', 'id', 'clients');
    cy.get('div#employees').should('have.attr', 'id', 'employees');
    cy.get('div#registers').should('have.attr', 'id', 'registers');

    cy.get('[for="client"]').should('contain.html', 'input');
    cy.get('[for="car"]').should('contain.html', 'input');
    cy.get('[for="plate"]').should('contain.html', 'input');
    cy.get('[for="year"]').should('contain.html', 'input');
    cy.get('[for="dateInitial"]').should('contain.html', 'input');
    cy.get('[for="dateFinal"]').should('contain.html', 'input');

    cy.get('button').should('contain.text', 'Serviços Pagos');

    cy.get('table>thead>tr>th').should('have.length', 8);
  });
  it('verificando se a filtragem está funcionando. É esperado sobrar somente o cliente FULANO', () => {
    cy.visit('/services');

    cy.get('#year').type('2020');
    cy.get('button#filterBtn').should('contain.text', 'Buscar').click().as('btnFilter');

    cy.get('tbody>tr>td').should('contain.text', 'FULANO');
    cy.get('tbody>tr>td').should('contain.text', 'MARIA');
    cy.get('tbody>tr>td').should('not.contain.text', 'CICLANO');

    cy.get('#car').type('CIVIC');
    cy.get('button#filterBtn').should('contain.text', 'Buscar').click().as('btnFilter');

    cy.get('tbody>tr>td').should('contain.text', 'FULANO');
    cy.get('tbody>tr>td').should('not.contain.text', 'MARIA');
  });
  it(`verificando se a filtragem está funcionando usando também o intervalo de dadas.
   É esperado sobrar somente a cliente CLAUDIA`, () => {
    cy.visit('/services');

    cy.get('#dateInitial').type('2024-04-22');
    cy.get('#dateFinal').type('2024-04-25');
    cy.get('button#filterBtn').should('contain.text', 'Buscar').click().as('btnFilter');

    cy.get('tbody>tr>td').should('contain.text', 'CLAUDIA');
    cy.get('tbody>tr>td').should('contain.text', 'CICLANO');
    cy.get('tbody>tr>td').should('not.contain.text', 'FULANO');

    cy.get('#year').type('2018');
    cy.get('button#filterBtn').should('contain.text', 'Buscar').click().as('btnFilter');

    cy.get('tbody>tr>td').should('contain.text', 'CLAUDIA');
    cy.get('tbody>tr>td').should('not.contain.text', 'CICLANO');
  });
  it('verificando se o botão de filtragem esta funcionando.', () => {
    cy.visit('/services');

    cy.get('#dateInitial').type('2024-04-22');
    cy.get('#dateFinal').type('2024-04-25');
    cy.get('button#filterBtn').should('contain.text', 'Buscar').click();

    cy.get('tbody>tr>td').should('contain.text', 'CLAUDIA');
    cy.get('tbody>tr>td').should('contain.text', 'CICLANO');
    cy.get('tbody>tr>td').should('not.contain.text', 'FULANO');

    cy.get('#year').type('2018');
    cy.get('button#filterBtn').should('contain.text', 'Buscar').click();

    cy.get('tbody>tr>td').should('contain.text', 'CLAUDIA');
    cy.get('tbody>tr>td').should('not.contain.text', 'CICLANO');

    cy.get('#refreshBtn').click();

    cy.get('tbody>tr>td').should('contain.text', 'CLAUDIA');
    cy.get('tbody>tr>td').should('contain.text', 'CICLANO');
    cy.get('tbody>tr>td').should('contain.text', 'FULANO');
  });
  it(`verificando se ao clicar no botão "Serviços Pagos" 
  muda para a tabela de serviços pagos e depois clique novamente no botão e volte
  para a tabela de serviços pendentes`, () => {
    cy.visit('/services');

    cy.get('#btnPaidAndUnpaid').as('btnPaid').should('contain.text', 'Serviços Pagos');

    cy.get('tbody>tr>td').should('not.contain.text', 'VITOR');
    cy.get('tbody>tr>td').should('contain.text', 'FULANO');

    cy.get('@btnPaid').click();

    cy.get('tbody>tr>td').should('not.contain.text', 'FULANO');
    cy.get('tbody>tr>td').should('contain.text', 'VITOR').should('contain.text', 'Pago');

    cy.get('@btnPaid').click();

    cy.get('tbody>tr>td').should('not.contain.text', 'VITOR');
  });
  it(`verificando se quando clicar em algum serviço da tabela de serviços, o usuário é ridirecionado
  para a rota/services/id`, () => {
    cy.visit('/services');

    cy.get('.tableValueService_dataService__UTWAY > :nth-child(1) > :nth-child(1)').click();

    cy.url().should('contain', '/services/1');
    cy.get('h2').should('contain.text', 'Nota Serviço');
  });
  it('verificando se ao clicar no botão de adicionar serviço, o usuário vai para a rota /services/newService', () => {
    cy.visit('/services');

    cy.get('#addService').click();
    cy.wait(2000);
    cy.url().should('contain', '/services/newService');
  });
});
