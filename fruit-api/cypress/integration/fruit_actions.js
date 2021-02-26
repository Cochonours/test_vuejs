
const url_base = 'http://localhost:8080'

var DUMMY1 = null
var DUMMY2 = null

before (() => {
  cy.fixture('dummy_fruit.json').then($dummy => DUMMY1 = $dummy);
  cy.fixture('dummy_fruit2.json').then($dummy => DUMMY2 = $dummy);
})


describe('Store actions', () => {
  const getStore = () => cy.window().its('app.$store')
  
  beforeEach(() => {
    // Intercept call to API's /fruit as its results are random
    // No need to intercept the rest as we are not testing the REST API here.
    cy.intercept('GET', '/fruit', { fixture: 'dummy_get.json' })
    cy.visit(url_base)
  })

  it('has a fruits properties', () => {
    getStore().its('state').should('have.keys', ['fruits'])
  })

  it('Populates the fruits correctly', () => {
    getStore().then(store => {
      store.dispatch('load_fruits')
    })
    getStore().its('state.fruits').should('deep.equal', [DUMMY1])
  })

  it('Adds a fruit', () => {
    getStore().then(store => {
      store.dispatch('post_new_fruit', DUMMY2)
    })

    getStore().its('state.fruits').should('deep.equal', [DUMMY1, DUMMY2])
  })

  it('Removes a fruit', () => {
    getStore().then(store => {
      store.dispatch('delete_fruit', DUMMY2.id)
    })

    getStore().its('state.fruits').should('deep.equal', [DUMMY1])
  })
})
