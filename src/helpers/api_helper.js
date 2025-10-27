import axios from "axios";
import config from "../config";

// default
axios.defaults.baseURL = config.baseUrl;

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["tenant"] = "root";

//cancelToken start
let sourceRequest = {};
let cancelToken;
if (typeof cancelToken != typeof undefined) {
  cancelToken.cancel("Operation canceled due to new request.");
}
cancelToken = axios.CancelToken.source();
//cancelToken end

axios.interceptors.request.use(
  function (config) {
    const UserData_ = getLoggedinUser();
    if (UserData_) {
      config.headers["Authorization"] = "Bearer " + UserData_; // for Spring Boot back-end
    }
    const axiosSource = axios.CancelToken.source();
    sourceRequest[config.url] = { cancel: axiosSource.cancel };
    config.cancelToken = axiosSource.token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
let isShowing401Error = false;
// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = 'Invalid credentials';
        window.location.href = "/"
        window.location.reload()
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */
  get = (url, params) => {
    return axios.get(url, params);
  };

  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data);
  };

  /**
   * post given data to url
   */
  post = (url, data) => {
    return axios.post(url, data);
  };

  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.put(url, data);
  };

  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = window.sessionStorage.getItem("JWToken");
  if (!user) {
    return null;
  } else {
    return user;
  }
};

const checkPath = (data) => {
  if (data) {
    let pathdata = data.toString();
    if (pathdata.includes("?")) {
      return pathdata.split("?")[0];
    } else {
      return data;
    }
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
