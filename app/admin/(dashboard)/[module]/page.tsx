import { notFound } from "next/navigation";
import { adminModules,renderAdminDashboard,type AdminModule } from "@/lib/admin-dashboard";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{module:string}>}){const {module}=await params;return {title:module.charAt(0).toUpperCase()+module.slice(1)}}
export default async function ModulePage({params}:{params:Promise<{module:string}>}){const {module}=await params;if(!adminModules.includes(module as Exclude<AdminModule,"overview">))notFound();return renderAdminDashboard(module as AdminModule)}
