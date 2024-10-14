import React from 'react'
import { withAuth } from '@shared/hoc/withAuth'
import { Layout } from './Layout'

export const Container = withAuth(Layout)