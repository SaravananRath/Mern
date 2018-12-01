const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const { buildSchema } = require('graphql')
const crypto = require('crypto')

const db = {
    users: [
        {id:1,name:'Saravanan',email:'sar@gam.com',avatarUrl:'https://www.image1.com'},
        {id:2,name:'Deepak',email:'max@gam.com',avatarUrl:'https://www.image2.com'}
    ]
}
const schema = buildSchema(`
    type Mutation{
        addUser(email:String!,name:String):User
    }
    type Query{
        users:[User!]!
    }
    type User{
        id:ID!
        name:String
        email:String!
        avatarUrl:String
    }
`)
const rootValue = {
    users: () => db.users,
    addUser: ({email,name}) => {
        const user = {
            id: crypto.randomBytes(10).toString('hex'),
            email,
            name
        }
        db.users.push(user)
        return user
    }
}

app.use('/graphql',graphqlHTTP({
    schema,
    rootValue,
    graphiql:true
}))

app.listen(3000,()=>console.log('Listening on port 3000'))