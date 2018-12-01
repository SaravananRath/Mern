const { graphql, buildSchema } = require('graphql')

const db = {
    users: [
        {id:1,name:'Saravanan',email:'sar@gam.com'},
        {id:2,name:'Deepak',email:'max@gam.com'}
    ]
}
const schema = buildSchema(`
    type Query{
        users:[User!]!
    }
    type User{
        id:ID!,
        name:String,
        email:String!
    }
`)
const rootValue = {
    users: () => db.users
}
graphql(schema,
    `{
        users{name,id,email}
    }`,
    rootValue).then(res=>console.dir(res,{depth:null}))