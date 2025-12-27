import Link from "next/link";
import clsx from "clsx";

interface GradientButtonProps {
  href?: string;
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  bold?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const sizeStyles = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-xl",
};

export default function GradientButton({
  href,
  text,
  className = "",
  size = "md",
  bold = false,
  onClick,
  type = "button",
  disabled = false,
}: GradientButtonProps) {
  const commonClasses = clsx(
    "group relative inline-flex items-center justify-center",
    "rounded-lg transition-transform duration-300",
    "hover:scale-[1.03]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    sizeStyles[size],
    bold ? "font-bold" : "font-medium",
    disabled && "opacity-50 cursor-not-allowed hover:scale-100",
    className
  );

  const content = (
    <>
      {/* Gradient border */}
      <span className="absolute inset-0 rounded-lg gradient-border-mask pointer-events-none" />
      {/* Text */}
      <span className="relative z-10 whitespace-nowrap leading-none">
        {text}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={commonClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={commonClasses} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
