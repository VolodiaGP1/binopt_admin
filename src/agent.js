import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://binopt.com/api/v1'
const API_IMG_ROOT = ''
// const encode = encodeURIComponent
const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

// TODO: make login API calls with agent
const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`

const Banners = {
  all: (page, l, parentId = 0) =>
      (parentId === 0)
          ? requests.get(`/banners/?token=${token}&${limit(l, page)}`)
          : requests.get(`/banners/?token=${token}&conditions=parent_id=${parentId}`),
  deleteBanner: id =>
      requests.del(`/banners/?token=${token}&id=${id}`),
  put: params =>
      requests.put(`/banners/?token=${token}&${params}`, null),
  post: params =>
      requests.post(`/banners/?token=${token}&${params}`, null),
  get: id =>
      requests.get(`/banners/?token=${token}&conditions=id=${id}&relations=images`)
}

const Operators = {
  all: (page, l, parentId = 0) =>
    (parentId === 0)
      ? requests.get(`/operators?${limit(l, page)}`)
      : requests.get(`/operators?parent_id=${parentId}`),
  filter: (page, l, parentId = 0, argument) =>
    (parentId === 0)
      ? requests.get(`/operators?${limit(l, page)}`)
      : requests.get(`/operators?parent_id=${parentId}`),
  deleteBanner: id =>
    requests.del(`/banners/?token=${token}&id=${id}`),
  put: params => {
    console.log('pARMAS', params)
    requests.put(`/operators/${params[0].id}`, params[0])},
  post: params =>
    requests.post(`/banners/?token=${token}&${params}`, null),
  get: id =>
    requests.get(`/operators?id=${id}`)
}

export default {
  API_ROOT,
  API_IMG_ROOT,
  token,
  Auth,
  Banners,
  Operators,
  setToken: _token => { token = _token }
}
