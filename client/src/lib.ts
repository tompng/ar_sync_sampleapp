interface SendDataParams {
  url: string
  method?: string
  data?: object
}
export function sendData({ url, method, data }: SendDataParams) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': document.querySelector('meta[name=csrf-token]')!.getAttribute('content') || ''
  }
  const body = JSON.stringify(data)
  fetch(url, { credentials: 'include', method: method || 'GET', headers, body })
}
