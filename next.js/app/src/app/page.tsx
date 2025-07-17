//'use client';

import CookieList from './CookieList';
import StorageList from './StorageList';
import SessionData from './SessionData';
//import { SessionProvider } from "next-auth/react";
import version from '@/lib/version';
//import LoginButton from '@/components/login_button';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LoginButton, LogoutButton } from "@/components/buttons.component";
import { SessionInfoWrap } from "@/components/session.component";

export default async function Home() {

  const nextVersion = version();
  const session = await getServerSession(authOptions);

  return (
    <div>

      <div>
        <LoginButton /><br />
        <LogoutButton /><br />
      </div>
      <h1>Server Session</h1>{JSON.stringify(session)}
      <SessionInfoWrap /><br />

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
