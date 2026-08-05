import QRCode from "qrcode";
import { companyConfig } from "@/config/identity-studio-company";

const QUIET_ZONE_MODULES = 4;

/**
 * Produit un QR vectoriel pur, avec correction d'erreur Q et zone de silence
 * réglementaire de quatre modules. Le tracé reste net à toute résolution.
 */
export function getAbaQrCodeGeometry(value=companyConfig.qrCodeUrl) {
  const qr = QRCode.create(value, {
    errorCorrectionLevel: "Q",
  });
  const size = qr.modules.size;
  const totalModules = size + QUIET_ZONE_MODULES * 2;
  const cells: string[] = [];

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      if (qr.modules.get(row, column)) {
        cells.push(
          `<rect x="${column + QUIET_ZONE_MODULES}" y="${row + QUIET_ZONE_MODULES}" width="1" height="1"/>`,
        );
      }
    }
  }

  return { totalModules, cells: cells.join("") };
}

export function AbaQrCode({
  className,
  title = "QR code vers le site officiel ABA",
  value=companyConfig.qrCodeUrl,
}: {
  className?: string;
  title?: string;
  value?:string;
}) {
  const { totalModules, cells } = getAbaQrCodeGeometry(value);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${totalModules} ${totalModules}`}
      role="img"
      aria-label={title}
      shapeRendering="crispEdges"
    >
      <title>{title}</title>
      <rect width={totalModules} height={totalModules} fill="#ffffff" />
      <g fill="#07182b" dangerouslySetInnerHTML={{ __html: cells }} />
    </svg>
  );
}

/** SVG interne destiné au moteur commun preview / PNG / PDF. */
export function renderAbaQrCodeSvg(x: number, y: number, size: number,value=companyConfig.qrCodeUrl) {
  const { totalModules, cells } = getAbaQrCodeGeometry(value);
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 ${totalModules} ${totalModules}" shape-rendering="crispEdges" aria-label="QR code vers aba.cd">
    <rect width="${totalModules}" height="${totalModules}" fill="#ffffff"/>
    <g fill="#07182b">${cells}</g>
  </svg>`;
}
