import React from 'react'
import Loadable from 'react-loadable'

import Head from '@/components/Head'
import Footer from '@/components/Footer'
import Loading from '@/components/Ui/Loading'

import HomeLoadData from '@/pages/home/load-data'

const exact = true
const base = { exact, footer: Footer }
const loading = () => <Loading />

export default [
  {
    path: '/',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/home'),
      loading
    }),
    loadData: HomeLoadData,
    enter: 'everybody'
  },

  {
    path: '/:id',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/home'),
      loading
    }),
    loadData: HomeLoadData,
    enter: 'everybody'
  },

  {
    path: '**',
    footer: Footer,
    body: Loadable({
      loader: () => import('@/pages/not-found'),
      loading
    }),
    enter: 'everybody'
  }
]
