// CookieList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Cookie {
  name: string;
  value: string;
}

const CookieList: React.FC = () => {
  const [cookies, setCookies] = useState<Cookie[]>([]);

  useEffect(() => {
    const cookieStrings = document.cookie.split('; ');
    const cookieArray = cookieStrings.map(cookieStr => {
      const [name, value] = cookieStr.split('=');
      return { name, value: decodeURIComponent(value) };
    });
    setCookies(cookieArray);
  }, []);

  return (
    <div>
      <h3>Cookies List</h3>
      <ul>
        {cookies.map((cookie, index) => (
          <li key={index}>
            <strong>{cookie.name}</strong>: {cookie.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CookieList;
