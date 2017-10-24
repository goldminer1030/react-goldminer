import fetch from 'isomorphic-fetch'
var host = (process.env.NODE_ENV === "production") ?
    "https://www.moonhighway.com" : (process.env.NODE_ENV === "staging") ?
        "http://staging-moonhighway.herokuapp.com" :
        "http://localhost:3000"

const setLiftStatus = (_, { name, status}) => {
    return fetch(`${host}/class/api/snowtooth/lifts/${name}`, {
        method: 'PUT',
        body: JSON.stringify({status}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
      .catch(console.error)
}

const setTrailStatus = (_, { name, status }) => {
    return fetch(`${host}/class/api/snowtooth/trails/${name}`, {
        method: 'PUT',
        body: JSON.stringify({status}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
      .catch(console.error)
}

export { setLiftStatus, setTrailStatus }
