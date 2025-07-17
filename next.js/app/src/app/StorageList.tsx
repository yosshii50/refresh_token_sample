'use client';

import React, { useEffect, useState } from 'react';

const StorageList: React.FC = () => {
  const [localStorageItems, setLocalStorageItems] = useState<{ key: string, value: string }[]>([]);
  const [sessionStorageItems, setSessionStorageItems] = useState<{ key: string, value: string }[]>([]);

  useEffect(() => {
    // Load localStorage items
    const local: { key: string; value: string }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        local.push({ key, value: localStorage.getItem(key) || '' });
      }
    }
    setLocalStorageItems(local);

    // Load sessionStorage items
    const session: { key: string; value: string }[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        session.push({ key, value: sessionStorage.getItem(key) || '' });
      }
    }
    setSessionStorageItems(session);
  }, []);

  return (
    <div>
      <h1>Storage Items</h1>
      <h2>Local Storage</h2>
      <ul>
        {localStorageItems.map(item => (
          <li key={item.key}>
            <strong>{item.key}</strong>: {item.value}
          </li>
        ))}
      </ul>
      <h2>Session Storage</h2>
      <ul>
        {sessionStorageItems.map(item => (
          <li key={item.key}>
            <strong>{item.key}</strong>: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorageList;