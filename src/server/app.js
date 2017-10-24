import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import snowtoothRoutes from './class-api/snowtooth'
import nflRoutes from './class-api/nfl'
import usStateRoutes from './class-api/states'
import skiResorts from './class-api/ski-resorts'

import {
    success, notFound, error, fileAssets, icon, sendContactMail
} from './lib'

import graphqlHTTP from 'express-graphql'
import schema from './graphql/schema'

// TODO: Incorporate Google Analytics for API's

export default express()
    .use(icon)
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .use(cors())
    .get('/api', (req, res) =>
      res.redirect('/class/api')
    )
    .get('/class/api', (req, res) =>
      res.status(200).json({
          '/class/api/form-submit': 'GET or POST forms requests',
          '/class/api/nfl': 'GET all NFL teams',
          '(POST) /class/api/nfl': 'POST a new team {conference,division,city,team}',
          '/class/api/nfl/:conference': 'GET NFL teams by conference [AFC|NFC]',
          '/class/api/nfl/:conference/:division': 'GET NFL teams by conference and division [North|South|East|West]',
          '/class/api/states/': 'GET all US States grouped by region',
          '/class/api/states/region/:region': 'GET Stats by region [north|south|east|west|midwest]',
          '/class/api/states/:searchTerm': 'GET State names that match % searchTerm',
          '/class/api/ski-resorts': 'GET all ski resort names',
          '/class/api/ski-resorts/:searchTerm': 'GET all ski resort names that match % searchTerm',
          '/class/api/snowtooth/lifts': 'GET fake ski resort lift status',
          '/class/api/snowtooth/lifts/status/:status': 'GET fake ski resort lift by status [open|closed|hold]',
          '/class/api/snowtooth/lifts/:liftName': 'GET fake ski resort lift status for lift by liftName',
          '(PUT) /class/api/snowtooth/lifts/:liftName': 'PUT update lift status by liftName {status:"open|closed|hold"}',
          '/class/api/snowtooth/trails': 'GET fake ski resort trails with status',
          '/class/api/snowtooth/trails/status/:status': 'GET fake ski resort trails by status [open|closed]',
          '/class/api/snowtooth/trails/:trailName': 'GET fake ski resort trail status for trail by trailName',
          '(PUT) /class/api/snowtooth/trails/:trailName': 'PUT trail lift status by trailName {status:"open|closed"}',
          '/class/api/snowtooth/trails/lift/:liftName': 'GET trails that are accessed by specific lift'
      })
    )
    .use('/class/api/snowtooth', snowtoothRoutes)
    .use('/class/api/nfl', nflRoutes)
    .use('/class/api/states', usStateRoutes)
    .use('/class/api/ski-resorts', skiResorts)
    .get('/class/api/form-submit', function (req, res) {
        res.json(req.url)
    })
    .post('/class/api/form-submit', function (req, res) {
        res.json(req.body)
    })
    .post('/contact/send', sendContactMail)
    .use(fileAssets)
    .use('/class/snowtooth/graphiql', graphqlHTTP({
        schema,
        graphiql: true
    }))
    .get('*', success)
