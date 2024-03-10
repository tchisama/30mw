"use client"
import { db } from '@/firebase'
import useLanguages from '@/store/30mw/languages'
import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect } from 'react'

type Props = {

  children: React.ReactNode 
}

function LanguageProvider({
  children
}: Props) {

  const {setLanguages} = useLanguages()


  useEffect(()=>{

    onSnapshot(collection(db, "_30mw_languages"), (doc) => {
      let langs : any = {}
      doc.forEach((lang) => {
        langs[lang.id] = lang.data()
      })
      setLanguages(langs)
    })
  },[setLanguages])

  return (
    children
  )
}

export default LanguageProvider