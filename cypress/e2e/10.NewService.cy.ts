describe('NewService', () => {
  beforeEach(() => {
    cy.setCookie('token-oficina', 'any');
    cy.visit('/services/newService');
  });
  it('verificando elementos da tela newService', () => {
    cy.get('h3').should('contain.text', 'Funcionário responsável:');
    cy.get('#principalEmployee').should('be.visible')
      .should('have.css', 'background-color', 'rgb(255, 106, 106)');

    cy.get('h3').should('contain.text', 'Buscar cliente');
    cy.get('#name').should('have.attr', 'placeholder', 'maria');
    cy.get('#plate').should('have.attr', 'placeholder', 'ABC-1D23');
    cy.get('button').should('contain.text', 'Buscar cliente').should('be.disabled');
    cy.get('h5').should('contain.text', 'Caso o cliente não seja cadastrado clique aqui.');

    cy.get('h3').should('contain.text', 'Itens do serviço:');
    cy.get('#item').should('have.attr', 'placeholder', 'filtro ar');
    cy.get('button').should('contain.text', 'Buscar item').should('be.disabled');

    cy.get('h3').should('contain.text', 'Funcionário(s) no serviço:');
    cy.get('#employeeService').should('be.visible');
    cy.get('#description').should('exist');
    cy.get('p').should('contain.text', '*Caso não especifique nehum tipo, será: MÃO DE OBRA');
    cy.get('#labor').should('have.attr', 'placeholder', '100.50');
    cy.get('button').should('contain.text', 'Adicionar serviço').should('be.disabled');

    cy.get('h2').should('contain.text', 'Nota Serviço');
    cy.get('h3').should('contain.text', 'Cliente:');
    cy.get('h3').should('contain.text', 'Data:');
    cy.get('h4').should('contain.text', 'Carro:');
    cy.get('h4').should('contain.text', 'Ano:');
    cy.get('h4').should('contain.text', 'Cor:');
    cy.get('h4').should('contain.text', 'Placa:');
    cy.get('h4').should('contain.text', 'Mecânico responsavel:');
    cy.get('thead>tr>th').should('have.length', 9);
    cy.get('h3').should('contain.text', 'Itens:');
    cy.get('h3').should('contain.text', 'Serviço:');
    cy.get('h2').should('contain.text', 'Total:');

    cy.get('button').should('contain.text', 'Finalizar Nota').should('be.disabled');
  });
  it('fazendo uma nova nota', () => {
    cy.get('#principalEmployee').select('Fabio');
    cy.get('#name').type('ciclano');
    cy.get('#searchClient').should('contain.text', 'Buscar cliente').click();

    cy.get('.ModalSelectClient_cardsClients__BvP2G > :nth-child(2)').click();

    cy.get('#item').type('filtro');
    cy.get('#searchItem').click();

    cy.get('.ModalSelectItens_cardsItens__F7moH > :nth-child(2)').click();
    cy.get('#qtdUnit').type('1');
    cy.get('#priceUnit').type('150');
    cy.get('#btnAddItem').click();

    cy.get('#employeeService').select('Fabio');
    cy.get('#labor').type('200');
    cy.get('#btnAddLabor').click();
    cy.get('#employeeService').select('Silvana');
    cy.get('#description').type('alinhamento');
    cy.get('#labor').type('500');
    cy.get('#btnAddLabor').click();
    cy.get('#btnRegisterService').click();

    cy.get('.swal2-popup').should('exist').should('contain', 'Serviço Cadastrado.');
  });
  it('fazendo uma nota com serviço, mas sem itens', () => {
    cy.get('#principalEmployee').select('Fabio');
    cy.get('#name').type('ciclano');
    cy.get('#searchClient').should('contain.text', 'Buscar cliente').click();

    cy.get('.ModalSelectClient_cardsClients__BvP2G > :nth-child(2)').click();

    cy.get('#employeeService').select('Silvana');
    cy.get('#description').type('alinhamento');
    cy.get('#labor').type('500');
    cy.get('#btnAddLabor').click();
    cy.get('#employeeService').select('Fabio');
    cy.get('#labor').type('200');
    cy.get('#btnAddLabor').click();

    cy.get('#btnRegisterService').click();

    cy.get('.swal2-popup').should('exist').should('contain', 'Serviço Cadastrado.');
  });
  it('fazendo nota com itens, mas sem serviço', () => {
    cy.get('#principalEmployee').select('Fabio');
    cy.get('#name').type('ciclano');
    cy.get('#searchClient').should('contain.text', 'Buscar cliente').click();

    cy.get('.ModalSelectClient_cardsClients__BvP2G > :nth-child(2)').click();

    cy.get('#item').type('filtro');
    cy.get('#searchItem').click();

    cy.get('.ModalSelectItens_cardsItens__F7moH > :nth-child(2)').click();
    cy.get('#qtdUnit').type('1');
    cy.get('#priceUnit').type('150');
    cy.get('#btnAddItem').click();

    cy.get('#btnRegisterService').click();

    cy.get('.swal2-popup').should('exist').should('contain', 'Serviço Cadastrado.');
  });
});
