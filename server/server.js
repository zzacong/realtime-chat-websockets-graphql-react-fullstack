const { ApolloServer, PubSub, gql } = require('apollo-server')

const pubsub = new PubSub()

const messages = []
const subscribers = []
const onMessagesUpdate = fn => subscribers.push(fn)

const typeDefs = gql`
  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    postMessage(user: String!, content: String!): Message!
  }

  type Subscription {
    messages: [Message!]
  }
`

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (_parent, args) => {
      const id = messages.length
      const msg = {
        id,
        user: args.user,
        content: args.content,
      }
      messages.push(msg)
      subscribers.forEach(fn => fn())
      return msg
    },
  },
  Subscription: {
    messages: {
      subscribe: () => {
        const channel = Math.random().toString(36).slice(2, 15)
        onMessagesUpdate(() => pubsub.publish(channel, { messages }))
        setTimeout(() => pubsub.publish(channel, { messages }), 0)
        return pubsub.asyncIterator(channel)
      },
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
const PORT = process.env.PORT || 4000
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
