import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// redux
import { useSelector, useStore } from 'react-redux'
import { top250 } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'
import Loading from '@/components/Ui/Loading'

import { DESCRIBE, KEYWORDS, DESCRIPTION } from 'Config'

import './style.scss'

export default Shell(function() {
  const info = useSelector(state => getList(state, 'top250'))
  const store = useStore()

  useEffect(() => {
    const _top250 = () => top250()(store.dispatch, store.getState)
    const res = info.data || {}
    if ((res.subjects || []).length === 0) _top250()
    ArriveFooter.add('index', _top250)
    return () => {
      ArriveFooter.remove('index')
    }
  }, [info.data, store.dispatch, store.getState])

  const { loading, data = {} } = info || {}
  const { title, subjects = [], total } = data

  return (
    <div className="wp mt20">
      <Meta title={`${title} - ${DESCRIBE}`}>
        <meta name="keywords" content={KEYWORDS} />
        <meta name="description" content={DESCRIPTION} />
      </Meta>
      <h1>{title}</h1>
      <ul styleName="list">
        {subjects.map(item => (
          <Link key={item.id} to={`/detail/${item.id}`}>
            <li>
              <img src={item.images.large} />
              <h4>{item.title}</h4>
            </li>
          </Link>
        ))}
      </ul>
      {loading ? <Loading /> : null}
    </div>
  )
})
