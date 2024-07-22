import { useUser } from "@clerk/nextjs";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const SteamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [steamClient, setSteamClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API Key missing");
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl
      },
      tokenProvider: 
    })
  }, [user, isLoaded]);

  return <StreamVideo client={steamClient}></StreamVideo>;
};

export default SteamVideoProvider;
