import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// redux
import { useStore } from 'react-redux'
import { saveScrollPosition, setScrollPosition } from '@/store/actions/scroll'
// import { addVisitHistory } from '@/store/actions/history'

// tools
import parseUrl from '@/common/parse-url'

// 壳组件，用于给页面组件，套一个外壳
// 这样可以通过壳组件，给每个页面，传递参数
export default function(Component) {
  function Shell({ history, location, match, staticContext }) {
    const [notFound, setNotFound] = useState('')

    const store = useStore()

    const { pathname, search } = location

    location.params = search ? parseUrl(search) : {}

    useEffect(() => {
      setScrollPosition(pathname + search)(store.dispatch, store.getState)
      return () => {
        saveScrollPosition(pathname + search)(store.dispatch, store.getState)
      }
    }, [pathname, search, store.dispatch, store.getState])

    if (notFound) {
      return <div style={{ height: 300, lineHeight: '300px', textAlign: 'center' }}>{notFound}</div>
    }

    return <Component match={match} setNotFound={setNotFound} />
  }

  Shell.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.object
  }

  return Shell
}
