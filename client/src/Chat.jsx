import React, { useState } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  useSubscription,
  gql,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { Container, Row, Col, FormInput, Button } from 'shards-react'

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  },
})

const client = new ApolloClient({
  link: wsLink,
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

const GET_MESSAGES = gql`
  subscription {
    messages {
      user
      content
    }
  }
`

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`

const Messages = ({ user }) => {
  const { data, loading, error } = useSubscription(GET_MESSAGES)
  return (
    <>
      {!loading &&
        data?.messages?.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: user === msg.user ? 'flex-end' : 'flex-start',
              paddingBottom: '1em',
            }}
          >
            {user !== msg.user && (
              <div
                style={{
                  height: 50,
                  width: 50,
                  marginRight: '0.5em',
                  border: '2px solid #e5e6ea',
                  borderRadius: '50%',
                  textAlign: 'center',
                  fontSize: '18pt',
                  paddingTop: 5,
                }}
              >
                {msg.user.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div
              style={{
                background: user === msg.user ? '#58bf56' : '#e5e6ea',
                color: user === msg.user ? '#fff' : '#222',
                padding: '1em',
                borderRadius: '1em',
                maxWidth: '60%',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
    </>
  )
}

const Chat = () => {
  const [user, setUser] = useState('Jack')
  const [content, setContent] = useState('')
  const [postMessage] = useMutation(POST_MESSAGE)

  const handleSend = () => {
    if (content.length > 0) {
      postMessage({
        variables: { user, content },
      })
    }
    setContent('')
  }

  return (
    <Container>
      <Messages user={user} />
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label="User"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
        </Col>
        <Col xs={8}>
          <FormInput
            label="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            onKeyUp={e => {
              if (e.keyCode === 13) handleSend()
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button onClick={handleSend}>Send</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)
