import { makeExecutableSchema } from 'graphql-tools'
import schema from './schema.graphql'
import resolvers from './resolvers'

const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers
})

export default executableSchema
