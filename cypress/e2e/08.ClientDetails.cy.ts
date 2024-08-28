describe('ClientDetails', () => {
  beforeEach(() => {
    cy.setCookie('token-oficina', 'any');
    cy.visit('/clients/1');
  });
  it('verficando os elementos da tela de detalhes do cliente com id: 1', () => {
    cy.get('h1').should('contain.text', 'Dados do Cliente:');
    cy.get('button').should('contain.text', 'Deletar cliente');

    cy.get('#containerData > :nth-child(1)').should('contain.text', 'Nome: Fulano');
    cy.get('#containerData > :nth-child(2)').should('contain.text', 'Carro: HONDA CIVIC');
    cy.get('#containerData > :nth-child(3)').should('contain.text', 'Marca: HONDA');
    cy.get('#containerData > :nth-child(4)').should('contain.text', 'Ano: 2020');
    cy.get('#containerData > :nth-child(5)').should('contain.text', 'Cor carro: Azul');
    cy.get('#containerData > :nth-child(6)').should('contain.text', 'Placa: ABC-1B23');
    cy.get('#containerData > :nth-child(7)').should('contain.text', 'Celular: 12345-6781');
    cy.get('#containerData > button').should('contain.text', 'Alterar dados');

    cy.get('h2').should('contain.text', 'Serviços:');

    cy.get('th').should('have.length', 3);
    cy.get('th:nth-child(1)').should('contain.text', 'Serviço Pago');
    cy.get('th:nth-child(2)').should('contain.text', 'Total Serviço');
    cy.get('th:nth-child(3)').should('contain.text', 'Data');
  });
  it('conferindo os elementos para atualizar os dados e fazendo atualização dos dados do cliente', () => {
    cy.get('#containerData > :nth-child(7)').should('contain.text', 'Celular: 12345-6781').as('phoneClient');

    cy.get('#containerData > button').click();

    cy.get('h3').should('contain.text', 'Dados:');
    cy.get('#name').should('be.visible');
    cy.get('#cars').should('be.visible');
    cy.get('button').should('contain.text', 'Buscar carro');
    cy.get('#carColor').should('be.visible');
    cy.get('#plate').should('be.visible');
    cy.get('#phone').should('be.visible').as('phone');
    cy.get('#btnUpdateClient').should('contain.text', 'Atualizar dados').should('be.disabled').as('btnUpdate');
    cy.get('h3').should('contain.text', 'Filtrar Carros:');
    cy.get('#car').should('be.visible').should('have.attr', 'placeholder', 'nome carro...');
    cy.get('button').should('contain.text', 'Buscar');

    cy.get('@phone').clear().type('12 34567-8901');
    cy.get('@btnUpdate').should('be.enabled').click();

    cy.get('@phoneClient').should('not.contain.text', 'Celular: 12345-6781').should('contain.text', 'Celular: 12 34567-8901');
  });
  it('deletando cliente', () => {
    cy.get('#btnDelete').click();

    cy.get('h3').should('contain.text', 'Tem certeza que deseja deletar esse cliente?');
    cy.get('#yes').click();

    cy.get('.swal2-popup').should('contain', 'Cliente excluído');
  });
  it('deletando cliente, mas negando no modal', () => {
    cy.get('#btnDelete').click();

    cy.get('h3').should('contain.text', 'Tem certeza que deseja deletar esse cliente?');
    cy.get('#no').click();

    cy.get('.swal2-popup').should('not.exist');
  });
});
