"use client";

import HomeCard from "./HomeCard";
import { MeetingType } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MEETINGTYPES = [
  {
    title: "New Meeting",
    subTitle: "Setup a instant meeting",
    icon: "/icons/add-meeting.svg",
    bgColor: "bg-orange-1",
    typeState: "isInstantMeeting",
  },
  {
    title: "Join Meeting",
    subTitle: "via invitation link",
    icon: "/icons/join-meeting.svg",
    bgColor: "bg-blue-1",
    typeState: "isSchedulingMeeting",
  },
  {
    title: "Schedule Meeting",
    subTitle: "Plan your meeting",
    icon: "/icons/schedule.svg",
    bgColor: "bg-purple-1",
    typeState: "isSchedulingMeeting",
  },
  {
    title: "View Recordings",
    subTitle: "Check out your recordings",
    icon: "/icons/recordings.svg",
    bgColor: "bg-yellow-1",
  },
];
const MeetingTypeList = () => {
  const route = useRouter();
  const [meetingState, setMeetingState] = useState<string | undefined>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const creatMeeting = async () => {
    if (!user || !client) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");
      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: { description },
        },
      });
      setCallDetails(call);
      console.log(call.id);
      if (!values.description) {
        route.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting created!" });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {MEETINGTYPES.map((type: MeetingType, index) => (
        <HomeCard
          type={type}
          key={index}
          handleClick={() => {
            if (type.title == "View Recording") {
              route.push("/recording");
            } else {
              setMeetingState(type.typeState);
            }
          }}
        />
      ))}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="test-center"
        buttonText="start a meeting"
        handleClick={creatMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
