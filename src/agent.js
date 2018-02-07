import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;

let token = null;

const tokenPlugin = (req) => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  get: url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  del: url => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
};

const Articles = {
  all: (page = 10) => requests.get(`/articles?limit=${page}`),
  byAuthor: author => requests.get(`/articles?author=${encodeURIComponent(author)}&limit=5`),
  byTag: tag => requests.get(`/articles?tag=${encodeURIComponent(tag)}&limit=10`),
  favoritedBy: author => requests.get(`/articles?favorited=${encodeURIComponent(author)}&limit=5`),
  feed: () => requests.get('/articles/feed?limit=10'),
  get: slug => requests.get(`/articles/${slug}`),
  del: slug => requests.del(`/articles/${slug}`),
};

const Comments = {
  create: (slug, comment) => requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) => requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug => requests.get(`/articles/${slug}/comments`),
};

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) => requests.post('/users', { user: { username, email, password } }),
  save: user => requests.put('/user', { user }),
};

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.del(`/profiles/${username}/follow`),
};

const Tags = {
  getAll: () => requests.get('/tags'),
};

export default {
  Articles,
  Comments,
  Auth,
  Profile,
  Tags,
  setToken: (_token) => { token = _token; },
};
