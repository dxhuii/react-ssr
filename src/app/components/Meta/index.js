import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import MetaTags, { ReactTitle } from 'react-meta-tags'

import { NAME } from 'Config'

export default function Meta(props) {
  const { title, url } = props
  let _title = ''
  _title += title || NAME
  if (title) url ? title : (_title += ` - ${NAME}`)

  return (
    <Fragment>
      <ReactTitle title={_title} />
      {props.children ? <MetaTags>{props.children}</MetaTags> : null}
    </Fragment>
  )
}

Meta.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  url: PropTypes.string
}
