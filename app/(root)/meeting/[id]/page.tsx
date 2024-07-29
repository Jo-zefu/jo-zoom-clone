"use client";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import { userGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";

function Meeting({ params: { id } }: { params: { id: string } }) {
  const { user, isLoaded } = useUser();
  const [setUpComplete, setSetUpComplete] = useState(false);
  const { call, isCallLoading } = userGetCallById(id);
  if (!isLoaded || isCallLoading) return <Loader />;
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!setUpComplete ? (
            <MeetingSetup setSetUpComplete={setSetUpComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default Meeting;
