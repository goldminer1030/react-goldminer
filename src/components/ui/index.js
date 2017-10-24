import { PropTypes, Component } from 'react'
import MdEject from 'react-icons/lib/md/eject'
import GithubIcon from 'react-icons/lib/go/mark-github'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import FacebookIcon from 'react-icons/lib/fa/facebook'
import LinkedInIcon from 'react-icons/lib/fa/linkedin-square'
import DownTriangle from 'react-icons/lib/go/triangle-down'
import RightArrow from 'react-icons/lib/fa/angle-right'
import Box from 'react-icons/lib/md/check-box-outline-blank'
import Check from 'react-icons/lib/md/check-box'
import { Link } from 'react-router'
import { screenLayout } from '../../lib'
import '../../stylesheets/ui.scss'

export const DownButton = ({onClick=f=>f}) =>
    <div className="down-button" onClick={onClick}>
        <div></div>
        <MdEject />
    </div>

DownButton.propTypes = {
    onClick: PropTypes.func
}

export const MoreLink = ({ to, children }) =>
  <Link className="more-link" to={to} alt="">
    {(children) ? ` ${children}` : ' more'}
    <RightArrow />
  </Link>

export const ResponsiveImg = ({landscape, portrait, ...skrollValues}) =>
    <img src={(screenLayout() === "portrait") ? portrait : landscape}
        {...skrollValues} />

ResponsiveImg.propTypes = {
    portrait: PropTypes.string.isRequired,
    landscape: PropTypes.string.isRequired
}

export const SocialIcons = ({ hide=false }) => (hide) ?
    <div className="social-icons"></div> :
    <div className="social-icons">
        <a href="https://www.facebook.com/MoonHighway" target="_blank">
            <FacebookIcon />
        </a>
        <a href="https://www.linkedin.com/company-beta/2521788/" target="_blank">
            <LinkedInIcon />
        </a>
        <a href="https://twitter.com/MoonHighway" target="_blank">
            <TwitterIcon />
        </a>
        <a href="https://github.com/MoonHighway" target="_blank">
            <GithubIcon />
        </a>
    </div>

export const Whoops404 = ({ location }) =>
    <div className="whoops-404">
        <h1>Resource Not Found...</h1>
        <p>Could not find Resource at '{location.pathname}'</p>
    </div>

export const SelectCheck = ({selected=false, select=f=>f, deselect=f=>f, children}) =>
    <div className="select-check"
         onClick={(selected) ?
           e => { e.stopPropagation(); deselect() } :
           e => { e.stopPropagation(); select() }
         }>
        {(selected) ? <Check /> : <Box />}
        <span className={(selected) ? "selected" : ""}>
            {children}
        </span>
    </div>

export class ExpandableSelectList extends Component {

    get value() {
        return this.state.selectedOptions.join(',')
    }

    set value(val) {
        if (Array.isArray(val)) {
            const selectedOptions = val.split(',')
            this.setState({selectedOptions})
        }
    }

    close() {
        if (this.state.expanded) {
            this.setState({ expanded: false })
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            expanded: props.expanded,
            selectedOptions: props.checked || []
        }
        this.toggle = this.toggle.bind(this)
        this.add = this.add.bind(this)
        this.remove = this.remove.bind(this)
    }
    toggle(e) {
        e.stopPropagation();
        const expanded = !this.state.expanded
        this.setState({expanded})
    }
    add(option) {
        if (!this.state.selectedOptions.some(sel => sel === option)) {
            const selectedOptions = [
                ...this.state.selectedOptions,
                option
            ]
            this.setState({selectedOptions})
            this.props.onChange()
        }
    }
    remove(option) {
        const selectedOptions = this.state.selectedOptions.filter(opt => opt !== option)
        this.setState({selectedOptions})
        this.props.onChange()
    }
    render() {
        const { children, options } = this.props
        const { expanded } = this.state
        return (
            <div className="expandable-select-list">
                <button type="button"
                        onClick={this.toggle}>{children} | <DownTriangle /></button>
                {(expanded) ?
                    <div className="options">
                        {options.map((opt, i) =>
                            <SelectCheck key={i}
                                         selected={this.state.selectedOptions.some(sel=>opt.toLowerCase()===sel.toLowerCase())}
                                         select={() => this.add(opt)}
                                         deselect={() => this.remove(opt)}>
                                {opt}
                            </SelectCheck>
                        )}
                    </div> : null
                }
            </div>
        )
    }
}

ExpandableSelectList.defaultProps = {
    options: [],
    checked: [],
    onChange: f=>f
}

ExpandableSelectList.propTypes = {
    options: PropTypes.array,
    checked: PropTypes.array,
    onChange: PropTypes.func
}

export const Working = () =>
  <svg width='120px' height='120px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/></rect></svg>
