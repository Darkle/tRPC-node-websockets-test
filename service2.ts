import { createTRPCClient } from '@trpc/client'
import { httpLink } from '@trpc/client/links/httpLink'
import { splitLink } from '@trpc/client/links/splitLink'
import { createWSClient, wsLink } from '@trpc/client/links/wsLink'
import WebSocket from 'ws'

import type { ApiRPC } from './service1'

//wait for service1 to be ready
setTimeout(() => {
  const apiRPCCwsClient = createWSClient({
    url: `ws://localhost:3000`,
    // @ts-expect-error
    WebSocket,
  })

  const apiRPCClient = createTRPCClient<ApiRPC>({
    links: [
      splitLink({
        condition(op) {
          return op.type === 'subscription'
        },
        true: wsLink({
          client: apiRPCCwsClient,
        }),
        false: httpLink({
          url: `http://localhost:3000`,
        }),
      }),
    ],
  })

  apiRPCClient.subscription('randomNumber', null, {
    onNext(data) {
      console.log('received', data)
    },
    onError(err) {
      console.error('error', err)
    },
  })
}, 3000)
