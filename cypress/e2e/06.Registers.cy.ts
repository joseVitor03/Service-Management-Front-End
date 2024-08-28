describe('Registers', () => {
  beforeEach(() => {
    cy.setCookie('token-oficina', 'any');
    cy.visit('/registers');
  });
  it('verificando elementos da tela /registers', () => {
    cy.get('#btnRegisterCar').should('contain.text', 'Cadastrar Carro');
    cy.get('#btnRegisterItem').should('contain.text', 'Cadastrar Item');
    cy.get('#btnRegisterClient').should('contain.text', 'Cadastrar Cliente');
    cy.get('#btnRegisterService').should('contain.text', 'Cadastrar Serviço');
  });
  it('cadastro de um novo carro', () => {
    cy.get('#btnRegisterCar').click();

    cy.get('input[placeholder="nome carro"]').type('camaro');
    cy.get('input[placeholder="ano carro"]').type('2012');
    cy.get('select').select('CHEVROLET');
    cy.get('form>button').should('contain.text', 'Cadastrar').click();
  });
  it('cadastrando item', () => {
    cy.get('#btnRegisterItem').click();
    cy.get('#name').type('bobina');
    cy.get('#registerItem').click();
  });
  it(`verificando se ao clicar no botão Cadastrar CLiente, 
  o usuário é redirecionado para a rota /clients/newClient`, () => {
    cy.get('#btnRegisterClient').click();

    cy.url().should('contain', '/clients/newClient');
  });
  it(`verificando se ao clicar no botão Cadastrar Serviço, 
  o usuário é redirecionado para a rota /services/newService`, () => {
    cy.get('#btnRegisterService').click();

    cy.url().should('contain', '/services/newService');
  });
});
