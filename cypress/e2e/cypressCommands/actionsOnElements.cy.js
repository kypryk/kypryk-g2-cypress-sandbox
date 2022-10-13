/// <reference types="cypress"/>

it("quering elements", () => {
    cy.visit('http://localhost:8080/commands/actions');
    //просто вводимо текст
    //timeout - чекаємо поки не з'явиться елемент, але не обов'язково чекаємо, бачимо елемент клікаємо
    cy.get('#email1', {timeout: 3000})
    .type("qwerqwer")
    .should("have.value", "qwerqwer");

    //переміщуємо курсор в полі, також можна натиснути enter, ctrl, backspace
    cy.get('#email1')
    .clear()
    .type('S{leftArrow}E{leftArrow}T{rightArrow}{rightArrow}{rightArrow}T', {delay: 100})
    .type('{selectAll}{backspace}')

    //можна виконати дію через force
    cy.get('textarea[disabled="disabled"]')
    .type('something', {force: true})

    //зробити елемент в фокусі (для тестування юая)
    cy.get('#password1')
    .focus()
    .prev()
    .should('have.attr', 'style')
    .and('eq', 'color: orange;');

    //прибрати фокус
    cy.get('#fullName1')
    .click()
    .blur()
    .prev()
    .should('have.attr', 'style')
    .and('eq', 'color: red;')

    //засабмітити форму (аналог кліка на кнопку яка відправляє форму)
    /*cy.get('#couponCode1')
    .type('some text')
    .closest('form')
    .submit();*/

    /*cy.get('.action-form')
    .find('#couponCode1')
    .type('some text')
    .closest('form')
    .submit();
    .siblings();
    .should('contain', 'Your form has been submitted!')*/

    cy.get('div.well')
    //беремо 4й div
    .eq(4)
    .should('not.contain', 'Your form has been submitted!')
    .find('#couponCode1')
    .type('some text')
    //шукаємо найближчий тег form рухаючись вгору по структурі без прив'язки до перентів
    .closest('form')
    //працює тільки з формами
    .submit()
    //всі сестринські елементи, не перший а ВСІ
    .siblings()
    .should('contain', 'Your form has been submitted!');

    //клікнути на елемент
    cy.get('#action-canvas')
    .click(125, 125)
    .click(15, 15);

    //клікнути одночасно на всі елементи
    cy.get('.label.label-primary')
    .click({ multiple: true });

    //примусовий клік якщо елемент перекритий іншим
    cy.get('[class="btn btn-lg btn-primary"]')
    .click({force: true});

    //чекбокси та радіо кнопки, чекнути
    cy.get('.action-checkboxes [value="checkbox1"]')
    .should('not.be.checked')
    .check()
    .should('be.checked');

    cy.get('.action-checkboxes [value="checkbox2"]')
    .should('not.be.checked')
    .should('be.disabled')
    .check({force: true})
    .should('be.checked')
    .should('be.disabled');
})