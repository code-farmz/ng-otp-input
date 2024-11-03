import { NgOtpInputModule, NgOtpInputComponent } from 'ng-otp-input';
describe('NgOtpInputComponent', () => {
  it('should mount', () => {
    cy.mount(NgOtpInputComponent, { imports: [NgOtpInputModule] });
    cy.get('input').should('have.length', 4);
    cy.get('input').first().type('1234');
  });
});
