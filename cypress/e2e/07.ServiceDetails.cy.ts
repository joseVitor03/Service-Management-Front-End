describe('ServiceDetails', () => {
  beforeEach(() => {
    cy.setCookie('token-oficina', 'any');
    cy.visit('/services/1');
  });
  it('verficando se os elementos da tela ServiceDetails estão visíveis', () => {
    cy.get('button').should('contain.text', 'Deletar Serviço');
    cy.get('button').should('contain.text', 'Outros Serviços do(a) FULANO');
    cy.get('button').should('contain.text', 'Pendente');
    cy.get('button').should('contain.text', 'Imprimir');

    cy.get('h2').should('contain.text', 'Nota Serviço');

    cy.get('h3').should('contain.text', 'Cliente:');
    cy.get('h3').should('contain.text', 'Data:');

    cy.get('h4').should('contain.text', 'Carro:');
    cy.get('h4').should('contain.text', 'Ano:');
    cy.get('h4').should('contain.text', 'Cor:');
    cy.get('h4').should('contain.text', 'Placa:');

    cy.get('h4').should('contain.text', 'Mecânico responsavel:');

    cy.get('th').should('contain.text', 'Itens');
    cy.get('th').should('contain.text', 'Quantidade');
    cy.get('th').should('contain.text', 'P.Unidade');
    cy.get('th').should('contain.text', 'Total');

    cy.get('th').should('contain.text', 'Mecânico');
    cy.get('th').should('contain.text', 'Tipo Serviço');
    cy.get('th').should('contain.text', 'Total');

    cy.get('h3').should('contain.text', 'Itens:');
    cy.get('h3').should('contain.text', 'Serviço:');
    cy.get('h2').should('contain.text', 'Total:');
  });
  it(`verificando se ao clicar em "Deletar Serviço" aparece um card e havendo a confirmação
  aparecer um pop up com mensagem "Serviço Deletado"`, () => {
    cy.get('button#btnDelete').should('contain.text', 'Deletar Serviço').click();

    cy.get('h3').should('contain.text', 'Tem certeza que deseja deletar esse serviço?');
    cy.get('button#no').should('be.visible').should('contain.text', 'Não');
    cy.get('button#yes').should('be.visible').should('contain.text', 'Sim').click();

    cy.get('.swal2-popup').should('contain.text', 'Serviço deletado.');
  });
  it(`verificando se ao clicar em "Deletar Serviço" aparece um card e havendo a negação
  naão deve aparecer um pop up com mensagem "Serviço Deletado"`, () => {
    cy.get('button#btnDelete').should('contain.text', 'Deletar Serviço').click();

    cy.get('h3').should('contain.text', 'Tem certeza que deseja deletar esse serviço?');
    cy.get('button#yes').should('be.visible').should('contain.text', 'Sim');
    cy.get('button#no').should('be.visible').should('contain.text', 'Não').click();

    cy.get('.swal2-popup').should('not.exist');
  });
  it('verificando se ao clicar no botão "Outros Serviços do(a) CLIENTE" vai para a rota /clients/1', () => {
    cy.get('#btnClientDetails').should('contain.text', 'Outros Serviços do(a) FULANO').click();

    cy.url().should('contain', '/clients/1');

    cy.get('h1').should('contain.text', 'Dados do Cliente:');
  });

  it(`verificando se ao clicar no botão "Pendente" aparece um card e com a confirmação
  o botão muda o texto para "Pago"`, () => {
    cy.get('#btnUpdate').should('contain.text', 'Pendente').click();

    cy.get('h3').should('contain.text', 'Tem certeza que deseja atualizar o status de pagamento?');

    cy.get('button#no').should('contain.text', 'Não');
    cy.get('button#yes').should('contain.text', 'Sim').click();

    cy.get('#btnUpdate').should('not.contain.text', 'Pendente');
    cy.get('#btnUpdate').should('contain.text', 'Pago');
  });
});
