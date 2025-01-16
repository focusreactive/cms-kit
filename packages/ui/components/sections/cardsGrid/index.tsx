import DefaultCard from "./DefaultCard";
import type { ICardsGridProps } from "./types";

export function CardsGrid(props: ICardsGridProps) {
  const { items, columns } = props;

  if (columns === 3) {
    return (
      <div className="not-prose grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        {items?.map((item, i) => <DefaultCard key={i} {...item} />)}
      </div>
    );
  }

  if (columns === 2) {
    return (
      <div className="not-prose mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {items?.map((item, i) => <DefaultCard key={i} {...item} />)}
      </div>
    );
  }

  return (
    <div className="not-prose space-y-8 text-base leading-7">
      {items?.map((item, i) => <DefaultCard key={i} {...item} />)}
    </div>
  );
}
