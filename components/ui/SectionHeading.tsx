import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl md:mb-14",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-[2.5rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 font-body text-lg text-neutral-500 md:text-xl">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
