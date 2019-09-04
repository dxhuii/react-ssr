import React from 'react'
import Loadable from 'react-loadable'

import Head from '@/components/Head'
import Footer from '@/components/Footer'
import Loading from '@/components/Ui/Loading'

import HomeLoadData from '@/pages/home/load-data'
import detailData from '@/pages/detail/load-data'

const exact = true
const base = { exact, head: Head, footer: Footer }
const loading = () => <Loading />

export default [
  {
    path: '/',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/home'),
      loading
    }),
    // loadData: HomeLoadData,
    enter: 'everybody'
  },

  {
    path: '/detail/:id',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/detail'),
      loading
    }),
    loadData: detailData,
    enter: 'everybody'
  },

  {
    path: '**',
    head: Head,
    footer: Footer,
    body: Loadable({
      loader: () => import('@/pages/not-found'),
      loading
    }),
    enter: 'everybody'
  }
]
