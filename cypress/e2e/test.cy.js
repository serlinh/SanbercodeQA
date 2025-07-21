describe('Intercept', () => {
  it('Test Web Automation using Intercept', () => {

    cy.intercept({
        method: 'POST',
        url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate' }, (req) => {
        req.body.username = 'Admin'; 
        req.body.password = 'admin123';
        }).as('loginRequest');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');

    

    cy.get('[type="submit"]').click();
    cy.wait('@loginRequest').then((interception) => {
        console.log('Data dikirim:', interception.request.body);
        
        expect(interception.request.body.username).to.eq('Admin');
        expect(interception.request.body.password).to.eq('admin123');
});

  });
});