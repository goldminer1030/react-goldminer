import fetch from 'isomorphic-fetch'
var host = (process.env.NODE_ENV === "production") ?
    "https://www.moonhighway.com" : (process.env.NODE_ENV === "staging") ?
        "http://staging-moonhighway.herokuapp.com" :
        "http://localhost:3000"

const allLifts = (_, { status }) => {
    var uri = `${host}/class/api/snowtooth`
    if (status) {
        uri += `/lifts/status/${status}`
    } else {
        uri += `/lifts`
    }
    return fetch(uri).then(r=>r.json())
}

const allTrails = (_, { difficulty, status }) => {
    var uri = `${host}/class/api/snowtooth`
    if (difficulty) {
        uri += `/trails/difficulty/${difficulty}`
    } else if (status) {
        uri += `/trails/status/${status}`
    } else {
        uri += `/trails`
    }
    return fetch(uri).then(r=>r.json())
}

const lift = (_, { name }) => {
    var uri = `${host}/class/api/snowtooth`
    if (name) {
        uri += `/lifts/${name}`
    }
    return fetch(uri).then(r=>r.json()).then(lifts => lifts[0])
}

const trail = (_, { name }) => {
    var uri = `${host}/class/api/snowtooth`
    if (name) {
        uri += `/trails/${name}`
    }
    return fetch(uri).then(r=>r.json())
}

export { allLifts, allTrails, lift, trail }
