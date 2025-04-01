describe('Dot drawing test', () => {
  it('passes', () => {
    cy.visit('index.html')
	
	cy.get('#defaultCanvas').click();
  })
})

describe('Line drawing test', () => {
  it('passes', () => {
    cy.visit('index.html')
	
	cy.get('#lineTool')
		.realMouseDown({ position: "center" })
		.realMouseMove(50, 0)
		.realMouseUp();
  })
})