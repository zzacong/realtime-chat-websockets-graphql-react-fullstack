import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'
import { Container } from 'shards-react'

import './index.css'
import Chat from 'chat/Chat'

const App = () => (
  <Container>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto,
      placeat, maiores libero eum cumque suscipit, nostrum voluptatibus
      cupiditate ipsa fugit enim sit voluptas reprehenderit autem est
      doloremque? Nulla delectus ut laboriosam quo tempora nesciunt consequatur
      eos molestias voluptates error, quasi ullam dolore earum, aut magnam
      ratione numquam aperiam doloribus vel!
    </p>
    <h1>Chat!</h1>
    <Chat />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsa
      rerum praesentium sit necessitatibus doloribus blanditiis explicabo libero
      minus facilis? Voluptatum, dolore accusamus aliquid quaerat nostrum
      possimus sunt! Ex quis autem saepe nesciunt cum aspernatur, sapiente
      minima, itaque aliquid tempore quo enim quam perferendis natus! Doloribus
      voluptatum quidem quod iste?
    </p>
  </Container>
)

ReactDOM.render(<App />, document.getElementById('app'))
