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

import './style.scss'

export default Shell(function() {
  const { match } = useReactRouter()
  const { id } = match.params || {}
  const typeData = useSelector(state => getType(state))
  const infoData = useSelector(state => getInfo(state, id))
  const store = useStore()

  useEffect(() => {
    async function get() {
      const getTypeData = () => type()(store.dispatch, store.getState)
      const getInfoData = args => typeInfo(args)(store.dispatch, store.getState)
      if (!typeData || !typeData.data) {
        let [, data] = await getTypeData()
        const id = data.data[0].id
        if (!infoData || !infoData.data) {
          getInfoData({
            id
          })
        }
      } else {
        if ((!infoData || !infoData.data) && id) {
          getInfoData({
            id
          })
        }
      }
    }
    get()
  }, [typeData, typeData.data, store.dispatch, store.getState, infoData, id])

  const { loading, data = {} } = typeData || {}
  const { title, subjects = [], total } = data

  console.log(infoData)

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
