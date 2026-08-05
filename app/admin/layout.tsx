import "./admin.css";
import "./identity-requests.css";

export const metadata = { robots: { index: false, follow: false, nocache: true } };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
