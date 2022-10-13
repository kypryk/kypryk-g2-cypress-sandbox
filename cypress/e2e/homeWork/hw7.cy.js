/// <reference types="cypress"/>

const params = [
    {value: ['top-right', 'Title 1', 'Content 1', 'primary', '0'], 
    expected: ['justify-content: flex-end; align-items: flex-start;', 'Title 1', 'Content 1', 'email', 'rgb(98, 0, 238)']},
    {value: ['top-left', 'Title 2', 'Content 2', 'success', '1'],
    expected: ['justify-content: flex-start; align-items: flex-start;', 'Title 2', 'Content 2', 'checkmark', 'rgb(96, 175, 32)']},
    {value: ['bottom-left', 'Title 3', 'Content 3', 'info', '2'], 
    expected: ['justify-content: flex-start; align-items: flex-end;', 'Title 3', 'Content 3', 'question-mark', 'rgb(4, 149, 238)']},
    {value: ['bottom-right', 'Title 4', 'Content 4', 'warning', '3'],
    expected: ['justify-content: flex-end; align-items: flex-end;', 'Title 4', 'Content 4', 'alert-triangle', 'rgb(255, 159, 5)']}
]

before(() => {
    cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/');
        
    //обираємо першу лайт тему
    cy.get('nb-card-header').first().click();
    //відкриваємо Modal & Overlays -> Toastr
    cy.get('.menu-title.ng-tns-c141-19').click();
    cy.get('.menu-title.ng-tns-c141-23').click();
})

params.forEach(({value, expected}) => {
    it(`Toasts with params: ${value}`, () => { 
        //заповнюємо форму:
        //позиція
        cy.get('[class="mat-ripple position-select appearance-outline size-medium status-basic shape-rectangle nb-transition"]')
        .click();
        cy.get(`[ng-reflect-value="${value[0]}"]`).click();
        //тайтл і контент
        cy.get('[name="title"]').clear().type(value[1]);
        cy.get('[name="content"]').clear().type(value[2]);
        //timeout <- КОСТИЛЬ
        cy.get('[name="timeout"]').clear().type('1000');
        //тип тоста
        cy.get('[class="mat-ripple appearance-outline size-medium status-basic shape-rectangle nb-transition"]')
        .click();
        cy.get(`[ng-reflect-value="${value[3]}"]`).click();
        //show toast
        cy.get('[class="mat-ripple appearance-filled size-medium shape-rectangle status-basic nb-transition"]')
        .click();
        
        //перевірки
        cy.get('.cdk-overlay-container>div').eq(value[4]).then(container => {
            //позиція
            cy.wrap(container).should('have.attr', 'style').and('eq', expected[0]);
            //тайтл і контент
            cy.get(`[style="${expected[0]}"] span.title.subtitle`)
            .should('contain', expected[1]);
            cy.get(`[style="${expected[0]}"] div.message`)
            .should('contain', expected[2]);
            //іконка
            cy.get(`[style="${expected[0]}"] g[data-name="${expected[3]}"]`)
            .should('have.attr', 'data-name').and('eq', expected[3]);
            //колір
            cy.get(`[style="${expected[0]}"] nb-toast`)
            .should('have.css', 'background').and('contain', expected[4]);
        });
    })
})
