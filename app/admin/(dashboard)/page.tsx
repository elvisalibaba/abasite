import { renderAdminDashboard } from "@/lib/admin-dashboard";
export const metadata={title:"Vue d’ensemble"};export const dynamic="force-dynamic";
export default async function AdminPage(){return renderAdminDashboard("overview")}
