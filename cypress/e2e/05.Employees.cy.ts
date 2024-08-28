describe('Employees', () => {
  beforeEach(() => {
    cy.setCookie('token-oficina', 'any');
    cy.visit('/employees');
  });
  it('verificando elementos da tela Employees', () => {
    cy.get('h2').should('be.visible').should('contain.text', 'Funcionários');

    cy.get('select').should('have.value', '');

    cy.get('div#addEmployee').should('be.visible');
  });
  it(`verificando se ao selecionar um funcionário aparece o seu nome e os botões
  "Deseja excluir esse funcionário" e "Produtividade do func. em um intervalo de datas" e
  lista de serviços desse funcionário`, () => {
    cy.get('h2').should('not.contain.text', 'Fabio');

    cy.get('select').select('Fabio');

    cy.get('h2').should('contain.text', 'Fabio');
    cy.get('button').should('contain.text', 'Deseja excluir esse funcionário');
    cy.get('button').should('contain.text', 'Produtividade do func. em um intervalo de datas');

    cy.get('th').should('have.length', 8);
    cy.get('tbody>tr').should('have.length', 3);
  });

  it(`verificanndo se ao selecionar um func. e clicar no botão de excluir o funcionário, aparece um pop-up
  com a mensagem de "funcionário removido"`, () => {
    cy.get('select').select('Fabio');
    cy.get('#removeEmployee').should('contain.text', 'Deseja excluir esse funcionário').click();
    cy.get('#yes').click();

    cy.get('.swal2-popup').should('contain.text', 'funcionário removido');
  });
  it(`verificanndo se ao selecionar um func. e clicar no botão de excluir o funcionário, mas caso não 
  confirme, mão deve aparece um pop-up"`, () => {
    cy.get('select').select('Fabio');
    cy.get('#removeEmployee').should('contain.text', 'Deseja excluir esse funcionário').click();
    cy.get('#no').click();

    cy.get('.swal2-popup').should('not.exist');
  });
  it(`verificando se ao clicar no botão de produtividade deve aparecer um formulário e
  ao preenche-lo deve ter os serviços nesse intervalo de datas`, () => {
    cy.get('select').select('Fabio');
    cy.get('#productivityEmployee').click();

    cy.get('#btnProductivity').should('contain.text', 'Buscar').should('be.disabled').as('search');
    cy.get('#dateInitial').type('2024-05-19');
    cy.get('#dateFinal').type('2024-05-21');
    cy.get('@search').should('be.enabled').click();

    cy.get('h2').should('contain.text', 'Funcionário: Fabio');
  });
  it('verificando se ao cadastrar um funcionário a aparece um pop-up com o titulo "Funcionário cadastrado."', () => {
    cy.get('#addEmployee').click();

    cy.get('h3').should('contain.text', 'Cadastrar');

    cy.get('#name').type('cleber');
    cy.get('button').should('contain.text', 'Cadastrar').click();

    cy.get('#swal2-title').should('contain.text', 'Funcionário cadastrado.');
  });
});
