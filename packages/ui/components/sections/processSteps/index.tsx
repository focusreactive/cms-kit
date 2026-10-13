import { Heading } from "../../ui/heading";
import type { IProcessStepsProps } from "./types";

export function ProcessSteps({ heading, steps }: IProcessStepsProps) {
  return (
    <div className="not-prose grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      <Heading {...heading} />

      <ol className="divide-textSecondaryColor/20 m-0 list-none divide-y p-0">
        {steps?.map((step, index) => (
          <li key={index} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <span className="text-textSecondaryColor shrink-0 pt-1 text-sm tabular-nums">
              {formatStepNumber(index)}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-textColor font-semibold">{step.title}</h3>
              {step.description ? (
                <p className="text-textSecondaryColor text-sm">
                  {step.description}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** `01.`, `02.` … derived from position, so reordering in Studio renumbers. */
const formatStepNumber = (index: number) =>
  `${String(index + 1).padStart(2, "0")}.`;
