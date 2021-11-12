/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import cardService from './services/cards'
//import loginService from './services/login';
import CardForm from './components/CardForm';
import LoginForm from './components/LoginForm';

const ShowAll = (props) => {
  const handleClick = () => {
    props.setNewFilter('')
  }
  return (
    <div>
      <button onClick={handleClick}>Show All</button>
    </div>
  )
}

const Filter = (props) => {
  const years = props.cards.map(c => c.year)
  return (
    <div>
      <label htmlFor="year">Choose a year:</label>
      <select name="years" id="years" value={props.newFilter} onChange={props.handleFilterChange}>
        {years.map(year =>
          <option key={year} value={year}>{year}</option>
        )}
      </select>
    </div>
  )
}

const Cards = (props) => {
  return (
    <div>
      <div> year {props.year}</div>
      <div> data {props.data}</div>
    </div>
  )
}

const App = () => {
  const [cards, setCards] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      cardService.setToken(user.token)
      cardService.getAll().then(cards => 
        setCards(cards)
      )
    }
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const addCard = async (cardObject) => {
    const newCard = await cardService.create(cardObject)
    setCards(cards.concat(newCard))
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <LoginForm setCards={setCards} setUser={setUser}/>
    </div>
  )

  const cardForm = () => (
    <div>
      <CardForm createCard={addCard} />
    </div>
  )

  

  var filtered = cards.filter(card => card.year.includes(newFilter))

  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} cards={cards}/>
        <ShowAll setNewFilter={setNewFilter}/>
        <p> 
          {user.name} is logged in
          <button onClick={handleLogout}>Logout</button>
        </p>
        {cardForm()}
        {filtered.map(card => 
          <Cards 
          key={card.year}
          year={card.year}
          data={card.description}
          />
          )}
      </div>
    )
  }
}

export default App;
