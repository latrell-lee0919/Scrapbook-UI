import React, {useState} from 'react' 
import loginService from '../services/login';
import cardService from '../services/cards'

const LoginForm = ({ setCards, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
      event.preventDefault()
  
      try {
        const user = await loginService.login({
          username, password
        })
        window.localStorage.setItem(
          'loggedInUser', JSON.stringify(user)
        )
        cardService.setToken(user.token)
        const cards = await cardService.getAll()
        setCards(cards)
        setUser(user)
      } catch (exception) {
        console.log(exception)
      }
    }

    return (
    <div>
      <h2>Log in to use</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
    )
}

export default LoginForm