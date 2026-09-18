import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "dark" | "outline" | "paper";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
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
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-[15px] text-sm font-medium leading-none transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  dark: "bg-ink text-paper hover:bg-[#2a2820]",
  outline: "border border-ink-22 text-ink hover:border-ink",
  paper: "bg-paper text-ink hover:bg-white",
};

export function Button(props: ButtonProps) {
  const { children, variant = "dark", className } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
