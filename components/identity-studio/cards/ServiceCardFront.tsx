import type { CompanyProfile, PersonProfile } from "@/types/identity-studio";
import { renderCardFrontSvg } from "@/lib/identity-studio/card-renderer";

type ServiceCardFrontProps = {
  person: PersonProfile;
  company: CompanyProfile;
  logoDataUrl: string;
};

export default function ServiceCardFront({ person, company, logoDataUrl }: ServiceCardFrontProps) {
  const svg = renderCardFrontSvg(person, company, logoDataUrl);
  return <div className="service-card-svg" aria-label="Recto de la carte de service" dangerouslySetInnerHTML={{ __html: svg }} />;
}
