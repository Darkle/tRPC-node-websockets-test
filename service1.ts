import * as trpc from '@trpc/server'
import { createHTTPServer } from '@trpc/server/adapters/standalone'
import ws from 'ws'
import { applyWSSHandler } from '@trpc/server/adapters/ws'

const apiRPC = trpc.router().subscription('randomNumber', {
  resolve() {
    return new trpc.Subscription<{ randomNumber: number }>(emit => {
      const timer = setInterval(() => {
        // emits a number every second
        emit.data({ randomNumber: Math.random() })
      }, 200)

      return () => {
        clearInterval(timer)
      }
    })
  },
})

const { server } = createHTTPServer({
  router: apiRPC,
  createContext() {
    return null
  },
})

const wss = new ws.Server({ server })

applyWSSHandler<ApiRPC>({
  wss,
  router: apiRPC,
  createContext() {
    return {}
  },
})

server.listen(3000)

type ApiRPC = typeof apiRPC

export { ApiRPC }
