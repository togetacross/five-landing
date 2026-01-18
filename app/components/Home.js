import Head from 'next/head';
import Link from 'next/link';
import styles from './Home.module.css';
import PacksSection from './PacksSection.js'

export default function Home() {

  return (
    <>
      {/* HERO*/}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroMedia} aria-hidden="true">
          <img 
            src="/imgs/latvany.jpg" 
            alt="Five projekt" 
            className={styles.heroImg} 
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.container}>
          <div className={styles.heroInner}>
            <div className={styles.heroTop}>
              <div className={styles.heroTopText}>
                <h1 id="hero-title" className={styles.h1}>
                  FIVE° Projekt
                  <span className={styles.subH1}>Egy más szemszög</span>
                </h1>
              </div>
            </div>

            <div className={styles.heroBottom}>
              <div className={styles.heroMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Lokáció</span>
                  <span className={styles.metaValue}>Vámosszabadi</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Győr belváros</span>
                  <span className={styles.metaValue}>~5 perc</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Lakások</span>
                  <span className={styles.metaValue}>40-106 m²</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Koncepció</span>
                  <span className={styles.metaValue}>Egyedi ajánlatok</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* MIÉRT MÁS */}
      <section id="miert-mas" className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="why-title">
        <div className={styles.splitHead}>
          <div className={styles.splitText}>
            <p className={styles.kicker}>KONCEPCIÓ</p>
            <h2 id="why-title" className={styles.h2_light}>
              MIÉRT MÁS?
            </h2>
            <p className={styles.muted}>
              A FIVE° koncepciója abból indul ki, hogy a
              lakásvásárlás ne legyen bonyolult és átláthatatlan
              folyamat.</p>
            <p className={styles.muted}>A tervezés során kiemelt szempont volt
              az egyszerű döntéshozatal, az előre tervezhető
              műszaki tartalom és a jól strukturált kivitelezés.</p>
            <p className={styles.muted}>
              A projekt egy más szemszögből közelíti meg az
              otthon fogalmát: tudatos koncepció, átlátható rendszer, jól arányolt terek, egységes színvonal, időtálló érték.
            </p>
          </div>
          <div
            className={styles.splitMedia}
            aria-hidden="true"
            style={{ backgroundImage: 'url("/imgs/Szitasdomb_antracit_4.png")' }}
          />

        </div>

        <div className={styles.featureGrid} role="list">
          <article className={styles.feature} role="listitem">
            <span className={styles.featureNum} aria-hidden="true">1</span>
            <h3 className={styles.featureTitle}>Tudatos koncepció</h3>
          </article>

          <article className={styles.feature} role="listitem">
            <span className={styles.featureNum} aria-hidden="true">2</span>
            <h3 className={styles.featureTitle}>Átlátható rendszer</h3>
          </article>

          <article className={styles.feature} role="listitem">
            <span className={styles.featureNum} aria-hidden="true">3</span>
            <h3 className={styles.featureTitle}>Jól arányolt terek</h3>
          </article>

          <article className={styles.feature} role="listitem">
            <span className={styles.featureNum} aria-hidden="true">4</span>
            <h3 className={styles.featureTitle}>Egységes színvonal</h3>
          </article>

          <article className={styles.feature} role="listitem">
            <span className={styles.featureNum} aria-hidden="true">5</span>
            <h3 className={styles.featureTitle}>Időtálló érték</h3>
          </article>
        </div>


      </section>

      {/* MŰSZAKI */}
      <section className={styles.section} aria-labelledby="tech-title">
        <div className={styles.sectionHead}>
          {/*
            <p className={styles.kicker}>MŰSZAKI TARTALOM</p>
          */}
          <h2 id="tech-title" className={styles.h2_dark}>
            MŰSZAKI TARTALOM
          </h2>

          <div className={styles.techGrid} role="list">
            <article className={styles.techCard} role="listitem">
              <h3 className={styles.cardTitle}>Szerkezet & falazat</h3>
              <p className={styles.cardText}>Az épület korszerű, masszív
                szerkezettel készül. A főfalak 30 cm
                vastag vázkerámia téglából, a lakások
                közötti elválasztó falak pedig
                hanggátló kivitelben (57 dB) épülnek,
                amely kimagasló zajvédelmet biztosít
                a lakások között.
              </p>
              <p className={styles.cardText}>
                A födémek 20 cm vastag monolit
                vasbeton szerkezetűek, a lapostető
                kavicsolt kialakítású, hosszú távon is
                stabil megoldással.</p>
            </article>

            <article className={styles.techCard} role="listitem">
              <h3 className={styles.cardTitle}>Hő- és hangszigetelés</h3>
              <p className={styles.cardText}>
                Az épület kiemelten hőszigetelt: a homlokzaton
                15 cm vastag hőszigetelő rendszer, a tetőn
                pedig minimum 25cm hőszigetelés készül.
              </p>
              <p className={styles.cardText}>
                A külső nyílászárók 3 rétegű
                hőszigetelő üvegezéssel ellátott
                műanyag ablakok, kiváló hő- és
                hangszigetelési tulajdonságokkal.
                A bejárati ajtók biztonsági kivitelűek,
                minimum 33 dB hangszigeteléssel.
              </p>
              <p className={styles.cardText}>
                A lakások közötti elválasztó falak hanggátló kivitelben,
                57 dB léghanggátlással készülnek, amely kimagasló zajvédelmet biztosít a lakások között.
              </p>
            </article>
            <article className={styles.techCard} role="listitem">
              <h3 className={styles.cardTitle}>Fűtés</h3>
              <p className={styles.cardText}>Házközpontú, korszerű gázkazános fűtés, lakásonként egyedi hőmennyiségmérővel.</p>
              <p className={styles.cardText}>
                A lakásokban padlófűtés, a fürdőszobákban törölközőszárító radiátor biztosítja a komfortot.
                A tervezett energetikai besorolás C–C.</p>
            </article>
          </div>
        </div>
      </section>

      {/* KULCSRAKÉSZ */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="turnkey-title">
        <div className={styles.splitHead}>
          <div
            className={styles.splitMedia}
            aria-hidden="true"
            style={{ backgroundImage: 'url("/imgs/Szitasdomb_antracit_1.png")' }}
          />
          <div className={styles.splitText}>
            <p className={styles.kicker}>KULCSRAKÉSZ KIVITEL</p>
            <h2 id="turnkey-title" className={styles.h2_light}>
              Mit jelent a kulcsrakész kivitel?
            </h2>
            <p className={styles.muted}>
              A kulcsrakész kivitel azt jelenti, hogy a lakások teljes belső
              befejezéssel kerülnek átadásra. Ez magában foglalja a
              burkolást, a szaniterek beépítését, a beltéri ajtók
              felszerelését, a festést, valamint az elektromos és
              gépészeti szerelvényezést.
            </p>
            <p className={styles.muted}>
              Egy otthon kialakítása összetett folyamat. Mi ebben nyújtunk segítséget olyan kulcsrakész megoldásokkal, amelyek mögött tudatos tervezés, szakmai tapasztalat és esztétikai egység áll.
            </p>
          </div>
        </div>

        <div className={styles.splitHead}>
          <div className={styles.splitText}>

            <h2 id="turnkey-title" className={styles.h2_light}>
              Professzionális tervezés
            </h2>

            <p className={styles.muted}>
              A csomagok összeállítását több éves szakmai tapasztalattal rendelkező designerek végezték, akik a legfrissebb lakberendezési trendek figyelembevételével alakították ki a belső enteriőröket.
              Munkájukat professzionális szemlélet jellemzi: több száz sikeres tervezés és több száz elégedett ügyfél áll mögöttük.
            </p>
            <p className={styles.muted}>
              Két eltérő szemléletű ajánlat közül lehet választani – attól függően, hogy a hangsúly az előre megtervezett biztonságon vagy a teljes személyre szabhatóságon van.
            </p>
            {/*
            <p className={styles.muted}>
              A kulcsrakész befejezés nem tartalmaz
              konyhabútort, így az új tulajdonos saját igényei
              és stílusa szerint alakíthatja ki a konyhát.
            </p>
              */}
          </div>
          <div
            className={styles.splitMedia}
            aria-hidden="true"
            style={{ backgroundImage: 'url("/imgs/Szitasdomb_antracit_8.png")' }}
          />
        </div>
      </section >

      <PacksSection />

      <div className={styles.bottomCta}>
          <div>
            <h3 className={styles.h3}>Nézd meg az elérhető lakásokat</h3>
            <p className={''}>Alapterület, ár, elrendezés – minden egy helyen.</p>
          </div>
          <Link className={styles.btnPrimary} href="/lakasok">
            Elérhető lakások
          </Link>
      </div>
    </>
  );
}
