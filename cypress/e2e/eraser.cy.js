describe('Eraser tool test', () => {
  it('passes', () => {
    cy.visit('index.html')

	cy.get('#pencilTool').click({ force: true });
	cy.get('#defaultCanvas')
		.trigger('mousedown', 250, 250, { eventConstructor: 'MouseEvent', force: true})
		.trigger('mousemove', 300, 300, { eventConstructor: 'MouseEvent', force: true })
		.trigger('mousemove', 200, 300, { eventConstructor: 'MouseEvent', force: true })
		.trigger('mousemove', 250, 250, { eventConstructor: 'MouseEvent', force: true})
		.trigger('mouseup', { eventConstructor: 'MouseEvent', force: true });
	
	cy.get('#eraserTool').click({ force: true });
	cy.get('#defaultCanvas')
		.trigger('mousedown', 250, 250, { eventConstructor: 'MouseEvent', force: true})
		.trigger('mousemove', 300, 300, { eventConstructor: 'MouseEvent', force: true })
		.trigger('mouseup', { eventConstructor: 'MouseEvent', force: true })
		.screenshot({overwrite: true});

  })
})