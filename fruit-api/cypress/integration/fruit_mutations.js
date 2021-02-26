import { mutations } from '../../src/store/fruits'

describe('Delete a known fruit', () => {
  const { DELETE_FRUIT } = mutations
  it('Has one less fruit', () => {
    const state = { fruits: [{ id: 0 }, { id: 1 }] }
    DELETE_FRUIT(state, 1)
    
    expect(state.fruits).to.have.lengthOf(1)
  })
})

describe('Delete unkown fruit', () => {
  const { DELETE_FRUIT } = mutations
  it('State is unchanged', () => {
    const state = { fruits: [{ id: 0 }, { id: 1 }] }
    DELETE_FRUIT(state, 3)

    expect(state.fruits).to.have.lengthOf(2)
  })
})

describe('Add a fruit', () => {
  const { ADD_FRUIT } = mutations
  it('Has one more fruit', () => {
    const state = { fruits: [{ id: 0 }, { id: 1 }] }
    ADD_FRUIT(state, {
      id: 3,
    })
    
    expect(state.fruits).to.have.lengthOf(3)
  })
})

describe('Add an existing fruit', () => {
  const { ADD_FRUIT } = mutations
  it('Retains the same number of fruits', () => {
    const state = { fruits: [{ id: 0 }, { id: 1 }] }
    ADD_FRUIT(state, {
      id: 1,
    })

    expect(state.fruits).to.have.lengthOf(2)
  })
})

describe('Init fruit list', () => {
  const { SAVE_FRUITS } = mutations
  it('Has the number of given fruits', () => {
    const state = { fruits: [] }
    SAVE_FRUITS(state, [{ id: 3 }, { id: 4 }])
    
    expect(state.fruits).to.have.lengthOf(2)
  })
})

