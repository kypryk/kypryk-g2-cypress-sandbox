/// <reference types="cypress"/>

it('passes', () => {
    cy.visit('http://localhost:8080/commands/assertions');

    //перевірити що в полі для url (перерірити ендпойнт, протокол)
    cy.location().then( location => {
        expect(location.href).to.eq('http://localhost:8080/commands/assertions')
        expect(location.host).to.eq('localhost:8080');
        expect(location.hostname).to.eq('localhost');
        expect(location.port).to.eq('8080');
        //search перевіряє те шо йде після ? в url
        expect(location.search).to.be.empty
        expect(location.pathname).to.eq('/commands/assertions');
        expect(location.protocol).to.eq('http:');
        expect(location.port).to.not.contain('//');
    })

    cy.url().should('eq', 'http://localhost:8080/commands/assertions')
})