export const getLocal = (str, locale) => `${str}${locale.charAt(0).toUpperCase()}${locale.slice(1)}`

export const hasRight = (user, access = []) => user ? access.indexOf(user.access) > -1 : false