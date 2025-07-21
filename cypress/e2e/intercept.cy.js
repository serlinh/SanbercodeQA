describe('Intercept', () => {
  it('Test Web Automation using Intercept', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary');

    cy.intercept('GET','**/time-at-work*').as('TimeatWork');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts').as('shortcuts');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc').as('feedLimit');


    cy.get('[type="submit"]').click();

    cy.wait('@actionSummary');
    cy.wait('@TimeatWork');
    cy.wait('@shortcuts');
    cy.wait('@feedLimit');

  });
});
