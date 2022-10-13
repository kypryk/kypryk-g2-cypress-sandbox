/// <reference types="cypress"/>

it('passes', () => {
    cy.visit('http://localhost:8080/commands/assertions');
    cy.get('.table.table-bordered.assertion-table tr').eq(3)
    //перевірка що елемент має клас
    .should('have.class', 'success');

    //перевірка наявності атрибута
    cy.get('.table.table-bordered.assertion-table tr').eq(3)
    .should('have.attr', 'class');

    //перевірити що в елементі правильний текст
    //find шукає елемент в середині елемента, але краще писати локатор щоб знайти потрібний елемент
    cy.get('.table.table-bordered.assertion-table tr').find('td').eq(2)
    .should('have.text', 'Column content');

    //інший спосіб знайти текст (шукає по частині тексту)
    cy.get('.table.table-bordered.assertion-table tr td').eq(3)
    .should('contain', ' content'); // або Column content

    //інший спосіб знайти текст (аналогічний contain)
    cy.get('.table.table-bordered.assertion-table tr td').eq(4)
    .should('include.text', 'Column content'); // або Column content

    //перевірка що елемент НЕ містить певний текст
    cy.get('.table.table-bordered.assertion-table tr td').eq(5)
    .should('not.contain', 'asdf'); 

    //перевірка що елемент НЕ містить певний текст
    cy.get('.table.table-bordered.assertion-table tr th').eq(5)
    .should('contain', '3'); 

    //якщо потрібно перевірити саме число або виконати матем. дії, треба 
    //витягнути властивість з елемента напр текст і змінити тип на числовий
    cy.get('.table.table-bordered.assertion-table tr th').eq(5)
    .invoke('text')
    .then(parseFloat)
    .should('be.greaterThan', 2);

    cy.get('.table.table-bordered.assertion-table tr th').eq(5)
    .invoke('text')
    .then(parseFloat)
    .should('eq', 3);

    //перевірити введене значення в поле
    cy.visit('http://localhost:8080/commands/querying')
    cy.get('#inputName').type('hello')
    .should('have.value', 'hello');

    //перевірити колір фона елемента
    cy.visit('http://localhost:8080/commands/assertions');
    cy.get('.table.table-bordered.assertion-table tr td').eq(5)
    .should('have.css', 'background-color')
    .and('eq', 'rgb(223, 240, 216)');

    //перевірка що елемент видимий на сторінці
    cy.get('.table.table-bordered.assertion-table tr td').eq(5)
    .should('be.visible');

    //перевірка кількості елементів
    cy.get('a[data-toggle="dropdown"]').click();
    cy.get('.dropdown-menu li').should('have.length', 17);

    //should змінює об'єкт перевірки! 
    //напр в шуд передається веб елемент - .should('have.css', 'background-color')
    //і далі об'єктом перевірки є не веб елемент а значення background-color
    //в should ми передаємо функцію

    
//! об'єкти НЕ можна перевіряти з should (код нижче не спрацює)    
/*    const obj = {
        key: 'Dima',
        keyObj: {
            key2: '1'
        }
    }

    const obj2 = {
        key: 'Dima',
        keyObj: {
            key2: '1'
        }
    }

    obj.should('be.equal', obj2);*/
})