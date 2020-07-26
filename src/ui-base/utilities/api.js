import Vue from 'vue';

export default {
  get(url, config) {
    return Vue.http.get(url, config)
      .then(
        (response) => Promise.resolve(response)
      )
      .catch(
        (error) => Promise.reject(error)
      );
  },
  post(url, request, config) {
    return Vue.http.post(url, request, config)
      .then(
        (response) => Promise.resolve(response)
      )
      .catch(
        (error) => Promise.reject(error)
      );
  },
  put(url, request, config) {
    return Vue.http.put(url, request, config)
      .then(
        (response) => Promise.resolve(response)
      )
      .catch(
        (error) => Promise.reject(error)
      );
  },
  patch(url, request, config) {
    return Vue.http.patch(url, request, config)
      .then(
        (response) => Promise.resolve(response)
      )
      .catch(
        (error) => Promise.reject(error)
      );
  },
  delete(url, config) {
    return Vue.http.delete(url, config)
      .then(
        (response) => Promise.resolve(response)
      )
      .catch(
        (error) => Promise.reject(error)
      );
  },
  error(_error){
    return {
      title: "API Endpoint Error",
      message: "The request returned \"" + _error.status + " - " + _error.statusText + "\".",
      raw: _error
    }
  }
}
