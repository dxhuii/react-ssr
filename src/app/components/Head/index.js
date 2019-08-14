import React from 'react'
import { NavLink } from 'react-router-dom'
import { NAME } from 'Config'

import './style.scss'

export default function() {
  return (
    <header>
      <NavLink styleName="logo" exact to="/" title={NAME} />
      <nav>
        <div styleName="header-nav">
          <NavLink exact to="/">
            首页
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
