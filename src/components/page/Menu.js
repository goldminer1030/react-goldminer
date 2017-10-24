import React, { Component, Children } from 'react'
import { Link } from 'react-router'
import { SocialIcons } from '../ui'
import CheeseburgerMenu from 'cheeseburger-menu'

const links = [
    <Link key={0}
          activeClassName="selected"
          to="/info/about">About Moon Highway</Link>,
    <Link key={1}
          activeClassName="selected"
          to="/info/react-training">React Training</Link>,
    <Link key={2}
          activeClassName="selected"
          to="/info/node-training">Node Training</Link>,
    <Link key={3}
          activeClassName="selected"
          to="/info/html-css-training">HTML &amp; CSS Training</Link>,
    <Link key={4}
          activeClassName="selected"
          to="/info/continuous-delivery-training">Continuous Delivery Training</Link>,
    <Link key={5}
          activeClassName="selected"
          to="/info/public-workshops">Public Workshops</Link>,
    <Link key={6}
          activeClassName="selected"
          to="/contact">Contact Us</Link>
]

export const Menu = ({collapsed=false, isOpen=false, toggleMenu=f=>f }) =>
    (collapsed) ? (
        <CheeseburgerMenu isOpen={isOpen} closeCallback={toggleMenu}>
            <nav className="mobile-menu">
                <h2>Main Menu</h2>
                <Link to="/">
                    <img src="/img/logo/logo-dark.png" alt="Moon Highway" />
                </Link>
                {Children.map(links, link => ({
                    ...link,
                    props: {
                        ...link.props,
                        onClick: toggleMenu
                    }
                }))}
            </nav>
        </CheeseburgerMenu>
    ) : (
        <div className="menu-container">
          <nav className="main-menu">
              <h2>Main Menu</h2>
              {links}
          </nav>
        </div>
    )

export const Header = ({title}) =>
    <header>
        <Link to="/">
          <img src="/img/logo/logo-sm-long.png" alt="back to Moon Highway home" />
        </Link>
        <h1>{title}</h1>
        <SocialIcons />
    </header>

export const Footer = () =>
    <footer>
        <div />
        <div className="contact">
            <span>Moon Highway, LLC</span>
            <span>PO BOX 1578</span>
            <span>Tahoe City, CA 96145</span>
            <span><a href="mailto:info@moonhighway.com">info@moonhighway.com</a></span>
            <span>(530) 523 - 3084</span>
        </div>
        <div className="links">
          {links}
        </div>
        <div>&copy; copyright 2017 Moon Highway LLC</div>
    </footer>
