describe('Canvas reset test', () => {
    it('passes', () => {
      cy.visit('public/index.html')
      
      cy.get('#pencilTool').click({ force: true });
      cy.get('#defaultCanvas')
          .trigger('mousedown', 500, 200, { eventConstructor: 'MouseEvent', force: true})
          .trigger('mousemove', 200, 200, { eventConstructor: 'MouseEvent', force: true })
          .trigger('mousemove', 350, 400, { eventConstructor: 'MouseEvent', force: true })
          .trigger('mouseup', 500, 200, { eventConstructor: 'MouseEvent', force: true })

      if(cy.get('#resetTool').should('be.disabled'))
        {
            cy.get('#resetLock').click({ force: true });
            cy.get('#resetTool').click({ force: true });
            cy.get('#resetTool').should('be.disabled');
        }
      else
        {
            throw new Error('Button should not be availlable yet.');
        }
  
    })
  })