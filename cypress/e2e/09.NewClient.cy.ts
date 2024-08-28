describe('NewClient', () => {
  beforeEach(() => {
    cy.setCookie('token-oficina', 'any');
    cy.visit('/clients/newClient');
  });
  it('verificando elementos da tela newClient', () => {
    cy.get('#name').should('be.visible').should('have.attr', 'placeholder', 'maria');
    cy.get('#phone').should('be.visible').should('have.attr', 'placeholder', 'ex: 61 99111-1234');
    cy.get('select').should('have.value', '');
    cy.get('button').should('contain.text', 'Buscar carro');
    cy.get('#plate').should('be.visible').should('have.attr', 'placeholder', 'ABC-1D23');
    cy.get('#color').should('be.visible').should('have.attr', 'placeholder', 'azul');
    cy.get('button').should('contain.text', 'Cadastrar');
  });
  it('fazendo cadastro de cliente', () => {
    cy.get('#name').should('be.visible').type('cleber');
    cy.get('#phone').should('be.visible').type('61 91234-5678');
    cy.get('select').select('VOLKSWAGEN');

    cy.get('button[type="button"]').should('contain.text', 'Buscar carro').click();

    cy.get('div:nth-child(1)').should('not.contain.text', 'Nome: VOLKSWAGEN POLO');

    cy.get('.SelectCarClient_containerCardsCar__Eyvqx > :nth-child(2)').click();

    cy.get('p:nth-child(1)').should('contain.text', 'Nome: VOLKSWAGEN POLO');
    cy.get('p:nth-child(2)').should('contain.text', 'Ano: 2024');

    cy.get('#plate').should('be.visible').type('BCD-1F23');
    cy.get('button[type="submit"]').should('contain.text', 'Cadastrar').should('be.disabled').as('btnRegister');
    cy.get('#color').should('be.visible').type('rosa');
    cy.get('@btnRegister').should('be.enabled').click();

    cy.get('.swal2-popup').should('exist');
  });
});
