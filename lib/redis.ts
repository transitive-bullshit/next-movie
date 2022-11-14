import Keyv from '@keyvhq/core'
import KeyvRedis from '@keyvhq/redis'

import { isRedisEnabled, redisNamespace, redisUrl } from './config'

let keyv: Keyv
if (isRedisEnabled) {
  const keyvRedis = new KeyvRedis(redisUrl)
  keyv = new Keyv({ store: keyvRedis, namespace: redisNamespace || undefined })
} else {
  keyv = new Keyv()
}

export { keyv }
