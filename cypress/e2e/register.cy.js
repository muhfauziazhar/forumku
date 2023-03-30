describe('Register Scenario', () => {
  beforeEach(() => {
    cy.visit('localhost:5173/auth/register');
  });

  it('Input should appear', () => {
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible');
  });

  it('Input give an error when blank input', () => {
    cy.get('button')
      .contains(/^Register$/)
      .click();
    cy.contains('Name is required');
    cy.contains('Email is required');
    cy.contains('Password is required');
  });

  it('Register success', () => {
    const random = `${Math.floor(Math.random() * 10000000000000)}`;

    cy.get('input[type="text"]').type(`nama${random}`);
    cy.get('input[type="email"]').type(`email${random}@gmail.com`);
    cy.get('input[type="password"]').type('tesze2');
    cy.get('button')
      .contains(/^Register$/)
      .click()
      .then(async () => {
        cy.get('[data-testid="toast"]').should('be.visible');
        cy.contains('user created');
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/auth/login');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
        cy.get('[data-testid="login"]').should('be.visible');
      });
  });
});
