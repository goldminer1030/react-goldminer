import app from './app'

app.set('port', process.env.PORT || 3000)
    .listen(
        app.get('port'),
        () => console.log(`Moon Highway website running on port ':${app.get('port')}' in ${process.env.NODE_ENV} mode`)
    )
