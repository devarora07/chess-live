import { ReactNode } from 'react'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center">
      {children}
    </div>
  )
}

export default Wrapper
