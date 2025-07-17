//'use client';

import CookieList from './CookieList';
import StorageList from './StorageList';
import SessionData from './SessionData';
//import { SessionProvider } from "next-auth/react";
import version from '@/lib/version';
import LoginButton from '@/components/login_button';

export default function Home() {

  const nextVersion = version();

  return (
    <div>
      <h1>Refresh Token Sample</h1>
      <LoginButton />
      <br/>
      <br/>
      <div>
      </div>
      <hr />
      <SessionData />
      <hr />
      <h2 className="text-2xl font-bold text-blue-600 mb-2">Coockies</h2>
      <CookieList />
      <hr />
      <h2 className="text-2xl font-bold text-blue-600 mb-2">Storages</h2>
      <StorageList />
      --- Next Ver-{nextVersion} ---
    </div>
  );
}
