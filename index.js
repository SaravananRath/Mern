const { ApolloServer, gql } = require('apollo-server')
const crypto = require('crypto')
const db = {
	users: [
		{ id: "1", name: 'Saravanan', email: 'sar@gam.com', avatarUrl: 'https://www.image1.com' },
		{ id: "2", name: 'Deepak', email: 'max@gam.com', avatarUrl: 'https://www.image2.com' }
	],
	messages: [
		{ id: "1", userId: "1", body: "Hello", createdAt: Date.now() },
		{ id: "2", userId: "2", body: "Hi", createdAt: Date.now() },
		{ id: "3", userId: "1", body: "What up?", createdAt: Date.now() },
	]
}

const typeDefs = gql`
    type Mutation{
        addUser(email:String!,name:String):User
    }
    type Query{
        users:[User!]!
        user(id:ID!):User
        messages:[Message!]!
    }
    type User{
        id:ID!
        name:String
        email:String!
        avatarUrl:String
        messages:[Message!]!
    }
    type Message{
        id:ID!
        userId:String
        body:String!
        createdAt:String
    }
`
const resolvers = {
	Query: {
		users: () => db.users,
		user: (root, { id }) => db.users.find(user => user.id === id),
		messages: () => db.messages
	},
	Mutation: {
		addUser: (root,{ email, name }) => {
			const user = {
				id: crypto.randomBytes(10).toString('hex'),
				email,
				name
			}
			db.users.push(user)
			return user
		}
	},
	User:{
		messages: user => db.messages.filter(message=> message.userId === user.id)
	}
}

const server = new ApolloServer({typeDefs,resolvers}) 
server.listen().then(({url})=> console.log(url))