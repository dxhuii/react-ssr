import React, { useEffect } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'

// redux
import { useSelector, useStore } from 'react-redux'
import { type } from '@/store/actions/type'
import { typeInfo } from '@/store/actions/info'
import { getType } from '@/store/reducers/type'
import { getInfo } from '@/store/reducers/info'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'
import Loading from '@/components/Ui/Loading'

import { DESCRIBE, KEYWORDS, DESCRIPTION } from 'Config'

import { trim } from '@/utils'

import './style.scss'

export default Shell(function() {
  const { match } = useReactRouter()
  const { id = 1 } = match.params || {}
  const typeData = useSelector(state => getType(state))
  const infoData = useSelector(state => getInfo(state, id))
  const store = useStore()

  useEffect(() => {
    const getTypeData = () => type()(store.dispatch, store.getState)
    const getInfoData = args => typeInfo(args)(store.dispatch, store.getState)
    if (!typeData || !typeData.data) {
      getTypeData()
    }
    if ((!infoData || !infoData.data) && id) {
      getInfoData({
        id
      })
    }
    return () => {}
  }, [typeData, typeData.data, store.dispatch, store.getState, infoData, id])

  const { loading, data = [] } = infoData || {}
  const list = typeData.data || []

  const getMenuTitle = () => {
    for (let item of list) {
      if (item.id === id) {
        return item.title
      }
    }
  }

  return (
    <div styleName="content">
      <Meta title={`今日热榜 - ${DESCRIBE}`}>
        <meta name="keywords" content={KEYWORDS} />
        <meta name="description" content={DESCRIPTION} />
      </Meta>
      <div styleName="left">
        <div styleName="title">菜单</div>
        <ul styleName="menu">
          {list.map(item => (
            <li key={item.id} styleName={item.id === id ? 'cur' : ''}>
              <Link to={`/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div styleName="right">
        <div styleName="title">
          <div styleName="menu">三</div>
          <h2>{getMenuTitle()}</h2>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <ul styleName="list">
            {data.map(item => (
              <li key={item.url}>
                <a rel="noopener noreferrer" target="_blank" href={item.url}>
                  <h4>{item.title}</h4>
                  {trim(item.desc || '') ? <p>{item.desc}</p> : null}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
})
