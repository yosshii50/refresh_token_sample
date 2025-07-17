'use client';

import { useState } from 'react';
import { login, check, refresh, logout } from './auth';
import handler from './login';
import CookieList from './CookieList';
import StorageList from './StorageList';

export default function Home() {
  const [accessToken, setAccessToken] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messageAccessTokenExpires, setMessageAccessTokenExpires] = useState('');
  const [messageRefreshTokenExpires, setMessageRefreshTokenExpires] = useState('');
  console.log('Home component rendered');

  const handleLogin = async () => {
    console.log('handleLogin');
    const result = await login();
    if (result.success) {
      setAccessToken(result.accessToken);
      setMessageAccessTokenExpires(result.accessTokenExpires);
      setMessageRefreshTokenExpires(result.refreshTokenExpires);
      setMessage(`Logged in at ${new Date().toLocaleString()}`);
    } else {
      setMessage('Login failed');
    }
  };

  const handleCheck = async () => {
    const result = await check(accessToken);
    if (result.success) {
      setUsername(result.username);
      setMessage(`Checked at ${new Date().toLocaleString()}`);
    } else {
      setMessage('Check failed');
    }
  };

  const handleRefresh = async () => {
    const result = await refresh();
    if (result.success) {
      setAccessToken(result.accessToken);
      setMessageAccessTokenExpires(result.accessTokenExpires);
      setMessage(`Refreshed at ${new Date().toLocaleString()}`);
    } else {
      setMessage('Refresh failed');
    }
  };

  const handleLogout = async () => {
    await logout();
    setAccessToken('');
    setUsername('');
    setMessage('Logged out');
  };

  return (
    <div>
      <h1>Refresh Token Sample</h1>
      <br/>
      <button onClick={handleLogin}>ログイン</button><br/>
      <button onClick={handleCheck}>チェック</button><br/>
      <button onClick={handleRefresh}>更新</button><br/>
      <button onClick={handleLogout}>ログアウト</button><br/>
      <br/>
      <div>
        <p>Access Token: {accessToken}</p>
        <p>Username: {username}</p>
        <p>Message: {message}</p>
        <p>Access Token Expires: {messageAccessTokenExpires}</p>
        <p>Refresh Token Expires: {messageRefreshTokenExpires}</p>
      </div>
      <hr />
      <h2 className="text-2xl font-bold text-blue-600 mb-2">Coockies</h2>
      <CookieList />
      <hr />
      <h2 className="text-2xl font-bold text-blue-600 mb-2">Storages</h2>
      <StorageList />
    </div>
  );
}