'use client';

import React from 'react';
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const SessionInfoCore = () => {
  const { data: session } = useSession();
  return (
    <>
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
};

const SessionData: React.FC = () => {
  return (
    <div>
      <SessionProvider>
        <h1>SessionData</h1>
        <SessionInfoCore />
      </SessionProvider>
    </div>
  );
};

export default SessionData;