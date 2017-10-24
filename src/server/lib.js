import express from 'express'
import favicon from 'serve-favicon'
import fs from 'fs'
import gmail from 'gmail-send'

const htmlIndex = fs.readFileSync('build/client/index.html')

export const icon = favicon('build/client/favicon.ico')

export const fileAssets = express.static('build/client')

let sendMail = (obj, cb=f=>f) => cb(new Error('SMTP Server error'))

if (process.env.emailFrom && process.env.emailTo && process.env.emailPassword ) {
    sendMail = gmail({
        user: process.env.emailFrom,
        pass: process.env.emailPassword,
        to: process.env.emailTo,
        subject: 'new website contact'
    })
    console.log(`SMTP initialized. Emails will be sent from ${process.env.emailFrom} to ${process.env.emailTo}`)
} else {
    console.log('SMTP NOT INITIALIZED!!! Contact Us is currently not working')
}

const draftAdminEmail = ({email, subjects, message}) => `
<pre>${message}</pre>
<h2>Contact Us Message</h2>
<h3>From: <a href="mailto:${email}">${email}</a></h3>
<h3>Subjects: ${subjects}</h3>
`.trim()

export const sendContactMail = (req, res) =>
    sendMail(
        { html: draftAdminEmail(req.body) },
        (err, response) => (err) ?
            res.json({success: false, err}) :
            res.json({success: true, response})
    )

export const success = (req, res) =>
    res.status(200).set('Content-Type', 'text/html').send(htmlIndex)

export const notFound = (req, res, next) => {
    let err = new Error('Content Not Found')
    err.status = 404
    next(err)
}

export const error = (error, req, res, next) =>
    res.status(error.status || 500).json(error)
