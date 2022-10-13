/// <reference types="cypress"/>

it("quering elements", () => {
    cy.visit('http://localhost:8080/commands/querying');
    //взяти елемент
    cy.get('#query-btn').should('contain', 'Button');

    //cy.contains  може бути без get
    cy.get('.query-list').contains('bananas').should('have.class', 'third');
    cy.contains('bananas').should('have.class', 'third');

    //можна взяти елемент який містить текст
    cy.contains('li', 'bananas').should('have.class', 'third');

    //можна в середині get задати елемент який містить текст
    cy.get('li:contains("bananas")').should('have.class', 'third');

    //.within() дозволяє шукати елемент в рамках іншого елемента
    cy.get('.query-form').within(() => {
        cy.get('#inputEmail').should('exist');
        cy.get('#inputPassword').should('exist');

        cy.get('.btn.btn-default').should('not.exist');
    })

    //cy.root() - взяти корінний елемент сторінки
    cy.root().should('contain', 'apples');
})


it("commands to find elements", () => {
    cy.visit('http://localhost:8080/commands/traversal');
    //.children() - взяти дочірні елементи в рамках якогось елементу
    cy.get('ol.traversal-breadcrumb.breadcrumb').children('.active');
    //.closest() - бере найближчий елемент в цьому ж рівні (вгору або вниз)
    //та вгору! по структурі до батьківських елементів 
    cy.get('.traversal-badge').closest('ul').should('have.class', 'list-group');
    cy.contains('John')
    .should('contain', 'John')
    .closest('table')
    .should('have.class', 'table')
    //.find() - взяти елемент в середині певного елементу
    cy.get('.pagination.traversal-pagination').find('a').contains('4');

    //.next() - наступний сібілінг
    cy.get('.traversal-ul').contains('apples').next()
    .should('contain', 'oranges')
    .next()
    .should('contain', 'bananas');

    //.nextAll()
    cy.get('.traversal-next-all').contains('apples').nextAll()
    .should('have.length', 4);

    //.not() - взяти НЕ цей елемент
    cy.get('.traversal-disabled [type="button"]')
    .not('[disabled="disabled"]')
    .should('be.enabled');

    //.sibilings() - бере всі сібілінги певного елемента, але без самого елемента
    cy.get('.nav.nav-pills.traversal-pills li.active')
    .siblings()
    .should('have.length', 2);

})