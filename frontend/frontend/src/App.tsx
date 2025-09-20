// Wrap your app with SocketProvider
import { SocketProvider } from './context/SocketContext'

function App() {
  return (
    <SocketProvider>
      {/* Existing providers and routes */}
    </SocketProvider>
  )
}