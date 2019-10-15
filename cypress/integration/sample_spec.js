describe('My first test', function(){
    it('Login scenerio', function(){
        cy.visit('https://morsetim.github.io/QuickCredit/TEMPLATE/html/client/index')
        cy.get('.sign-in-link').click()
        cy.get('#email').type('mauricium.maurice@yahoo.com')
        cy.get('#password').type('qwertyuiop')
        cy.get('button').click()
    })
})