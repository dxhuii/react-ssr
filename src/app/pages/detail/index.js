import React, { useEffect } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'

// redux
import { useSelector, useStore } from 'react-redux'
import { typeInfo } from '@/store/actions/info'
import { getInfo } from '@/store/reducers/info'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'
import Loading from '@/components/Ui/Loading'

import './style.scss'

export default Shell(function() {
  const { match } = useReactRouter()
  const { id } = match.params || {}

  console.log(useReactRouter(), 'useReactRouter()')

  const info = useSelector(state => getInfo(state, id))

  const store = useStore()

  useEffect(() => {
    const getData = args => typeInfo(args)(store.dispatch, store.getState)
    // 如果已经存在 info，说明redux已经存在该帖子数据，则可以不重新请求
    if (!info || !info.data) {
      getData({
        id
      })
    }
  }, [id, info, store.dispatch, store.getState])

  const { loading, data = {} } = info || {}

  if (loading) {
    return <Loading />
  }

  const { title, images = {}, photos = [] } = data
  return (
    <>
      <Meta title={title} />
      <div styleName="detail">
        <h1>{title}</h1>
        <div>
          <img src={images.large} />
        </div>
        <ul styleName="subImg">
          {photos.map(item => (
            <li key={item.id}>
              <img src={item.thumb} />
            </li>
          ))}
        </ul>
      </div>
      <Link to="/">返回首页</Link>
    </>
  )
})
