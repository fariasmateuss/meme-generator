/// <reference types="cypress" />

context('Home page', () => {
  it('should load the home page', () => {
    cy.visit('/');
  });
});
