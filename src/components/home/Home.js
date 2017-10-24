import { delaySlideScreenUp, logoOut, collapseBox, screenLayout } from '../../lib'
import { ResponsiveImg } from '../ui'
import { Link } from 'react-router'
import { MoreLink } from '../ui'

const Home = ({index, screenScale, screenHeight}) =>
    <section className="slide home"
             style={{ zIndex: 1000-index }}
        {...screenScale(delaySlideScreenUp(screenHeight))}>
        <ResponsiveImg portrait="/img/logo/logo.png"
                       landscape="/img/logo/logo-long.png"
            {...screenScale(logoOut[screenLayout()])} />
        <div className="box" {...screenScale(collapseBox[screenLayout()])}>
            <h1>Updates, Upgrades, and Patches for Your Engineers</h1>
            <p>Customized software development training for engineers of all skill levels.
                <MoreLink to="/info/about">About Moon Highway</MoreLink>
            </p>
        </div>
    </section>

export default Home
