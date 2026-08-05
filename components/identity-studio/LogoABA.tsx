import Image from "next/image";
import { companyConfig } from "@/config/identity-studio-company";

type LogoABAProps = {
  className?: string;
  priority?: boolean;
  variant?: "default" | "surface";
};

/** Affichage unique du logo officiel, sans recadrage ni déformation. */
export default function LogoABA({
  className = "",
  priority = false,
  variant = "default",
}: LogoABAProps) {
  return (
    <span className={`aba-logo aba-logo--${variant} ${className}`.trim()}>
      <Image
        src={companyConfig.logoPath}
        alt={`Logo ${companyConfig.name}`}
        width={879}
        height={504}
        priority={priority}
        unoptimized
      />
    </span>
  );
}
