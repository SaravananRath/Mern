const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const { buildSchema } = require('graphql')
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

class User {
    constructor(user) {
        Object.assign(this, user)
    }
    messages() {
        return db.messages.filter(msg => msg.userId === this.id)
    }

}

const schema = buildSchema(`
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
`)
const rootValue = {
    users: () => db.users.map(user=> new User(user)),
    messages: () => db.messages,
    addUser: ({ email, name }) => {
        const user = {
            id: crypto.randomBytes(10).toString('hex'),
            email,
            name
        }
        db.users.push(user)
        return user
    },
    user: ({ id }) => db.users.find(user => user.id === id)
}

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(3000, () => console.log('Listening on port 3000'))