import C from '../../config.json'
import { Component } from 'react'
import { SocialIcons, ExpandableSelectList, Working } from '../ui'
import { screenLayout } from '../../lib'
import fetch from 'isomorphic-fetch'
import '../../stylesheets/contact.scss'

let wait
const throttle = (fn, delay) => () => {
    clearTimeout(wait)
    wait = setTimeout(fn, delay)
}

export const expandBox = {
    portrait: {
        '-30%': {
            height: '0%',
            left: '-105px'
        },
        '-15%': {
            height: '0%',
            left: '5%'
        },
        '0%': {
            left: '5%',
            height: '75%'
        }
    },
    landscape: {
        '-30%': {
            height: '0%',
            left: '-105px'
        },
        '-15%': {
            height: '0%',
            left: '5%'
        },
        '0%': {
            left: '5%',
            height: '94%'
        }
    }
}

class Contact extends Component {

    constructor(props) {
        super(props)
        let savedState
        if (window.sessionStorage && window.sessionStorage.contactMessageState) {
            savedState = JSON.parse(sessionStorage.contactMessageState)
        }
        this.state = {
            sent: false,
            sending: false,
            error: false,
            message: "",
            email: "",
            subjects: [],
            ...savedState
        }
        this.clickOutside = this.clickOutside.bind(this)
        this.submit = this.submit.bind(this)
        this.save = throttle(() => {
            if (window.sessionStorage) {
                sessionStorage.contactMessageState = JSON.stringify({
                    email: this.refs._email.value,
                    message: this.refs._message.value,
                    subjects: this.refs._subjects.value.split(',')
                })
            }
        }, 500)
    }

    clickOutside() {
        this.refs._subjects.close()
    }

    submit() {
        const { _email, _subjects, _message } = this.refs
        this.setState({ sending: true })
        fetch(
          '/contact/send',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: _email.value,
                    subjects: _subjects.value,
                    message: _message.value
                })
            })
            .then((resp) => {
                if (resp.ok) {
                    this.setState({ sending: false, sent: true })
                } else {
                    this.setState({ sending: false, error: true, sent: false })
                    console.error(resp)
                }
                this.clear()
            }).catch(e => {
                this.setState({ error: true, sending: false, sent: false })
                console.error(e)
                this.clear()
            })
    }

    clear() {
        if (window.sessionStorage) {
            sessionStorage.clear()
        }
    }

    render() {
        const { sent, sending, message, email, error, subjects } = this.state
        const {index, screenScale} = this.props
        return (
            <section className="slide contact"
                     style={{ zIndex: 1000-index }}
                {...screenScale({'0%': {top: '0px'}})}
                     onClick={this.clickOutside}>
                <div className="box" {...screenScale(expandBox[screenLayout()])}>
                    <h1>Contact Us</h1>
                    <SocialIcons />
                    <p>
                        <a href="mailto:info@moonhighway.com">info@moonhighway.com</a>
                        <a href="tel:5305233084">530.523.3084</a>
                        <span>PO BOX 1578, Tahoe City, CA 96145</span>
                    </p>
                    {(!sent && !sending && !error) ? (
                      <form action="javascript:void(0)" onSubmit={this.submit}>
                          <p>What are you interested in learning?</p>
                          <ExpandableSelectList ref="_subjects"
                                                checked={subjects}
                                                onChange={this.save}
                                                options={C.contact.subjects}>
                              Choose all that apply
                          </ExpandableSelectList>
                          <input ref="_email" type="email" placeholder="email" defaultValue={email} onBlur={this.save} required/>
                          <textarea ref="_message" defaultValue={message} onChange={this.save} placeholder="Other thoughts or topics of interest?"/>
                          <button onClick={e=>e.stopPropagation()}>SEND</button>
                      </form>
                    ) : (
                      <div className="sent">
                        {(sending) ? (
                          <div className="working">
                            <Working />
                          </div>
                        ) : (error) ? (
                          <div>
                          <h3>Whoops... Something went wrong.</h3>
                          <div>
                            We are having issues sending your request. Please send us an email at <a href="mailto:info@moonhighway.com">info@moonhighway.com</a>. We apologize for the inconvience.
                          </div>
                          </div>
                        ) : (
                          <div>
                          <h3>Message Sent...</h3>
                          <div>Thank you. We will be in touch soon!</div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
            </section>
        )
    }
}

export default Contact
