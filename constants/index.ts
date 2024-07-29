export const sidebarLinks = [
  {
    imgUrl: "/icons/Home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgUrl: "/icons/upcoming.svg",
    route: "/upcoming",
    label: "Upcoming",
  },
  {
    imgUrl: "/icons/previous.svg",
    route: "/previous",
    label: "Previous",
  },
  {
    imgUrl: "/icons/Video.svg",
    route: "/recording",
    label: "Recording",
  },
  {
    imgUrl: "/icons/add-personal.svg",
    route: "/personal-room",
    label: "Personal Room",
  },
];

export interface MeetingType {
  title: string;
  subTitle: string;
  icon: string;
  bgColor: string;
  typeState?: string;
}

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];
