type CookieKey = "token"; // Define your cookie key types here

class CookieKit {
  static set(key: CookieKey, value: string, options: { [key: string]: any } = {}) {
    const cookieOptions = {
      path: '/',
      ...options, // Allow passing additional options like maxAge, httpOnly, etc.
    };

    const cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; ${Object.entries(cookieOptions)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ')}`;

    document.cookie = cookieString;
  }

  static get(key: CookieKey) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ').reduce((acc, cookie) => {
      const [cookieKey, cookieValue] = cookie.split('=');
      acc[decodeURIComponent(cookieKey)] = decodeURIComponent(cookieValue);
      return acc;
    }, {} as { [key: string]: string });

    return cookies[key] || null;
  }

  static remove(key: CookieKey) {
    // To remove a cookie, we set its expiration date to the past
    this.set(key, '', { 'max-age': -1 });
  }
}

export default CookieKit;
