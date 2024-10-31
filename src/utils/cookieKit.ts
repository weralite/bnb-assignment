type CookieKey = "token"; 

class CookieKit {
  static set(key: CookieKey, value: string, options: { [key: string]: any } = {}) {


    const cookieOptions = {
      path: '/',
      ...options, 
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
    this.set(key, '', { 'max-age': -1 });
  }
}

export default CookieKit;
