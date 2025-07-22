describe('Intercept', () => {
  it('Test Web Automation using Intercept', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //Memasukan Data User
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');

    //Scenario untuk Login
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary');

    cy.intercept('GET','**/time-at-work*').as('TimeatWork');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts').as('shortcuts');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc').as('feedLimit');
    
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/leaves?date=*').as('leavesDate');
    
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('subunit');
    
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations').as('location');

    //Klik button Login
    cy.get('[type="submit"]').click();

    //Scenario untuk Login
    cy.wait('@actionSummary');
    cy.wait('@TimeatWork');
    cy.wait('@shortcuts');
    cy.wait('@feedLimit');
    cy.wait('@leavesDate');
    cy.wait('@subunit');
    cy.wait('@location');

    //Scenario untuk Sidebar
    
    //Admin
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC').as('userLimit');
    
    //PIM
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/employment-statuses?limit=0').as('employmentStatus');
    
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles?limit=0').as('jobtitles');
    
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/subunits').as('subunits');
    
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC').as('employeeslimit');
    
    //Leave
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-periods').as('leavePeriod');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/workweek?model=indexed').as('workweek');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-types?limit=0').as('leaveType');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/employees/leave-requests?limit=50&offset=0&includeEmployees=onlyCurrent').as('leaveRequests');

    cy.intercept('GET','**/api/v2/leave/holidays*').as('holidaysList');

    //Time
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/time/employees/timesheets/list?limit=50&offset=0').as('listLimit');

    //My Info
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/7/personal-details').as('personalDetails');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/7').as('employeesNum');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/7/custom-fields?screen=personal').as('customFields');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/7/screen/personal/attachments?limit=50&offset=0').as('attachments');

    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees').as('employees');

    //Scenario untuk Sidebar

    //Klik Admin di Sidebar
    cy.get('.oxd-sidepanel-body').contains('Admin').click();
    //Admin
    cy.wait('@userLimit');

    
    //Klik PIM di Sidebar
    cy.get('.oxd-sidepanel-body').contains('PIM').click();
    //PIM
    cy.wait('@employmentStatus');
    cy.wait('@jobtitles');
    cy.wait('@subunits');
    cy.wait('@employeeslimit');
    
    //Klik Leave di Sidebar
    cy.get('.oxd-sidepanel-body').contains('Leave').click();
    //Leave
    cy.wait('@leavePeriod');
    cy.wait('@workweek');
    cy.wait('@leaveType');
    cy.wait('@leaveRequests');
    cy.wait('@holidaysList');

    //Klik Time di Sidebar
    cy.get('.oxd-sidepanel-body').contains('Time').click();
    //Time
    cy.wait('@listLimit');

    //Klik My Info di Sidebar
    cy.get('.oxd-sidepanel-body').contains('My Info').click();
    //My Info
    cy.wait('@personalDetails');
    cy.wait('@employeesNum');
    cy.wait('@customFields');
    cy.wait('@attachments');
    cy.wait('@employees');

  });
});
