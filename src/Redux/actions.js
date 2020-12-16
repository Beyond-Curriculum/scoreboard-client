export const login = (user, token, remember) => ({
  type: "LOGIN",
  user,
  token,
  remember
});

export const toggleDrawer = (value) => ({
  type: "TOGGLE_DRAWER",
  value,
});

export const logout = () => ({
  type: "LOGOUT",
})

export const changeLocale = (lang) => ({
  type: "CHANGE_LOCALE",
  lang
})