describe('Login Scenario', () => {
  beforeEach(() => {
    cy.visit('localhost:5173/auth/login');
  });

  it('Input should appear', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('[data-testid="login"]').should('be.visible');
  });

  it('Login with wrong email/password', () => {
    cy.get('input[type="email"]').type('emailsalah@mail.com');
    cy.get('input[type="password"]').type('passswordsalah');
    cy.get('[data-testid="login"]')
      .click()
      .then(async () => {
        cy.get('[data-testid="toast"]').should('be.visible');
        cy.contains('email or password is wrong');
      });
  });

  it('Login success', () => {
    cy.get('input[type="email"]').type('tesze2@gmail.com');
    cy.get('input[type="password"]').type('tesze2');
    cy.get('[data-testid="login"]')
      .click()
      .then(async () => {
        cy.get('[data-testid="toast"]').should('be.visible');
        cy.contains('user logged in');
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.get('[data-testid="add-thread"]').should('be.visible');
        cy.get('[data-testid="logout"]').click();
      });
  });
});
