import React from 'react'


export const contextoProvi = React.createContext()

export const Contexto = ({children}) => {





  return (<contextoProvi.Provider>{children}</contextoProvi.Provider>)
}
