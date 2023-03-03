describe('Home Page', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
  });

  const user = 'iu@mailinator.com';
  const password = '12345678@Ab';

  it('Login', () => {
    cy.get('[name="usernameOrEmail"]').type(user);
    cy.get('[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.intercept('POST', `**/user/login`).as('login');
    cy.wait('@login');
    cy.contains('What is your mind?').click();
    cy.get('textarea').type('Lorem ipsum dolor sit amet');
    cy.get('select').select('PRIVATE').should('have.value', 'PRIVATE');
  });
});
