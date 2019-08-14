import React from 'react'
import Loadable from 'react-loadable'

import Head from '@/components/Head'
import Footer from '@/components/Footer'
import Loading from '@/components/Ui/Loading'

import HomeLoadData from '@/pages/home/load-data'
import detailData from '@/pages/detail/load-data'

export default [
  {
    path: '/',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/home'),
      loading: () => <Loading />
    }),
    loadData: HomeLoadData,
    enter: 'everybody'
  },

  {
    path: '/detail/:id',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/detail'),
      loading: () => <Loading />
    }),
    loadData: detailData,
    enter: 'everybody'
  },

  {
    path: '**',
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/not-found'),
      loading: () => <Loading />
    }),
    enter: 'everybody'
  }
]
