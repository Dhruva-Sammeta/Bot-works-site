import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./prospectus-action.css";

type ProspectusActionProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  tone?: "paper" | "signal";
  className?: string;
  ariaLabel?: string;
  download?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export function ProspectusAction({
  children,
  to,
  href,
  tone = "paper",
  className = "",
  ariaLabel,
  download,
  type = "button",
  ...buttonProps
}: ProspectusActionProps) {
  const classes = `pa-clause-action pa-clause-action-${tone} ${className}`.trim();
  const content = (
    <>
      <span className="pa-clause-label">{children}</span>
      <span className="pa-clause-track" aria-hidden="true"><i /><b /></span>
      <span className="pa-clause-arrow" aria-hidden="true">↘</span>
    </>
  );

  if (to) return <Link className={classes} to={to} aria-label={ariaLabel}>{content}</Link>;
  if (href) return <a className={classes} href={href} aria-label={ariaLabel} download={download}>{content}</a>;
  return <button className={classes} type={type} aria-label={ariaLabel} {...buttonProps}>{content}</button>;
}
