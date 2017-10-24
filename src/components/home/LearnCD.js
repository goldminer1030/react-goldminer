import { delaySlideScreenUp, logoInOut, expandCollapseBox, screenLayout } from '../../lib'
import { ResponsiveImg } from '../ui'
import { Link } from 'react-router'
import { MoreLink } from '../ui'

const LearnCD = ({index, screenScale, screenHeight}) =>
    <section className="slide cd"
             style={{ zIndex: 1000-index }}
        {...screenScale(delaySlideScreenUp(screenHeight))}>
        <ResponsiveImg portrait="/img/titles/cd.png"
                       landscape="/img/titles/cd-long.png"
            {...screenScale(logoInOut[screenLayout()])} />
        <div className="box" {...screenScale(expandCollapseBox[screenLayout()])}>
            <h1>Automated, Certified Quality</h1>
            <ul>
                <li>Test-driven Development</li>
                <li>Behavior-driven Development</li>
                <li>Git, Travis, Heroku and <MoreLink to="/info/continuous-delivery-training" /></li>
            </ul>
        </div>
    </section>

export default LearnCD
