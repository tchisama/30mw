import {create} from "zustand";




type LanguageState = {
  languages: {
    [lang: string]: {
      [key: string]: string
    }
  }
  setLanguages: (languages: {
    [lang: string]: {
      [key: string]: string
    }
  }) => void
}



const useLanguages = create<LanguageState>((set) => ({
  languages: {},
  setLanguages: (languages: {
    [lang: string]: {
      [key: string]: string
    }
  }) => set({languages}),
}));


export default useLanguages