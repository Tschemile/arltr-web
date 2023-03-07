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
    // cy.get('input[type="file"]').selectFile('cypress/fixtures/rem.jpg', {
    //   force: true,
    // });
    cy.get('body').type('{esc}');
  });
  it('Change Theme', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[name="usernameOrEmail"]').type(user);
    cy.get('[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.intercept('POST', `**/user/login`).as('login');
    cy.wait('@login');
    cy.get('.icon-header').eq(3).click();
    cy.contains('Dark Mode').click();
    cy.get('body').should('have.class', 'theme-dark');
    cy.wait(5000);
    cy.contains('Pink Mode').click();
    cy.get('body').should('have.class', 'theme-pink');
    cy.wait(5000);
    cy.contains('SOVIET Mode').click();
    cy.get('body').should('have.class', 'theme-soviet');
    cy.wait(5000);
    cy.contains('Light Mode').click();
    cy.get('body').should('have.class', 'theme-default');
  });
});
