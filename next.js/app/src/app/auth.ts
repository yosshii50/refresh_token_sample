async function login() {
  try {
    console.log('auth.ts - login');
    const response = await fetch('http://127.0.0.1:8000/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'username=johndoe&password=secret'
    });
    const data = await response.json();
    return {
      success: true,
      accessToken: data.access_token,
      accessTokenExpires: data.access_token_expires,
      refreshTokenExpires: data.refresh_token_expires
    };
  } catch (error) {
    return { success: false };
  }
}

async function check(accessToken: string) {
  try {
    const response = await fetch('/api/check', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    return { success: true, username: data.username };
  } catch (error) {
    return { success: false };
  }
}

async function refresh() {
  try {
    const response = await fetch('/api/refresh', {
      method: 'POST'
    });
    const data = await response.json();
    return {
      success: true,
      accessToken: data.access_token,
      accessTokenExpires: data.access_token_expires
    };
  } catch (error) {
    return { success: false };
  }
}

async function logout() {
  try {
    await fetch('/api/logout', { method: 'POST' });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export { login, check, refresh, logout };