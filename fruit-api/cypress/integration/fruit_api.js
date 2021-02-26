import { url } from "vuelidate/lib/validators"

const url_base = 'http://localhost:8080'


describe('Home page displays', () => {
  it('Visits the Home page', () => {
    cy.visit(url_base)

    cy.get('div.home').find('ul').find('a.root').should('have.length.gt', 0)
  })
})

describe('Add fruit page displays', () => {
  it('Visits the add a fruit page', () => {
    cy.visit(url_base + '/add_fruit')

    cy.contains('Add a fruit')
    cy.get('form').should('exist')
  })
})

describe('Fruit page displays', () => {
  it('Get first element from Home page', () => {
    cy.visit(url_base)
    
    cy.get('div.home').find('ul').find('a.root').eq(0).click()
  })
  it('Goes onto that fruit page', () => {
    cy.get('div.fruit').should('exist').contains('Price')
  })
})

describe('Adding a fruit works', () => {
  it('Visits the add a fruit page', () => {
    cy.visit(url_base + '/add_fruit')
  })
  it('Fills the form', () => {
    const form = cy.get('form')
    form.get('input[name="name"]').type('Toto')
    form.get('input[name="image"]').type('http://superimage.jpg')
    form.get('input[name="price"]').type('123')
    form.get('input[name="color"]').type('333')
    form.get('input[name="description"]').type('Such a great fruit')
    form.get('input[name="taste"]').type('Rubber')
    form.get('input[name="expires"]').type('2021-06-18')
    
  })
  it('Tries to submit the form', () => {
    cy.get('form').submit().find('.error').should('not.exist')
  })
})

describe('Adding an empty fruit fails', () => {
  it('Visits the add a fruit page', () => {
    cy.visit(url_base + '/add_fruit')
  })
  it('Submits right away', () => {
    cy.get('form').submit().find('.error').should('exist')
  })
})

describe('Deleting a fruit works', () => {
  it('Visits the Home page and delete the first one', () => {
    cy.visit(url_base)
    cy.get('div.home').find('a.root').then(elem => {
      const number_of_fruits = elem.length

      if (number_of_fruits > 0) {
        const first = cy.get('div.home').find('a.root').eq(0)
        first.find('div.delete').invoke('show').find('button').click()

        cy.get('div.home').find('a.root').should('have.length', number_of_fruits - 1)
      }
    })
  })
})
