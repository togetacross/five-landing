// app/components/CookieConsent.js
"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "cookie_consent_v2";

const DEFAULT = {
  decided: false,
  necessary: true,
  analytics: false,
  marketing: false,
};

function loadConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT,
      ...parsed,
      necessary: true,
    };
  } catch {
    return DEFAULT;
  }
}

function saveConsent(consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export default function CookieConsent() {
  const [consent, setConsent] = useState(DEFAULT);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = loadConsent();
    setConsent(c);
    setOpen(!c.decided); // első látogatásnál automatikusan megjelenik
  }, []);

  const summary = useMemo(() => {
    if (!consent.decided) return "Nincs beállítva";
    const parts = ["Szükséges"];
    if (consent.analytics) parts.push("Statisztika");
    if (consent.marketing) parts.push("Marketing");
    return parts.join(" + ");
  }, [consent]);

  function toggle(field) {
    setConsent((prev) => {
      const next = { ...prev, [field]: !prev[field] };
      if (field === "necessary") next.necessary = true;
      return next;
    });
  }

  function acceptAll() {
    const finalState = {
      decided: true,
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsent(finalState);
    saveConsent(finalState);
    setOpen(false);
  }

  function savePrefs() {
    const finalState = {
      decided: true,
      necessary: true,
      analytics: !!consent.analytics,
      marketing: !!consent.marketing,
    };
    setConsent(finalState);
    saveConsent(finalState);
    setOpen(false);
  }

  return (
    <>
      {/* Sticky ikon – módosításhoz */}
      <button
        type="button"
        className={styles.fab}
        onClick={() => setOpen(true)}
        aria-label={`Cookie beállítások megnyitása. Jelenlegi: ${summary}`}
        title="Cookie beállítások"
      >
        🍪
      </button>

      {/* Sáv / panel alul */}
      <div
        className={`${styles.bar} ${open ? styles.barOpen : styles.barClosed}`}
        role="dialog"
        aria-modal="false"
        aria-label="Cookie hozzájárulás"
      >
        <div className={styles.inner}>
          <div className={styles.head}>
            <div>
              <div className={styles.title}>Cookie beállítások</div>
              <div className={styles.text}>
                Weboldalunk sütiket használ a működéshez (szükséges), valamint — az Ön
                hozzájárulása esetén — statisztikai és marketing célokra. A beállításokat
                bármikor módosíthatja.
              </div>
              <a className={styles.link} href="/adatkezeles">
                Adatkezelési tájékoztató
              </a>
            </div>

            {/* 2 gomb: desktop/tablet egymás mellett, mobilon egymás alatt */}
            <div className={styles.actionsTop}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={savePrefs}
              >
                Mentse el a beállításokat
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSoft}`}
                onClick={acceptAll}
              >
                Összes elfogadása
              </button>
            </div>
          </div>

          {/* Preferenciák (checkboxok) */}
          <div className={styles.prefs}>
            <label className={styles.row}>
              <input type="checkbox" checked disabled />
              <span className={styles.rowText}>
                <b>Szükséges</b> – a weboldal alap működéséhez elengedhetetlen.
              </span>
            </label>

            <label className={styles.row}>
              <input
                type="checkbox"
                checked={!!consent.analytics}
                onChange={() => toggle("analytics")}
              />
              <span className={styles.rowText}>
                <b>Statisztika</b> – látogatottság mérése, oldal fejlesztése.
              </span>
            </label>

            <label className={styles.row}>
              <input
                type="checkbox"
                checked={!!consent.marketing}
                onChange={() => toggle("marketing")}
              />
              <span className={styles.rowText}>
                <b>Marketing</b> – személyre szabott tartalom/ajánlatok.
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
