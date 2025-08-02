import { createContext, useContext } from 'react'

export const DummyContext1 = createContext<number | null>(null)

export const DummyProvider1 = ({ children }: { children: React.ReactNode }) => {
  return <DummyContext1.Provider value={1}>{children}</DummyContext1.Provider>
}

export const useDummy1 = () => {
  const context = useContext(DummyContext1)
  if (!context) {
    // throw new Error('DummyContext1 is not found')
    console.log('DummyContext1 is not found')
  }
  return context
}
