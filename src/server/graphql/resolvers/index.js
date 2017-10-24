import { allLifts, allTrails, lift, trail } from './queries'
import { setLiftStatus, setTrailStatus } from './mutations'

const resolvers = {
    Query: {
        allLifts,
        allTrails,
        lift,
        trail
    },
    Mutation: {
        setLiftStatus,
        setTrailStatus
    }
}

export default resolvers
