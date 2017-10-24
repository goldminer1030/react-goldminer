import { Component, Children, cloneElement } from 'react'
import { hashHistory, browserHistory } from 'react-router'
import skrollr from 'skrollr'
import Hammer from 'hammerjs'
import { DownButton } from '../ui'
import { isMobile } from '../../lib'
import { compose } from 'redux'
import '../../stylesheets/relax.scss'

/**
 * Durations for animations to other screens
 * @type {number}
 */
const duration = 1000

/**
 * How many times to multiply screen height by to get scroll height
 * @type {number}
 */
const scrollHeightSize = 2

/**
 * Calculates the default screenheight from breakpoints
 * @param breakpoints
 */
const screenHeight = breakpoints => breakpoints[1] - breakpoints[0]

/**
 * Returns a scale function that can be used to convert a string percentage
 * and current breakpoint index into a scroll pixle value.
 * @param breakpoints (array) The current screen breakpoints
 */
export const skrollScale = breakpoints => (p = '0%', currentBreakpoint = 0) => {
    p = p.replace('%', '')
    p = parseFloat(p / 100)
    let h = p * screenHeight(breakpoints)
    h = Math.round(h + breakpoints[currentBreakpoint])
    return (h <= breakpoints[breakpoints.length - 1]) ? h : breakpoints[breakpoints.length - 1]
}

export const simpleSkrollScale = max => (p = '0%') => {
    p = p.replace('%', '')
    p = parseFloat(p / 100)
    return Math.round(p * max)
}

/**
 * Converts camel case text to train case text (JS to CSS)
 * @param text
 */
const camelToTrain = text => text.replace(/([A-Z])/g, "-$1").toLowerCase()

/**
 * Converts a JavaScript style object into a CSS String
 * @param o
 */
export const jsObjToCSSString = (o = {}) =>
    Object.keys(o)
        .map(key => ({key, value: o[key]}))
        .map(({key, value}) =>
            ({
                key: camelToTrain(key),
                value
            })
        )
        .reduce((css, {key, value}) => `${css} ${key}: ${value}; `.trim(), '')

/**
 * A function that converts a JavaScript animation object into
 * Skrollr properties given specific screen breakpoings
 * @param bp
 * @param index
 * @returns {Function}
 */
export const skrollrAttributes = (bp, index) => {

    const scale = (Array.isArray(bp)) ?
        skrollScale(bp) :
        simpleSkrollScale(bp)

    return (config = {}) =>
        Object.keys(config)
            .map(percent => ({
                key: `data-${scale(percent, index)}`,
                css: config[percent]
            }))
            .reduce((skrollProps,
                    { key, css }, i) =>
                    ({...skrollProps, [key]: jsObjToCSSString(css)}),
                {}
            )
}

/**
 * A component that wraps screens, handles navigation, handles skrollr, magic...
 */
export class Rellax extends Component {

    constructor(props) {
        super(props)
        this.state = {
            screen: {
                height: window.innerHeight,
                scrollHeight: window.innerHeight * scrollHeightSize,
                width: window.innerWidth
            },
            current: {
                screenIndex: 0,
                breakpoint: 0
            }
        }
        this.scrollScreen = this.scrollScreen.bind(this)
        this.nextScreen = this.nextScreen.bind(this)
        this.prevScreen = this.prevScreen.bind(this)
        this.getBreakpoints = this.getBreakpoints.bind(this)
        this.onResize = this.onResize.bind(this)
        this.goToScreen = this.goToScreen.bind(this)
        this.onWheel = this.onWheel.bind(this)
        this.onArrowKeys = this.onArrowKeys.bind(this)
    }

    scrollScreen(el, index) {
        const { screen } = this.state
        const scrollRange = [screen.scrollHeight * index, screen.scrollHeight * (index + 1)]
        const screenHeight = screen.height
        const breakpoints = this.getBreakpoints()
        const maxHeight = breakpoints[breakpoints.length - 1] + screen.scrollHeight
        const screenScale = skrollrAttributes(breakpoints, index)
        const fullScale = skrollrAttributes(maxHeight)

        if (el.props.route) {
            this.routes = {
                ...this.routes,
                [el.props.route]: index
            }
            this.paths = {
                ...this.paths,
                [index]: el.props.route
            }
        }

        return cloneElement(el, {
            index,
            scrollRange,
            screenHeight,
            breakpoints,
            screenScale,
            fullScale
        })
    }

    getBreakpoints() {
        const { children } = this.props
        const { screen } = this.state
        return Children.map(children, (child, i) => i * screen.scrollHeight)
    }

    nextScreen() {
        if (!this.state.current.transitioning) {
            const { current } = this.state
            const { children } = this.props
            const screenIndex = ((current.screenIndex + 1) < children.length ) ?
            current.screenIndex + 1 :
                current.screenIndex
            const breakpoint = this.state.breakpoints[screenIndex]
            if (screenIndex !== current.screenIndex) {
                this.setState({current: {breakpoint, screenIndex, transitioning: true}})
                if (process.env.NODE_ENV === 'development' && window.location.origin.match(/http:\/\/localhost:3333/)) {
                    console.warn('navigating with hashHistory')
                    hashHistory.push(this.paths[screenIndex])
                } else {
                    browserHistory.push(this.paths[screenIndex])
                }

            }
        }
    }

    prevScreen() {
        if (!this.state.current.transitioning) {
            const { current } = this.state
            const screenIndex = (current.screenIndex) ?
            current.screenIndex - 1 : 0
            const breakpoint = this.state.breakpoints[screenIndex]
            if (screenIndex !== current.screenIndex) {
                this.setState({current: {breakpoint, screenIndex, transitioning: true}})
                if (process.env.NODE_ENV === 'development' && window.location.origin.match(/http:\/\/localhost:3333/)) {
                    console.warn('navigating with hashHistory')
                    hashHistory.push(this.paths[screenIndex])
                } else {
                    browserHistory.push(this.paths[screenIndex])
                }
            }
        }
    }

    goToScreen(index, duration = 1) {
        this.skr.animateTo(this.state.breakpoints[index], {
            duration,
            easing: 'swing',
            done: () => this.setState({
                current: {
                    ...this.state.current,
                    transitioning: false
                }
            })
        })
    }

    onResize() {
        clearTimeout(this.to)
        document.getElementById('react-container').innerHTML = ''
        this.to = setTimeout(() => location.reload(), 500)
    }

    onWheel(e) {
        if (this.webkitWheelTimeout) {
            clearTimeout(this.webkitWheelTimeout)
        }
        this.webkitWheelTimeout = setTimeout(
            () => (e.deltaY > 0) ?
                this.nextScreen() :
                this.prevScreen(),
            50
        )
    }

    onArrowKeys(e) {
        switch(e.key) {
            case " " :
                return this.nextScreen()
            case "ArrowDown" :
                return this.nextScreen()
            case "ArrowRight" :
                return this.nextScreen()
            case "ArrowUp" :
                return this.prevScreen()
            case "ArrowLeft" :
                return this.prevScreen()
        }
    }

    componentWillMount() {
        const breakpoints = this.getBreakpoints()
        this.setState({breakpoints})
        window.addEventListener('resize', this.onResize)
        if (this.props.location.pathname === '/contact') {
            this.setState({ current: { screenIndex: 5 }})
        }
    }

    componentWillReceiveProps(nextProps) {
        const screenIndex = this.routes[nextProps.location.pathname]
        this.setState({
            current: {screenIndex}
        })
        setTimeout(() => this.goToScreen(screenIndex, 1000), 0)
    }

    componentDidMount() {

        window.autoplay = (t=10000) => {
            if (window.autoplaying) {
                clearInterval(window.autoplaying)
                return 'autoscroll function turned off'
            } else {
                window.autoplaying = setInterval(() => {
                    if (this.props.location.pathname === '/continuous-delivery') {
                        if (process.env.NODE_ENV === 'development' && window.location.origin.match(/http:\/\/localhost:3333/)) {
                            console.warn('navigating with hashHistory')
                            hashHistory.push('/')
                        } else {
                            browserHistory.push('/')
                        }
                    } else {
                        this.nextScreen()
                    }
                },t)
                return `window will autoscroll every ${t/1000} seconds - invoke autoplay() again to stop`
            }
        }

        const direction = Hammer.DIRECTION_VERTICAL
        this.skr = skrollr.init({edgeStrategy: 'set'})
        if (isMobile()) {
            this.mc = new Hammer(this.refs.root)
            this.mc.get('pan').set({direction});
            this.mc.on("panend", e =>
                (e.additionalEvent === 'pandown') ?
                    this.prevScreen() :
                    this.nextScreen()
            )
        } else {
            window.addEventListener("wheel", this.onWheel, false)
        }
        window.addEventListener("keydown", this.onArrowKeys, false)
        const screenIndex = this.routes[this.props.location.pathname] || this.state.current.screenIndex
        this.setState({current: {screenIndex}})
        setTimeout(() => this.goToScreen(screenIndex), 5)
    }

    shouldComponentUpdate(nextProps) {
        const hasNewScreen = this.props.children.length !== nextProps.children.length
        const isNewPath = this.props.location.pathname !== nextProps.location.pathname
        return hasNewScreen || isNewPath
    }

    componentWillUnmount() {
        clearTimeout(this.to)
        window.removeEventListener("wheel", this.onWheel)
        window.removeEventListener("keydown", this.onArrowKeys)
        window.removeEventListener("resize", this.onResize)
        document.body.style.height = ''
        this.skr.destroy()
    }

    componentDidUpdate() {
        this.skr.refresh()
    }

    render() {
        const { children } = this.props
        const { screenIndex } = this.state.current
        return (
            <div ref="root" className="relax-root">
                {(children.length !== screenIndex + 1) ?
                    <DownButton onClick={this.nextScreen}/> :
                    null
                }
                {Children.map(children, this.scrollScreen)}
            </div>
        )
    }

}
