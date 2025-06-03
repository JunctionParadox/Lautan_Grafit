describe('Pencil size test', () => {
    it('passes', () => {
        cy.visit('public/index.html')

        cy.get('#defaultCanvas')
            .trigger('mousedown', 300, 200, { eventConstructor: 'MouseEvent', force: true})
		    .trigger('mousemove', 100, 200, { eventConstructor: 'MouseEvent', force: true })
		    .trigger('mousemove', 200, 400, { eventConstructor: 'MouseEvent', force: true })
		    .trigger('mouseup', 300, 200, { eventConstructor: 'MouseEvent', force: true })
		    .screenshot({overwrite: true});

        cy.get('#pencilSize').invoke('val', 35).trigger('input');

        cy.get('#defaultCanvas')
            .trigger('mousedown', 600, 200, { eventConstructor: 'MouseEvent', force: true})
		    .trigger('mousemove', 400, 200, { eventConstructor: 'MouseEvent', force: true })
		    .trigger('mousemove', 500, 400, { eventConstructor: 'MouseEvent', force: true })
		    .trigger('mouseup', 600, 200, { eventConstructor: 'MouseEvent', force: true })
		    .screenshot({overwrite: true});
    })
})