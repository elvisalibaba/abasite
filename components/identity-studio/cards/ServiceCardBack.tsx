import type { CompanyProfile, PersonProfile } from "@/types/identity-studio";
import { renderCardBackSvg } from "@/lib/identity-studio/card-renderer";

type ServiceCardBackProps = {
  person: PersonProfile;
  company: CompanyProfile;
  logoDataUrl: string;
};

export default function ServiceCardBack({ person, company, logoDataUrl }: ServiceCardBackProps) {
  const svg = renderCardBackSvg(person, company, logoDataUrl);
  return <div className="service-card-svg" aria-label="Verso de la carte de service" dangerouslySetInnerHTML={{ __html: svg }} />;
}
