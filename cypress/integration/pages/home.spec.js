/// <reference types="cypress" />

context('Home page', () => {
  it('should load the home page and show content', () => {
    cy.visit('/');
    cy.contains('Pick a meme');
  });
});
