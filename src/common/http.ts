type HttpT = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ConfigT = {
  method: HttpT
  body?: string
}

function doFetch(method: HttpT, url: string, body?: Record<string, any>) {
  const config: ConfigT = { method }

  if (body) {
    config.body = JSON.stringify(body)
  }

  return fetch(url, config).then((res) => {
    // delete has no content
    if (res.status !== 204) {
      return res.json()
    }
  })
}

const http = {
  get: doFetch.bind(null, 'GET'),
  post: doFetch.bind(null, 'POST'),
  put: doFetch.bind(null, 'PUT'),
  del: doFetch.bind(null, 'DELETE'),
}

export default http
