import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-center font-sans text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold md:text-base";

const variants = {
  primary:
    "bg-brand-goldLight text-brand-ink shadow-md hover:bg-brand-gold active:bg-brand-gold",
  secondary:
    "border-2 border-neutral-900 bg-transparent text-neutral-900 hover:border-brand-gold hover:text-brand-gold",
};

type Common = {
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className, children, ...rest } = props;
  const cls = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...aRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={cls} href={href} {...aRest}>
        {children}
      </a>
    );
  }

  const {
    type = "button",
    ...btnRest
  } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={cls} type={type} {...btnRest}>
      {children}
    </button>
  );
}
