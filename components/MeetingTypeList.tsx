"use client";

import HomeCard from "./HomeCard";
import { MeetingType } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingModal from "./MeetingModal";
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

  const creatMeeting = () => {};

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
