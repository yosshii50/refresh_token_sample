"use client";
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
export const SessionInfoWrap = () => {
    return <SessionProvider><SessionInfoCore /></SessionProvider>;
};
