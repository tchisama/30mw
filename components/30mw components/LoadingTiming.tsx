"use client"
import React, { Children, useEffect } from 'react'

type Props = {
  children: (loading:boolean)=> React.ReactNode
}

function LoadingTiming({children}: Props) {
  const [loading, setLoading] = React.useState<boolean>(true)
  useEffect(() => {
    setTimeout(
      () => {
        setLoading(false)
      },Math.random()*200 + 500
    )
  },[])
  return (
    children(loading)
  )
}

export default LoadingTiming