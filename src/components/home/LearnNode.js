import { delaySlideScreenUp, logoInOut, expandCollapseBox, screenLayout } from '../../lib'
import { Link } from 'react-router'
import { MoreLink } from '../ui'

const LearnNode = ({index, screenScale, screenHeight}) =>
    <section className="slide node"
             style={{ zIndex: 1000-index }}
        {...screenScale(delaySlideScreenUp(screenHeight))}>
        <img src="/img/titles/node.png"  {...screenScale(logoInOut["portrait"])}/>
        <div className="box" {...screenScale(expandCollapseBox[screenLayout()])}>
            <h1>Universal, Test Driven Updates</h1>
            <ul>
                <li>Service-oriented Architecture</li>
                <li>NoSQL Databases</li>
                <li>Express, Socket.IO, and <MoreLink to="/info/node-training" /></li>
            </ul>
        </div>
    </section>

export default LearnNode
