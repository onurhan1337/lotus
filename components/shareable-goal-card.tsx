import { Goal } from "@prisma/client";

interface SimpleGoalCardProps {
  goal: Goal;
}

export const ShareableGoalCard = ({ goal }: SimpleGoalCardProps) => {
  return (
    <div className="flex items-center justify-start py-2">
      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-neutral-200 dark:bg-[#070809]">
        {goal.isCompleted ? "▣" : "▢"}
      </span>
      <article className="flex flex-col">
        <h2 className={"text-sm leading-6 font-medium tracking-tight"}>
          {goal.name}
        </h2>
        <p className={"text-sm tracking-tighter text-muted-foreground"}>
          {goal.description}
        </p>
      </article>
    </div>
  );
};
