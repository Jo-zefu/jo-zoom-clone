"use client";

import HomeCard from "./HomeCard";
import { MeetingType } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

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
    typeState: "isJoiningMeeting",
  },
  {
    title: "Schedule Meeting",
    subTitle: "Plan your meeting",
    icon: "/icons/schedule.svg",
    bgColor: "bg-purple-1",
    typeState: "isScheduleMeeting",
  },
  {
    title: "View Recordings",
    subTitle: "Check out your recordings",
    icon: "/icons/recordings.svg",
    bgColor: "bg-yellow-1",
    typeState: "viewRecording",
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
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {MEETINGTYPES.map((type: MeetingType, index) => (
        <HomeCard
          type={type}
          key={index}
          handleClick={() => {
            if (type.typeState == "viewRecording") {
              route.push("/recording");
            } else {
              setMeetingState(type.typeState);
            }
          }}
        />
      ))}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create a meeting"
          handleClick={creatMeeting}
        >
          <div className="flex w-full flex-col gap-2">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => {
                setValues({ ...values, dateTime: date! });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy meeting link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="test-center"
        buttonText="start a meeting"
        handleClick={creatMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="test-center"
        buttonText="Join meeting"
        handleClick={() => route.push(values.link)}
      >
        <Input
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
