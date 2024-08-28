describe('Login', () => {
  it('verificando se os elementos da tela de login estão visíveis', () => {
    cy.visit('/');

    cy.get('input[type=email]').should('be.visible').should('have.attr', 'placeholder', 'example@gmail.com');
    cy.get('input[type=password]').should('be.visible').should('have.attr', 'placeholder', 'Sua senha');
    cy.get('button').should('be.visible').should('be.disabled');
  });

  it('verificando se ao fazer o login de forma correta o usuário vai para a rota de /services', () => {
    cy.visit('/');

    cy.get('input[type=email]').type('example@gmail.com');
    cy.get('input[type=password]').type('Ab12345678@');
    cy.get('button').should('be.visible').should('be.enabled').click();

    cy.url().should('contain', '/services');
    cy.get('div#services').should('have.attr', 'id', 'services')
      .should('contain', 'Serviços');
  });

  it('verificando se aparece a mensagem "email ou senha incorretos."', () => {
    cy.visit('/');

    cy.get('input[type=email]').type('example@gmail.com');
    cy.get('input[type=password]').type('Ab1234678@');
    cy.get('button').should('be.visible').should('be.enabled').click();

    cy.get('#swal2-title').should('contain.text', 'Email ou senha incorreta');
  });
});
