import { EnteranceSvg, ParkingSvg, PetsSvg, RadioSvg, TVSvg, WifiSvg } from "../assets/svgs";

interface PerksArgTypes {
  selected?: string[];
  onChange?: (arr: string[]) => void;
  forDisplay?: boolean;
  allowedPerks?: string[];
}

function Perks({ selected, onChange, forDisplay, allowedPerks }: PerksArgTypes) {
  const perksArr = [
    {
      perk: "wifi",
      Svg: () => <WifiSvg />,
      text: "Wifi",
    },
    {
      perk: "parking",
      Svg: () => <ParkingSvg />,
      text: "Free parking spot",
    },
    {
      perk: "tv",
      Svg: () => <TVSvg />,
      text: "TV",
    },
    {
      perk: "radio",
      Svg: () => <RadioSvg />,
      text: "Radio",
    },
    {
      perk: "pets",
      Svg: () => <PetsSvg />,
      text: "Pets",
    },
    {
      perk: "private enterance",
      Svg: () => <EnteranceSvg />,
      text: "Private Enterance",
    },
  ];

  const handleClick = (name: string) => {
    if (forDisplay) return;

    if (selected && !selected.includes(name) && onChange) {
      onChange([...selected, name]);
    } else if (onChange && selected) {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  };

  return (
    <>
      {perksArr.map(({ text, Svg, perk }) => {
        return (
          <div
            key={text}
            onClick={() => handleClick(perk)}
            className={`flex cursor-pointer items-center justify-center  gap-2 rounded-lg border px-3 py-2 text-center transition-all ${selected?.includes(perk) ? "border-primary bg-primary text-white" : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:bg-gray-50" } ${forDisplay && !allowedPerks?.includes(perk) ? "hidden" : ""} `}
          >
            <Svg />
            <p>{text}</p>
          </div>
        );
      })}
    </>
  );
}

export default Perks;
