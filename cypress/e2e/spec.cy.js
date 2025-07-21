describe('Fitur Login', () => {
  it('Test Function Login with Valid Credential', () => {
    cy.visit('https://katalon-demo-cura.herokuapp.com');

    cy.get('h1').contains('CURA Healthcare Service').should('have.text','CURA Healthcare Service');
    cy.get('h3').contains('We Care About Your Health').should('have.text','We Care About Your Health');
    cy.get('#btn-make-appointment').should('have.text','Make Appointment');

    cy.get('#btn-make-appointment').click();

    cy.contains('Demo account');
    cy.get('input[placeholder="Username"]').should('have.value', 'John Doe');
    cy.get('input[placeholder="Password"]').should('have.value', 'ThisIsNotAPassword');

    cy.get('h2').should('have.text', 'Login');
    cy.get('p.lead').contains('Please login to make appointment.').should('have.text','Please login to make appointment.');
    cy.get('label[for="txt-username"]').should('have.text', 'Username');
    cy.get('label[for="txt-password"]').should('have.text', 'Password');
    cy.get('#btn-login').should('have.text', 'Login');

    cy.get('input[name="username"]').type('John Doe');
    cy.get('input[name="password"]').type('ThisIsNotAPassword');
    cy.get('#btn-login').click();
  
    cy.get('select#combo_facility > option').should('contain.text', 'Tokyo CURA Healthcare Center');
    cy.get('select#combo_facility > option').should('contain.text', 'Hongkong CURA Healthcare Center');
    cy.get('select#combo_facility > option').should('contain.text', 'Seoul CURA Healthcare Center');
    cy.get('input[type="checkbox"][name="hospital_readmission"]').should('be.visible');
    cy.get('input[type="checkbox"][name="hospital_readmission"]').should('not.be.checked');
    cy.contains('label', 'Apply for hospital readmission').should('be.visible');
    cy.get('input[type="radio"][value="Medicare"]').should('exist');
    cy.get('input[type="radio"][value="Medicaid"]').should('exist');
    cy.get('input[type="radio"][value="None"]').should('exist');
    cy.get('input#txt_visit_date').should('exist');
    cy.get('textarea#txt_comment').should('be.visible').and('have.attr', 'placeholder', 'Comment');
    cy.get('#btn-book-appointment').should('have.text', 'Book Appointment');

    cy.get('select#combo_facility').select('Seoul CURA Healthcare Center');
    cy.get('input[type="radio"][value="Medicare"]').check();
    cy.get('input#txt_visit_date').type('21/07/2025');
    cy.get('h2').click();
    cy.get('textarea#txt_comment').type('Health Check Up');
    cy.get('#btn-book-appointment').click();

    cy.get('h2').should('have.text', 'Appointment Confirmation');
    cy.get('p.lead').contains('Please be informed that your appointment has been booked as following:').should('have.text','Please be informed that your appointment has been booked as following:');
    cy.get('p#facility').contains('Seoul CURA Healthcare Center').should('have.text','Seoul CURA Healthcare Center');
    cy.get('#hospital_readmission').contains('No').should('have.text', 'No');
    cy.get('p#program').contains('Medicare').should('have.text','Medicare');
    cy.get('p#visit_date').contains('21/07/2025').should('have.text','21/07/2025');
    cy.get('p#comment').contains('Health Check Up').should('have.text','Health Check Up');

    cy.get('.btn.btn-default').click();
  })
})