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
            className={`flex items-center justify-center gap-2 border border-black ${selected?.includes(perk) && "bg-primary text-white"} min-h-[50px] rounded-xl ${forDisplay && !allowedPerks?.includes(perk) ? "hidden" : ""}`}
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
