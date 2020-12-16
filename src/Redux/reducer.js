const langMap = {
  ru: "ru",
  en: "en",
  kk: "kk"
}

const findGetParameter = (parameterName) => {
  let result = null,
    tmp = [];
  window.location.search
    .substr(1)
    .split("&")
    .forEach((item) => {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
};

const getLang = () => {
  let lang = localStorage.getItem("lang")
  if(!lang){
    lang = navigator.language.split("-")[0]
  }
  return ["ru", "en", "kk"].indexOf(lang) > -1 ? lang : null
}

const initialState = {
  user: null,
  token: localStorage.getItem("scoreToken"),
  drawer: false,
  lang: langMap[findGetParameter("lang")] || getLang() || "ru"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      if (action.remember) {
        localStorage.setItem("scoreToken", action.token);
      }
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    }
    case "TOGGLE_DRAWER": {
      return {
        ...state,
        drawer: action.value,
      };
    }
    case "LOGOUT": {
      localStorage.setItem("scoreToken", "");
      return {
        ...state,
        token: "",
        user: null
      }
    }
    case "CHANGE_LOCALE": {
      localStorage.setItem("lang", action.lang);
      return {
        ...state,
        lang: action.lang
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;