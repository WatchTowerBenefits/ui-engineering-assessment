/**
 * Look a cookie and return results.
 *
 * @param {string} name - Name of the cookie to retrieve.
 * @returns {string}
 */
export function getCookie(name) {
  const cookieName = `${name}=`;
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) === 0) {
      return c.substring(cookieName.length, c.length);
    }
  }

  return '';
}

/**
 * Delete a specfic cookie.
 *
 * @param {string} name - Name of the cookie to delete.
 */
export function deleteCookie(name) {
  const domain = `domain=${window.location.href.replace(/^(?:https?:\/\/)?(?:[^/]+\.)?([^./]+\.[^./]+).*$/, '$1')};`;

  document.cookie = `${name}=; ${domain} path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

/**
 * Set a cookie.
 *
 * @param {string} name - Name of the cookie to set.
 * @param {string} value - Value of the cookie to set.
 * @param {Date} expirationDate - Expiration date of the cookie (defaults to 24 hours from the time the cookie is set).
 */
export function setCookie(name, value, expirationDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000))) {
  const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/; secure;`;

  document.cookie = cookie;
}
