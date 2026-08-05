import type { CompanyProfile, PersonProfile } from "@/types/identity-studio";
import { renderAbaQrCodeSvg } from "@/components/identity-studio/cards/AbaQrCode";
import { escapeXml } from "@/lib/identity-studio/browser";
import { ABA_BRAND_COLORS } from "@/config/identity-studio-brand";

// CR80 vertical à 600 dpi : 53,98 × 85,60 mm.
export const CARD_WIDTH = 1275;
export const CARD_HEIGHT = 2022;
export const BUSINESS_CARD_WIDTH = 2022;
export const BUSINESS_CARD_HEIGHT = 1275;

const FONT = "Arial, Helvetica, sans-serif";
const C = ABA_BRAND_COLORS;
const cleanUrl = (value: string) => value.replace(/^https?:\/\//, "").replace(/\/$/, "");

function splitText(value: string, maxChars: number): [string, string] {
  const words = value.trim().split(/\s+/).filter(Boolean);
  let first = "";
  let second = "";
  for (const word of words) {
    if (!second && `${first} ${word}`.trim().length <= maxChars) first = `${first} ${word}`.trim();
    else second = `${second} ${word}`.trim();
  }
  return [first, second];
}

function logo(logoDataUrl: string, x: number, y: number, width: number, height: number) {
  if (!logoDataUrl) return `<text x="${x}" y="${y + height * .68}" font-family="${FONT}" font-size="${height * .6}" font-weight="900" fill="${C.red}">ABA</text>`;
  return `<image href="${logoDataUrl}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>`;
}

function organicBackground(prefix: string) {
  return `<path d="M-90 310C160 70 390 390 575 155S980-55 1370 110V-80H-90Z" fill="#fff" fill-opacity=".045"/>
    <path d="M-170 1450c250-260 490 35 650-180s430-170 625 55 330 40 390-55v850H-170Z" fill="${C.red}" fill-opacity=".14"/>
    <path d="M870-80c-180 270 125 400-65 650s-60 430 190 520 195 370 28 520" fill="none" stroke="#fff" stroke-opacity=".055" stroke-width="120"/>
    <circle cx="1060" cy="1680" r="360" fill="none" stroke="#fff" stroke-opacity=".045" stroke-width="90"/>
    <rect width="1275" height="2022" fill="url(#${prefix}Dots)"/>`;
}

export function renderBusinessCardFrontSvg(person:PersonProfile,company:CompanyProfile,logoDataUrl:string){const name=`${person.firstName} ${person.middleName} ${person.lastName}`.replace(/\s+/g," ").trim()||"Nom Prénom";return `<svg xmlns="http://www.w3.org/2000/svg" width="${BUSINESS_CARD_WIDTH}" height="${BUSINESS_CARD_HEIGHT}" viewBox="0 0 2022 1275"><defs><clipPath id="bcfc"><rect width="2022" height="1275" rx="54"/></clipPath><pattern id="bcfd" width="42" height="42" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="3" fill="#111" fill-opacity=".025"/></pattern></defs><g clip-path="url(#bcfc)"><rect width="2022" height="1275" fill="#fff"/><rect width="54" height="1275" fill="${C.red}"/><rect x="54" width="1968" height="1275" fill="url(#bcfd)"/><path d="M1570-120c180 190 150 370 360 510s210 330 60 520" fill="none" stroke="${C.red}" stroke-opacity=".06" stroke-width="160"/><g>${logo(logoDataUrl,130,85,440,245)}</g><text x="1910" y="145" text-anchor="end" font-family="${FONT}" font-size="24" font-weight="800" fill="${C.red}" letter-spacing="5">AFRICA BUSINESS AGENCY</text><text x="130" y="610" font-family="${FONT}" font-size="83" font-weight="900" fill="${C.graphite}">${escapeXml(name.toUpperCase())}</text><rect x="130" y="662" width="145" height="9" rx="4" fill="${C.red}"/><text x="130" y="755" font-family="${FONT}" font-size="40" font-weight="800" fill="${C.redDark}">${escapeXml(person.jobTitle||"Fonction")}</text><text x="130" y="816" font-family="${FONT}" font-size="31" fill="#60636a">${escapeXml(person.department||company.tagline)}</text><line x1="130" y1="920" x2="1892" y2="920" stroke="#dedfe2" stroke-width="3"/><g font-family="${FONT}" font-size="29" fill="${C.graphite}"><circle cx="150" cy="1010" r="16" fill="${C.red}"/><text x="188" y="1020">${escapeXml(person.phone||company.phone)}</text><circle cx="770" cy="1010" r="16" fill="${C.red}"/><text x="808" y="1020">${escapeXml(person.email||company.email)}</text><circle cx="150" cy="1100" r="16" fill="${C.red}"/><text x="188" y="1110">${escapeXml(company.website)}</text><circle cx="770" cy="1100" r="16" fill="${C.red}"/><text x="808" y="1110">${escapeXml(company.cityCountry)}</text></g></g></svg>`}

export function renderBusinessCardBackSvg(_person:PersonProfile,company:CompanyProfile,logoDataUrl:string){return `<svg xmlns="http://www.w3.org/2000/svg" width="${BUSINESS_CARD_WIDTH}" height="${BUSINESS_CARD_HEIGHT}" viewBox="0 0 2022 1275"><defs><linearGradient id="bcb" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#111217"/><stop offset=".72" stop-color="#25272d"/><stop offset="1" stop-color="${C.redDark}"/></linearGradient><clipPath id="bcbc"><rect width="2022" height="1275" rx="54"/></clipPath><pattern id="bcbd" width="48" height="48" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="3" fill="#fff" fill-opacity=".035"/></pattern></defs><g clip-path="url(#bcbc)"><rect width="2022" height="1275" fill="url(#bcb)"/><rect width="2022" height="1275" fill="url(#bcbd)"/><rect y="1215" width="2022" height="60" fill="${C.red}"/><path d="M-180 280C360-120 720 380 1120 130s750-30 1080 180" fill="none" stroke="#fff" stroke-opacity=".045" stroke-width="140"/><g>${logo(logoDataUrl,621,270,780,420)}</g><text x="1011" y="790" text-anchor="middle" font-family="${FONT}" font-size="37" font-weight="800" fill="#fff" letter-spacing="7">${escapeXml(company.tagline.toUpperCase())}</text><rect x="710" y="850" width="602" height="4" fill="${C.red}"/><text x="1011" y="940" text-anchor="middle" font-family="${FONT}" font-size="29" fill="#fff" fill-opacity=".78">${escapeXml(company.website)}  •  ${escapeXml(company.email)}</text><text x="1011" y="1000" text-anchor="middle" font-family="${FONT}" font-size="27" fill="#fff" fill-opacity=".6">${escapeXml(company.cityCountry)}</text></g></svg>`}

export function renderPersonalBusinessCardBackSvg(person:PersonProfile,company:CompanyProfile,logoDataUrl:string){
  const profile=person.publicProfileUrl||company.website;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2022" height="1275" viewBox="0 0 2022 1275"><defs><linearGradient id="personalBack" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#111217"/><stop offset=".72" stop-color="#292b31"/><stop offset="1" stop-color="${C.redDark}"/></linearGradient><clipPath id="personalClip"><rect width="2022" height="1275" rx="54"/></clipPath></defs><g clip-path="url(#personalClip)"><rect width="2022" height="1275" fill="url(#personalBack)"/><rect y="1215" width="2022" height="60" fill="${C.red}"/><path d="M-180 280C360-120 720 380 1120 130s750-30 1080 180" fill="none" stroke="#fff" stroke-opacity=".045" stroke-width="140"/><g>${logo(logoDataUrl,230,250,700,380)}</g><text x="580" y="740" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="800" fill="#fff" letter-spacing="5">${escapeXml(company.tagline.toUpperCase())}</text><rect x="1210" y="220" width="590" height="590" rx="44" fill="#fff"/>${renderAbaQrCodeSvg(1250,260,510,profile)}<text x="1505" y="900" text-anchor="middle" font-family="${FONT}" font-size="29" font-weight="900" fill="#fff">SCANNEZ MON PROFIL</text><text x="1505" y="952" text-anchor="middle" font-family="${FONT}" font-size="22" fill="#fff" fill-opacity=".65">Portfolio professionnel vérifié</text><text x="1011" y="1080" text-anchor="middle" font-family="${FONT}" font-size="26" fill="#fff" fill-opacity=".65">${escapeXml(profile.replace(/^https?:\/\//,""))}</text></g></svg>`;
}

export function renderCardFrontSvg(person: PersonProfile, company: CompanyProfile, logoDataUrl: string) {
  const completeName = `${person.firstName} ${person.middleName} ${person.lastName}`.replace(/\s+/g, " ").trim() || "NOM PRÉNOM";
  const [name1, name2] = splitText(completeName.toUpperCase(), 22);
  const [job1, job2] = splitText(person.jobTitle || "Fonction", 31);
  const photo = person.photoDataUrl;
  const nameSize = completeName.length > 29 ? 57 : completeName.length > 22 ? 66 : 76;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1275" height="2022" viewBox="0 0 1275 2022" data-card-side="recto">
    <defs>
      <clipPath id="frontCard"><rect width="1275" height="2022" rx="72"/></clipPath>
      <clipPath id="frontPhoto"><path d="M637 418 1035 648v460l-398 230-398-230V648Z"/></clipPath>
      <linearGradient id="frontBg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.black}"/><stop offset=".52" stop-color="#25252b"/><stop offset="1" stop-color="${C.redDark}"/></linearGradient>
      <linearGradient id="frontAccent" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.redBright}"/><stop offset="1" stop-color="${C.redDark}"/></linearGradient>
      <pattern id="frontDots" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="4" fill="#fff" fill-opacity=".035"/></pattern>
      <pattern id="frontGuilloche" width="180" height="80" patternUnits="userSpaceOnUse"><path d="M0 40C30 4 60 76 90 40S150 4 180 40M0 48C30 12 60 84 90 48S150 12 180 48" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width="2"/></pattern>
      <filter id="frontShadow"><feDropShadow dx="0" dy="24" stdDeviation="26" flood-color="#000000" flood-opacity=".38"/></filter>
      <filter id="frontLogoLift"><feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#ffffff" flood-opacity=".7"/></filter>
    </defs>
    <g clip-path="url(#frontCard)">
      <rect width="1275" height="2022" fill="url(#frontBg)"/>
      ${organicBackground("front")}
      <g id="antiFraude" data-security-feature="guilloche-microprint">
        <rect x="42" y="350" width="1191" height="1120" rx="40" fill="url(#frontGuilloche)" opacity=".42"/>
        <text x="27" y="1510" transform="rotate(-90 27 1510)" font-family="${FONT}" font-size="11" font-weight="700" fill="#fff" fill-opacity=".34" letter-spacing="3">ABA • CARTE OFFICIELLE • ${escapeXml(person.employeeId || "ABA-0000")} • AUTHENTIC • ABA • CARTE OFFICIELLE</text>
        <g transform="translate(1115 1815)" fill="none" stroke="#fff" stroke-opacity=".28">
          <circle r="54" stroke-width="2"/><circle r="42" stroke-width="1"/><path d="M-50 0C-25-38 25 38 50 0M0-50C38-25-38 25 0 50" stroke-width="2"/>
        </g>
      </g>
      <rect x="0" y="1960" width="1275" height="62" fill="${C.black}" fill-opacity=".78"/>

      <g id="logo" data-dynamic-zone="logo">
        <g filter="url(#frontLogoLift)">${logo(logoDataUrl, 104, 82, 440, 224)}</g>
        <rect x="112" y="309" width="185" height="6" rx="3" fill="${C.redBright}"/>
      </g>
      <text x="1175" y="136" text-anchor="end" font-family="${FONT}" font-size="21" font-weight="800" fill="#ff7b83" letter-spacing="5">CARTE OFFICIELLE</text>
      <text x="1175" y="188" text-anchor="end" font-family="${FONT}" font-size="32" font-weight="900" fill="#fff">CARTE DE SERVICE</text>
      <text x="1175" y="236" text-anchor="end" font-family="${FONT}" font-size="19" font-weight="700" fill="#fff" fill-opacity=".66" letter-spacing="3">IDENTITÉ PROFESSIONNELLE</text>

      <g id="photo" data-dynamic-zone="photo">
        <path d="M637 382 1068 630v496l-431 249-431-249V630Z" fill="${C.black}" fill-opacity=".76" filter="url(#frontShadow)"/>
        <path d="M637 404 1048 641v474l-411 237-411-237V641Z" fill="url(#frontAccent)"/>
        <path d="M637 428 1027 653v450l-390 225-390-225V653Z" fill="#f1eeee"/>
        ${photo ? `<image href="${photo}" x="214" y="408" width="846" height="950" preserveAspectRatio="xMidYMid slice" clip-path="url(#frontPhoto)"/>` : `<g transform="translate(637 856)" fill="#aaa5a7"><circle cy="-125" r="116"/><path d="M-230 300c20-192 108-286 230-286s210 94 230 286z"/></g>`}
        <path d="M637 418 1035 648v460l-398 230-398-230V648Z" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="5"/>
      </g>

      <g id="nom" data-dynamic-zone="nom-complet">
        <text x="637" y="1485" text-anchor="middle" font-family="${FONT}" font-size="${nameSize}" font-weight="900" fill="#fff" letter-spacing="1">${escapeXml(name1)}</text>
        ${name2 ? `<text x="637" y="1562" text-anchor="middle" font-family="${FONT}" font-size="${nameSize}" font-weight="900" fill="#fff" letter-spacing="1">${escapeXml(name2)}</text>` : ""}
      </g>
      <g id="prenom" data-dynamic-zone="prenom"><title>${escapeXml(person.firstName)}</title></g>
      <g id="postNom" data-dynamic-zone="postNom"><title>${escapeXml(person.middleName)}</title></g>
      <g id="nomFamille" data-dynamic-zone="nom"><title>${escapeXml(person.lastName)}</title></g>
      <g id="fonction" data-dynamic-zone="fonction">
        <text x="637" y="${name2 ? 1640 : 1565}" text-anchor="middle" font-family="${FONT}" font-size="34" font-weight="800" fill="#ff6972" letter-spacing="2">${escapeXml(job1.toUpperCase())}</text>
        ${job2 ? `<text x="637" y="${name2 ? 1687 : 1612}" text-anchor="middle" font-family="${FONT}" font-size="34" font-weight="800" fill="#ff6972" letter-spacing="2">${escapeXml(job2.toUpperCase())}</text>` : ""}
      </g>
      <g id="departement" data-dynamic-zone="departement">
        <text x="637" y="${name2 || job2 ? 1750 : 1680}" text-anchor="middle" font-family="${FONT}" font-size="27" fill="#fff" fill-opacity=".78">${escapeXml(person.department || "Département")}</text>
      </g>
      <g id="matricule" data-dynamic-zone="matricule">
        <rect x="358" y="1807" width="558" height="86" rx="43" fill="${C.black}" fill-opacity=".8" stroke="#fff" stroke-opacity=".2" stroke-width="2"/>
        <circle cx="414" cy="1850" r="23" fill="${C.redBright}"/><path d="M404 1850h20M414 1840v20" stroke="#fff" stroke-width="4"/>
        <text x="457" y="1861" font-family="${FONT}" font-size="27" font-weight="800" fill="#fff" letter-spacing="3">ID : ${escapeXml(person.employeeId || "ABA-0000")}</text>
      </g>
      <text x="637" y="1999" text-anchor="middle" font-family="${FONT}" font-size="17" font-weight="700" fill="#fff" fill-opacity=".7" letter-spacing="5">EXPERTISE • INTÉGRITÉ • PERFORMANCE</text>
    </g>
  </svg>`;
}

export function renderCardBackSvg(_person: PersonProfile, company: CompanyProfile, logoDataUrl: string) {
  const website = cleanUrl(company.website);
  const [address1, address2] = splitText(company.address, 42);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1275" height="2022" viewBox="0 0 1275 2022" data-card-side="verso">
    <defs>
      <clipPath id="backCard"><rect width="1275" height="2022" rx="72"/></clipPath>
      <linearGradient id="backBg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.black}"/><stop offset=".5" stop-color="#29292e"/><stop offset="1" stop-color="${C.redDark}"/></linearGradient>
      <linearGradient id="backPanel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#101014" stop-opacity=".94"/><stop offset="1" stop-color="#4b0a10" stop-opacity=".88"/></linearGradient>
      <pattern id="backDots" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="4" fill="#fff" fill-opacity=".035"/></pattern>
      <pattern id="backGuilloche" width="180" height="80" patternUnits="userSpaceOnUse"><path d="M0 40C30 4 60 76 90 40S150 4 180 40M0 48C30 12 60 84 90 48S150 12 180 48" fill="none" stroke="#fff" stroke-opacity=".065" stroke-width="2"/></pattern>
      <filter id="backShadow"><feDropShadow dx="0" dy="24" stdDeviation="26" flood-color="#000000" flood-opacity=".38"/></filter>
      <filter id="backLogoLift"><feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#ffffff" flood-opacity=".7"/></filter>
    </defs>
    <g clip-path="url(#backCard)">
      <rect width="1275" height="2022" fill="url(#backBg)"/>
      ${organicBackground("back")}
      <g id="antiFraudeVerso" data-security-feature="guilloche-microprint">
        <rect x="36" y="320" width="1203" height="1645" rx="44" fill="url(#backGuilloche)" opacity=".36"/>
        <text x="36" y="1530" transform="rotate(-90 36 1530)" font-family="${FONT}" font-size="11" font-weight="700" fill="#fff" fill-opacity=".32" letter-spacing="3">AFRICA BUSINESS AGENCY • DOCUMENT PROFESSIONNEL • CONTRÔLE VISUEL • ABA</text>
      </g>

      <g id="logo-verso" data-dynamic-zone="logo">
        <g filter="url(#backLogoLift)">${logo(logoDataUrl, 92, 76, 390, 204)}</g>
        <rect x="103" y="292" width="165" height="6" rx="3" fill="${C.redBright}"/>
      </g>
      <text x="1175" y="134" text-anchor="end" font-family="${FONT}" font-size="20" font-weight="800" fill="#ff7b83" letter-spacing="5">AFRICA BUSINESS AGENCY</text>
      <text x="1175" y="189" text-anchor="end" font-family="${FONT}" font-size="35" font-weight="900" fill="#fff">INFORMATIONS</text>
      <text x="1175" y="234" text-anchor="end" font-family="${FONT}" font-size="24" font-weight="700" fill="#fff" fill-opacity=".7">ET CONDITIONS D’UTILISATION</text>

      <rect x="86" y="350" width="1103" height="1000" rx="54" fill="url(#backPanel)" stroke="#fff" stroke-opacity=".13" stroke-width="3" filter="url(#backShadow)"/>
      <text x="152" y="445" font-family="${FONT}" font-size="21" font-weight="800" fill="#ff6972" letter-spacing="5">COORDONNÉES INSTITUTIONNELLES</text>
      <line x1="152" y1="480" x2="1123" y2="480" stroke="#fff" stroke-opacity=".15" stroke-width="2"/>

      <g id="adresseEntreprise" data-dynamic-zone="adresseEntreprise">
        <text x="152" y="562" font-family="${FONT}" font-size="18" font-weight="800" fill="#ff8b92" letter-spacing="4">ADRESSE</text>
        <text x="152" y="615" font-family="${FONT}" font-size="31" font-weight="700" fill="#fff">${escapeXml(address1)}</text>
        ${address2 ? `<text x="152" y="660" font-family="${FONT}" font-size="31" font-weight="700" fill="#fff">${escapeXml(address2)}</text>` : ""}
        <text x="152" y="708" font-family="${FONT}" font-size="26" fill="#fff" fill-opacity=".72">${escapeXml(company.cityCountry)}</text>
      </g>
      <g id="telephoneEntreprise" data-dynamic-zone="telephoneEntreprise">
        <text x="152" y="810" font-family="${FONT}" font-size="18" font-weight="800" fill="#ff8b92" letter-spacing="4">TÉLÉPHONE</text>
        <text x="152" y="866" font-family="${FONT}" font-size="32" font-weight="800" fill="#fff">${escapeXml(company.phone)}</text>
      </g>
      <g id="emailEntreprise" data-dynamic-zone="emailEntreprise">
        <text x="152" y="968" font-family="${FONT}" font-size="18" font-weight="800" fill="#ff8b92" letter-spacing="4">E-MAIL</text>
        <text x="152" y="1024" font-family="${FONT}" font-size="32" font-weight="800" fill="#fff">${escapeXml(company.email)}</text>
      </g>
      <g id="siteWebEntreprise" data-dynamic-zone="siteWebEntreprise">
        <text x="152" y="1126" font-family="${FONT}" font-size="18" font-weight="800" fill="#ff8b92" letter-spacing="4">SITE INTERNET</text>
        <text x="152" y="1184" font-family="${FONT}" font-size="37" font-weight="900" fill="#fff">${escapeXml(website)}</text>
      </g>
      <text x="152" y="1278" font-family="${FONT}" font-size="21" fill="#fff" fill-opacity=".62">Propriété de ${escapeXml(company.legalName)}.</text>
      <g id="signatureResponsable" data-dynamic-zone="signatureResponsable">
        <path d="M720 1240h365" stroke="#fff" stroke-opacity=".58" stroke-width="2"/>
        <text x="902" y="1280" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="800" fill="#ff8b92" letter-spacing="2">SIGNATURE DU RESPONSABLE</text>
        <circle cx="1098" cy="1239" r="34" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="2"/>
        <path d="M1083 1239l10 10 21-23" fill="none" stroke="#ff6972" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <g id="qrCode" data-dynamic-zone="qrCode">
        <rect x="124" y="1422" width="610" height="516" rx="48" fill="#fff" filter="url(#backShadow)"/>
        ${renderAbaQrCodeSvg(151, 1449, 462)}
        <text x="674" y="1530" transform="rotate(90 674 1530)" font-family="${FONT}" font-size="22" font-weight="800" fill="${C.graphite}" letter-spacing="3">SCANNEZ</text>
      </g>
      <text x="790" y="1500" font-family="${FONT}" font-size="19" font-weight="800" fill="#ff8b92" letter-spacing="4">PORTAIL OFFICIEL</text>
      <text x="790" y="1562" font-family="${FONT}" font-size="44" font-weight="900" fill="#fff">Découvrez ABA</text>
      <text x="790" y="1610" font-family="${FONT}" font-size="25" fill="#fff" fill-opacity=".72">Scannez le QR code</text>
      <text x="790" y="1648" font-family="${FONT}" font-size="25" fill="#fff" fill-opacity=".72">ou visitez notre site.</text>
      <g id="reference" data-dynamic-zone="reference">
        <text x="790" y="1765" font-family="${FONT}" font-size="17" font-weight="800" fill="#ff8b92" letter-spacing="3">RÉFÉRENCE</text>
        <text x="790" y="1810" font-family="${FONT}" font-size="27" font-weight="800" fill="#fff">${escapeXml(company.cardReference)}</text>
      </g>
      <g id="validite" data-dynamic-zone="validite">
        <text x="790" y="1880" font-family="${FONT}" font-size="17" font-weight="800" fill="#ff8b92" letter-spacing="3">VALIDITÉ</text>
        <text x="790" y="1925" font-family="${FONT}" font-size="24" font-weight="700" fill="#fff">${escapeXml(company.validityLabel)}</text>
      </g>
    </g>
  </svg>`;
}
