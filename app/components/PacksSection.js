import Link from "next/link";
import styles from "./PacksSection.module.css";

export default function PacksSection() {
    return (
        <section className={styles.pkg} id="csomagok" aria-labelledby="pkg-title">
            <div className={styles.container}>
                <div className={styles.pkgHead}>
                    <p className={styles.kicker}>VÁLASZTHATÓ CSOMAGOK</p>
                    <h2 id="packs-title" className={styles.h2}>
                        Te döntesz a befejezésről
                    </h2>
                </div>

                <div className={styles.pkgGrid} role="list">
                    {/* GOLD */}
                    <article
                        className={`${styles.tier} ${styles.tierGold}`}
                        role="listitem"
                        aria-labelledby="gold-title"
                    >
                        <div className={styles.tierBadge} aria-hidden="true">
                            GOLD
                        </div>

                        <div className={styles.tierTop}>
                            <h3 className={styles.tierTitle} id="gold-title">
                                Gold csomag
                            </h3>
                            <p className={styles.tierDesc}>
                                Előre megtervezett biztonság, egységes megjelenés
                            </p>
                            <p className={styles.tierDesc}>
                                A Gold ajánlat azoknak szól, akik értékelik a szakmailag
                                előkészített döntéseket, és szeretnének biztosak lenni abban,
                                hogy az otthonuk minden részlete harmonikus egységet alkot.
                                A belsőépítészeti koncepciókat tapasztalt designerek komplex
                                szemlélettel állították össze.
                            </p>
                            <p className={styles.tierDesc}>
                                A megrendelő három, gondosan
                                megtervezett stílus- és színvilág közül választhat:
                            </p>
                        </div>

                        <div
                            className={styles.silverSubpacks}
                            role="list"
                            aria-label="Silver alcsomagok"
                        >
                            {/* 1 */}
                            <section
                                className={styles.subpack}
                                role="listitem"
                                aria-labelledby="silver-1-title"
                            >
                                <div
                                    className={styles.splitMedia}
                                    aria-hidden="true"
                                    style={{ backgroundImage: 'url("/imgs/Viza7_1_3.png")' }}
                                />
                                <div className={styles.subpackBody}>
                                    <h4 className={styles.subpackTitle} id="silver-1-title">
                                        BEIGE
                                    </h4>
                                    <p className={styles.subpackText}>
                                        Világos, időtálló és rugalmas alappaletta, ami szinte
                                        bármilyen bútor- és dekorvilággal működik. 
                                    </p>
                                    <p className={styles.subpackText}>
                                        A bézs árnyalatok
                                        optikailag tágítják a teret, erősítik a fényt, és nyugodt,
                                        harmonikus hátteret adnak. 
                                    </p>
                                    <p className={styles.subpackText}>
                                        Különösen jó kisebb vagy kevésbé
                                        benapozott helyiségekben, illetve ha olyan otthont
                                        szeretnél, amit később könnyű új stílushoz igazítani
                                        (skandináv, modern, klasszikus, japandi).
                                    </p>
                                </div>
                            </section>

                            {/* 2 */}
                            <section
                                className={styles.subpack}
                                role="listitem"
                                aria-labelledby="silver-2-title"
                            >
                                <div
                                    className={styles.splitMedia}
                                    aria-hidden="true"
                                    style={{ backgroundImage: 'url("/imgs/Szitas_terra_1.png")' }}
                                />
                                <div className={styles.subpackBody}>
                                    <h4 className={styles.subpackTitle} id="silver-2-title">
                                        TERRA
                                    </h4>
                                    <p className={styles.subpackText}>
                                        Meleg, természetközeli alap földszínekre és organikus
                                        felületekre hangolva.
                                    </p>
                                    <p className={styles.subpackText}>
                                        A terra tónusok barátságosabb
                                        térérzetet adnak, jól működnek fa hatású elemekkel,
                                        bézs–homok textíliákkal és matt felületekkel.
                                    </p>
                                    <p className={styles.subpackText}>
                                        Kifejezetten
                                        jó választás, ha otthonos, „lakható” atmoszférát szeretnél,
                                        ami hosszú távon sem fárasztó, és szépen viseli a mindennapi
                                        használatot.
                                    </p>
                                </div>
                            </section>

                            {/*3 */}
                            <section
                                className={styles.subpack}
                                role="listitem"
                                aria-labelledby="silver-3-title"
                            >
                                <div
                                    className={styles.splitMedia}
                                    aria-hidden="true"
                                    style={{
                                        backgroundImage: 'url("/imgs/Szitasdomb_antracit_8.png")',
                                    }}
                                />
                                <div className={styles.subpackBody}>
                                    <h4 className={styles.subpackTitle} id="silver-3-title">
                                        ANTRACIT
                                    </h4>
                                    <p className={styles.subpackText}>
                                        Kortárs, karakteres és határozott megjelenés, modern
                                        kontrasztokkal.
                                    </p>
                                    <p className={styles.subpackText}>
                                        Az antracit felületek vizuális rendet és
                                        eleganciát adnak, különösen jól állnak világos falakkal,
                                        természetes fával, fémes részletekkel.
                                    </p>
                                    <p className={styles.subpackText}>
                                        Praktikus előny: a
                                        sötétebb tónusok sok felületen jobban „elrejtik” a napi
                                        igénybevétel nyomait, miközben prémium, építészeti hatást
                                        keltenek. Ideális, ha letisztult, városias stílust keresel.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </article>

                    {/* PLATINUM */}
                    <article
                        className={`${styles.tier} ${styles.tierPlatinum}`}
                        role="listitem"
                        aria-labelledby="platinum-title"
                    >
                        <div className={styles.tierBadge} aria-hidden="true">
                            PLATINA
                        </div>

                        <div className={styles.tierTop}>
                            <h3 className={styles.tierTitle} id="platinum-title">
                                Platina csomag
                            </h3>
                            <p className={styles.tierDesc}>
                                Teljes szabadság, személyre szabott belsőépítészet.
                            </p>
                            <p className={styles.tierDesc}>
                                A Platina ajánlat azok számára készült, akik az otthonukat egyedi
                                alkotásként kezelik, és minden részletet saját elképzelésük
                                szerint szeretnének kialakítani.
                            </p>
                            <p className={styles.tierDesc}>
                                Ebben a konstrukcióban egyedi belsőépítészeti koncepció készül, személyre szabott
                                anyag- és színválasztással.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
