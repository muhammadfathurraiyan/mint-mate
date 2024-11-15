import { File, Image, ListChecks, Send } from "lucide-react";
import { Dispatch, SetStateAction, useCallback } from "react";

export default function FormNav({ step }: { step: TStep[] }) {
  const [isStep1, setIsStep1, isStep2, setIsStep2, isStep3, setIsStep3] = step;
  const nav = [
    {
      info: "General info",
      icon: <ListChecks className="max-lg:hidden" />,
      setState: setIsStep1,
      state: isStep1,
    },
    {
      info: "Image upload",
      icon: <Image className="max-lg:hidden" />,
      setState: setIsStep2,
      state: isStep2,
    },
    {
      info: "Mint NFT",
      icon: <Send className="max-lg:hidden" />,
      setState: setIsStep3,
      state: isStep3,
    },
  ];

  const handleClick = useCallback(
    (state: boolean, fn: Dispatch<SetStateAction<boolean>>) => {
      if (setIsStep1 && setIsStep2 && setIsStep3) {
        setIsStep1(false);
        setIsStep2(false);
        setIsStep3(false);
      }
      fn(!state);
    },
    []
  );

  return (
    <div className="lg:max-w-[300px] w-full lg:space-y-2 max-lg:flex items-center gap-4">
      {nav.map(({ info, icon, setState, state }, index) => {
        return (
          <div
            key={index}
            className={`flex items-center max-lg:flex-col gap-4 max-lg:gap-2 rounded-md hover:bg-accent p-4 w-full ${
              state ? "bg-accent" : ""
            }`}
            onClick={() => handleClick(state!, setState!)}
          >
            {icon}
            <div>
              <h3 className="font-semibold leading-none tracking-tight">
                Step {index + 1}
              </h3>
              <p className="text-sm text-muted-foreground">{info}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
