describe('Dot drawing test', () => {
  it('passes', () => {
    cy.visit('public/index.html')
	
	cy.get('#pencilTool').click({ force: true });
	cy.get('#defaultCanvas')
		.trigger('mousedown', { eventConstructor: 'MouseEvent', force: true})
		.trigger('mousemove', { eventConstructor: 'MouseEvent', force: true })
		.trigger('mouseup', { eventConstructor: 'MouseEvent', force: true })
		.screenshot({overwrite: true});

  })
})