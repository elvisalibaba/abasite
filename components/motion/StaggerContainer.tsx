import type { ReactNode } from "react";

export default function StaggerContainer({children,className=""}:{children:ReactNode;className?:string}){
  return <div className={className}>{children}</div>;
}
