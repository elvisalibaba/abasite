"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ABALoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const storageKey = "aba-intro-seen";
    if (window.sessionStorage.getItem(storageKey)) {
      setVisible(false);
      return;
    }

    window.sessionStorage.setItem(storageKey, "true");
    const timer = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return (
    <div className="aba-loader" role="status" aria-label="Chargement du site Africa Business Agency">
      <div className="aba-loader-grid" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="aba-loader-orbit" aria-hidden="true"><i /><i /><i /></div>
      <div className="aba-loader-mark">
        <Image src="/image.png" alt="Africa Business Agency" width={210} height={120} priority />
        <span aria-hidden="true" />
      </div>
      <p>Expertise <i /> Intégrité <i /> Performance</p>
      <div className="aba-loader-progress" aria-hidden="true"><span /></div>
      <div className="aba-loader-system" aria-hidden="true"><span>ABA / SYSTEM</span><span>INITIALISATION SÉCURISÉE</span></div>
    </div>
  );
}
