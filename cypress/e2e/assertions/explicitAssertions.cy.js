/// <reference types="cypress"/>

it('passes', () => {
    cy.visit('http://localhost:8080/commands/assertions');
    
    //expect не змінює об'єкт перевірки
    //в should ми передаємо елемент

    //якщо потрібно виконати тест над елементом який знайходиться на сторінці
    //не постійно, а зникає через декільки секунд використовуємо then
    cy.get('.table.table-bordered.assertion-table tr').eq(3).then(field => {
        expect(field).to.have.class('success');
        expect(field).to.have.attr('class');
        expect(field).to.not.contain('asdfdfsedf');
        //перевірка відповідності елемента значенню (при перевірці текста не важливо який іквел використовувати)
        //equal = equals = eq - строга перевірка (з типами, ===)
        expect(field.attr('class')).to.eq('success');
        expect(field.attr('class')).to.equal('success');
        expect(field.attr('class')).to.equals('success');
        //eql = eqls - не строга перевірка (без типів, ==)
        expect(field.attr('class')).to.eql('success');
        expect(field.attr('class')).to.eqls('success');
    })

    //порівняння об'єктів
    const obj = {
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
    //однакові об'єкти присвоєні різним змінним не будуть рівними
    //при порівнянні через строге порівняння
    //expect(obj).to.equals(obj2);
    expect(obj).to.eql(obj2);

    //через строге порівняння можна порівнювати об'єкти, які
    //ведуть на одну й ту ж змінну
    const obj3 = obj;
    expect(obj).to.equals(obj3);


    /*  expect(cell).to.have.text('Column content');
        expect(cell).to.have.html('Column content');
        expect(cell).to.contain('Column content');*/


    //
    cy.get('.table.table-bordered.assertion-table tr th').eq(5).then(cell =>{
        expect(cell).to.contain('3');
        expect(parseFloat(cell.text())).to.be.greaterThan(2);
    })   
    
    //3й тип перевірки - assert аналогічний до expect
})