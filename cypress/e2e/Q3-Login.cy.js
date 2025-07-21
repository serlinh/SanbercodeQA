describe('Fitur Login - OrangeHRM', () => {
  const url = 'https://opensource-demo.orangehrmlive.com/';
  const usernameInput = 'input[name="username"]';
  const passwordInput = 'input[name="password"]';
  const loginButton = 'button[type="submit"]';

  beforeEach(() => {
    cy.visit(url);
    cy.get(usernameInput, { timeout: 10000 }).should('be.visible');
  });

  it('TC_001 - Menampilkan menu login', () => {
    cy.get(usernameInput).should('be.visible');
    cy.get(passwordInput).should('be.visible');
  });

  it('TC_002 - Username salah, password benar', () => {
    cy.get(usernameInput).type('Admim');
    cy.get(passwordInput).type('admin123');
    cy.get(loginButton).click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_003 - Username benar, password salah', () => {
    cy.get(usernameInput).type('Admin');
    cy.get(passwordInput).type('admin321');
    cy.get(loginButton).click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_004 - User tidak terdaftar', () => {
    cy.get(usernameInput).type('CustomerService');
    cy.get(passwordInput).type('cs123');
    cy.get(loginButton).click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_005 - Username dan password kosong', () => {
    cy.get(loginButton).click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('TC_006 - Salah satu kolom kosong', () => {
    // Case 1: Username isi, password kosong
    cy.get(usernameInput).type('Admin');
    cy.get(loginButton).click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
    cy.reload();

    // Case 2: Username kosong, password isi
    cy.get(passwordInput).type('admin123');
    cy.get(loginButton).click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('TC_007 - Login dengan username lowercase (admin)', () => {
    cy.get(usernameInput).type('admin');
    cy.get(passwordInput).type('admin123');
    cy.get(loginButton).click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_008 - Kombinasi kapitalisasi salah', () => {
    cy.get(usernameInput).type('Admin');
    cy.get(passwordInput).type('Admin123');
    cy.get(loginButton).click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_009 - Paste password berhasil', () => {
    // Simulasi paste password
    cy.get(usernameInput).type('Admin');
    cy.get(passwordInput).invoke('val', 'admin123').should('have.value', 'admin123');
  });

  it('TC_010 - Password disembunyikan', () => {
    cy.get(passwordInput).should('have.attr', 'type', 'password');
  });

  it('TC_011 - Login berhasil', () => {
    cy.get(usernameInput).type('Admin');
    cy.get(passwordInput).type('admin123');
    cy.get(loginButton).click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });
});