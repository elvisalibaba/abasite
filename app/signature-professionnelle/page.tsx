import IdentityStudio from "@/components/identity-studio/IdentityStudio";
import {companyConfig} from "@/config/identity-studio-company";
import "../identity-studio/identity-studio.css";
export const metadata={title:"Créer une signature professionnelle | ABA",description:"Générateur public de signature e-mail professionnelle ABA."};
export default function PublicSignaturePage(){return <IdentityStudio company={companyConfig} signatureOnly/>}
