"use client"
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function NextuiProvider({children}: Props) {
  return (
    <NextUIProvider>{children}</NextUIProvider>
  )
}

export default NextuiProvider