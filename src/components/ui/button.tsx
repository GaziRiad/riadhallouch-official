import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type CommonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  magnetic?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-foreground text-bg hover:bg-accent hover:text-white",
  secondary: "glass text-foreground hover:border-border-strong",
  ghost: "text-foreground hover:text-accent",
};

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    magnetic = true,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  const content =
    "href" in props && props.href ? (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {children}
      </Link>
    ) : (
      <button
        type={(props as ButtonAsButton).type ?? "button"}
        onClick={(props as ButtonAsButton).onClick}
        disabled={(props as ButtonAsButton).disabled}
        className={classes}
      >
        {children}
      </button>
    );

  if (!magnetic) return content;

  return <Magnetic strength={0.25}>{content}</Magnetic>;
}
