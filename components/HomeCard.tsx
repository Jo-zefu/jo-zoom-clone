import { MeetingType } from "@/constants";
import Image from "next/image";

const HomeCard = ({
  type,
  handleClick,
}: {
  type: MeetingType;
  handleClick: () => void;
}) => {
  return (
    <section>
      <div
        key={type.title}
        className={`${type.bgColor} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[260px] min-h-[260px] rounded-[14px] cursor-pointer `}
        onClick={handleClick}
      >
        <div className="flex-center glassmorphism size-12 rounded-[10px]">
          <Image
            src={type.icon}
            alt="add-meeting"
            width={27}
            height={27}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{type.title}</h2>
          <p className="text-xl font-normal">{type.subTitle}</p>
        </div>
      </div>
    </section>
  );
};

export default HomeCard;
