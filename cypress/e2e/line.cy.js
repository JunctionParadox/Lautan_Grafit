describe('Line drawing test', () => {
  it('passes', () => {
    cy.visit('index.html')
	
	cy.get('#lineTool').click({ force: true });
	cy.get('#defaultCanvas')
		.trigger('mousedown', 'center', { eventConstructor: 'MouseEvent', force: true})
		.trigger('mousemove', 200, 200, { eventConstructor: 'MouseEvent', force: true })
		.trigger('mouseup', 200, 200, { eventConstructor: 'MouseEvent', force: true })
		
		.trigger('mousedown', 384, 356, { eventConstructor: 'MouseEvent', force: true})
		.trigger('mousemove', 300, 300, { eventConstructor: 'MouseEvent', force: true })
		.trigger('mouseup', 200, 300, { eventConstructor: 'MouseEvent', force: true })
		.screenshot({overwrite: true});
  })
})