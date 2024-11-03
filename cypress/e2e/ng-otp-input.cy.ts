describe('ng-otp-input', () => {
  it('should render otp', () => {
    cy.visit('/')
    cy.get('ng-otp-input').find('input').first().focus().type('12345')
  })
})
