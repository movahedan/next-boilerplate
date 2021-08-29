describe('app', () => {
	beforeEach(() => cy.visit('http://localhost:3000/'));

	it('should display welcome message', () => {
		cy.get('body').contains('Message from getServerSideProps');
	});
});
