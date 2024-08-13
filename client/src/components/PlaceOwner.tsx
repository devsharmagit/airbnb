import Heading from "./typography/Heading.tsx";
import Paragrapgh from "./typography/Paragrapgh.tsx";
import imgSrc from "../assets/user1.png";
import { PlaceDataType } from "../types/place.ts";

const PlaceOwner = ({ place }: { place: PlaceDataType }) => {
  return (
    <div className="user-info flex  items-center gap-3 border-b border-t border-gray-300  py-8">
      {place?.owner?.profilePhoto ? (
        <img
          src={`${place?.owner?.profilePhoto?.url}`}
          className="h-12 w-12 rounded-full object-cover"
          alt=""
          loading="lazy"
        />
      ) : (
        <img src={imgSrc} className="h-12 w-12 rounded-full object-cover" />
      )}

      <div className="flex flex-col content-center">
        <Heading text={place.owner.name} />
        <Paragrapgh text={place?.owner?.email} />
      </div>
    </div>
  );
};

export default PlaceOwner;
