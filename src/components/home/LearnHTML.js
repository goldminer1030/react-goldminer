import { delaySlideScreenUp, logoInOut, expandCollapseBox, screenLayout } from '../../lib'
import { ResponsiveImg } from '../ui'
import { Link } from 'react-router'
import { MoreLink } from '../ui'

const LearnHTML = ({index, screenScale, screenHeight}) =>
    <section className="slide html"
             style={{ zIndex: 1000-index }}
        {...screenScale(delaySlideScreenUp(screenHeight))}>
        <ResponsiveImg portrait="/img/titles/html.png"
                       landscape="/img/titles/html-long.png"
            {...screenScale(logoInOut[screenLayout()])} />
        <div className="box" {...screenScale(expandCollapseBox[screenLayout()])}>
            <h1>Responsive, Accessible Patches</h1>
            <ul>
                <li>Flexbox and Animations</li>
                <li>Data Visualizations</li>
                <li>HTML, CSS, SVG, and <MoreLink to="/info/html-css-training" /></li>
            </ul>
        </div>
    </section>

export default LearnHTML
