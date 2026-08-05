import Link from "next/link";
import type { ReactNode } from "react";
export function Container({children,className=""}:{children:ReactNode;className?:string}){return <div className={`aba-container ${className}`}>{children}</div>}
export function SectionHeading({eyebrow,title,copy,light=false}:{eyebrow:string;title:string;copy?:string;light?:boolean}){return <header className={`aba-heading ${light?"is-light":""}`}><span>{eyebrow}</span><h2>{title}</h2>{copy&&<p>{copy}</p>}</header>}
export function PrimaryButton({href,children}:{href:string;children:ReactNode}){return <Link className="aba-btn aba-btn-primary" href={href}>{children}<span aria-hidden="true">↗</span></Link>}
export function SecondaryButton({href,children,light=false}:{href:string;children:ReactNode;light?:boolean}){return <Link className={`aba-btn aba-btn-secondary ${light?"light":""}`} href={href}>{children}<span aria-hidden="true">→</span></Link>}
