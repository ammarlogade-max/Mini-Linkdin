import { createContext, useContext, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

const SocketContext = createContext<Socket | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:4000')
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  return useContext(SocketContext)
}