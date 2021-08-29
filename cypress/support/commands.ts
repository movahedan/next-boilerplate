// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="Cypress" />
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Chainable<Subject = any> {
		find(arg0: string): globalThis.Cypress.CanReturnChainable;
		getEl<E extends Node = HTMLElement>(
			identifier: string
		): Chainable<JQuery<E>>;
	}
}

Cypress.Commands.add(
	'getEl',
	{ prevSubject: 'optional' },
	(subject: Cypress.Chainable, identifier: string) => {
		if (subject) {
			return subject.find(`[data-id="${identifier}"]`);
		} else {
			return cy.get(`[data-id="${identifier}"]`);
		}
	}
);

Cypress.Commands.add('hasElement', (element, callback, failCallback) => {
	if (Cypress.$(`*[data-id="${element}"]`).length > 0) {
		callback();
	} else {
		failCallback();
	}
});
