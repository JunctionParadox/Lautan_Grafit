describe('Colour selection test', () => {
  it('passes', () => {
    cy.visit('index.html')

	cy.get('#colourButton').click({ force: true});;
	cy.get('#red').invoke('val', 25).trigger('input');
	cy.get('#green').invoke('val', 80).trigger('input');
	cy.get('#red').invoke('val', 120).trigger('input');
	
	cy.get('#pencilTool').click({ force: true });
	cy.get('#defaultCanvas')
		.trigger('mousedown', 500, 200, { eventConstructor: 'MouseEvent', force: true})
		.trigger('mousemove', 200, 200, { eventConstructor: 'MouseEvent', force: true })
		.trigger('mousemove', 350, 400, { eventConstructor: 'MouseEvent', force: true })
		.trigger('mouseup', 500, 200, { eventConstructor: 'MouseEvent', force: true })
		.screenshot({overwrite: true});
  })
})