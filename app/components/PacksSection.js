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
                    {/* Silver */}
                    <article
                        className={`${styles.tier} ${styles.tierSilver}`}
                        role="listitem"
                        aria-labelledby="silver-title"
                    >
                        <div className={styles.tierBadge} aria-hidden="true">
                            SILVER
                        </div>

                        <div className={styles.tierTop}>
                            <h3 className={styles.tierTitle} id="psilver-title">
                                Silver csomag
                            </h3>
                            <p className={styles.tierDesc}>
                                A Silver csomag ideális választás azok számára, akik szeretnék
                                <strong> saját elképzeléseik szerint</strong> befejezni otthonukat, miközben a
                                kivitelezés során szakember támogatására támaszkodhatnak.
                            </p>
                            <p className={styles.tierDesc}>
                                Ez a csomag maximális szabadságot biztosít: Ön dönti el a
                                stílust, az anyagokat és a részleteket, mi pedig <strong>biztosítjuk azt
                                    a szakmai hátteret</strong>, amelyre a minőségi megvalósításhoz szükség
                                van.
                            </p>
                        </div>
                    </article>

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
                                hogy az otthonuk minden részlete harmonikus egységet alkot. A
                                belsőépítészeti koncepciókat tapasztalt designerek komplex
                                szemlélettel állították össze.
                            </p>
                            <p className={styles.tierDesc}>
                                A weboldalon feltüntetett kulcsrakész árak a Gold csomag aktuális tartalmán alapulnak,
                                így az ajánlat a közzététel időpontjában érvényes csomagösszeállítást tükrözi.
                            </p>
                            <p className={styles.tierDesc}>
                                A megrendelő három, gondosan megtervezett stílus- és színvilág
                                közül választhat:
                            </p>
                        </div>

                        <div
                            className={styles.silverSubpacks}
                            role="list"
                            aria-label="Gold alapcsomagok"
                        >
                            {/* 1 */}
                            <section
                                className={styles.subpack}
                                role="listitem"
                                aria-labelledby="gold-1-title"
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
                                        A bézs árnyalatok optikailag tágítják a teret, erősítik a
                                        fényt, és nyugodt, harmonikus hátteret adnak.
                                    </p>
                                    <p className={styles.subpackText}>
                                        Különösen jó kisebb vagy kevésbé benapozott helyiségekben,
                                        illetve ha olyan otthont szeretnél, amit később könnyű új
                                        stílushoz igazítani (skandináv, modern, klasszikus,
                                        japandi).
                                    </p>
                                </div>
                            </section>

                            {/* 2 */}
                            <section
                                className={styles.subpack}
                                role="listitem"
                                aria-labelledby="gold-2-title"
                            >
                                <div
                                    className={styles.splitMedia}
                                    aria-hidden="true"
                                    style={{ backgroundImage: 'url("/imgs/Szitas_terra_1.png")' }}
                                />
                                <div className={styles.subpackBody}>
                                    <h4 className={styles.subpackTitle} id="gold-2-title">
                                        TERRA
                                    </h4>
                                    <p className={styles.subpackText}>
                                        Meleg, természetközeli alap földszínekre és organikus
                                        felületekre hangolva.
                                    </p>
                                    <p className={styles.subpackText}>
                                        A terra tónusok barátságosabb térérzetet adnak, jól működnek
                                        fa hatású elemekkel, bézs–homok textíliákkal és matt
                                        felületekkel.
                                    </p>
                                    <p className={styles.subpackText}>
                                        Kifejezetten jó választás, ha otthonos, „lakható”
                                        atmoszférát szeretnél, ami hosszú távon sem fárasztó, és
                                        szépen viseli a mindennapi használatot.
                                    </p>
                                </div>
                            </section>

                            {/*3 */}
                            <section
                                className={styles.subpack}
                                role="listitem"
                                aria-labelledby="gold-3-title"
                            >
                                <div
                                    className={styles.splitMedia}
                                    aria-hidden="true"
                                    style={{
                                        backgroundImage: 'url("/imgs/Szitasdomb_antracit_8.png")',
                                    }}
                                />
                                <div className={styles.subpackBody}>
                                    <h4 className={styles.subpackTitle} id="gold-3-title">
                                        ANTRACIT
                                    </h4>
                                    <p className={styles.subpackText}>
                                        Kortárs, karakteres és határozott megjelenés, modern
                                        kontrasztokkal.
                                    </p>
                                    <p className={styles.subpackText}>
                                        Az antracit felületek vizuális rendet és eleganciát adnak,
                                        különösen jól állnak világos falakkal, természetes fával,
                                        fémes részletekkel.
                                    </p>
                                    <p className={styles.subpackText}>
                                        Praktikus előny: a sötétebb tónusok sok felületen jobban
                                        „elrejtik” a napi igénybevétel nyomait, miközben prémium,
                                        építészeti hatást keltenek. Ideális, ha letisztult, városias
                                        stílust keresel.
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
                                <strong>
                                    Teljes szabadság. Egyedi design. Kulcsrakész tökéletesség.
                                </strong>
                            </p>
                            <p className={styles.tierDesc}>
                                A Platina csomag azoknak szól, akik az otthonukat nem csupán
                                élettérnek, hanem személyiségük kifejezésének tekintik.
                            </p>
                            <p className={styles.tierDesc}>
                                Ebben a konstrukcióban a tervezés egy szoros, személyes
                                egyeztetési folyamat, ahol a belsőépítészek és designerek az Ön
                                elképzeléseit, életstílusát és ízlését alapul véve egyedi,
                                megismételhetetlen otthont álmodnak meg.
                            </p>
                            <p className={styles.tierDesc}>
                                A közös munka során <strong>teljes körű belsőépítészeti koncepció</strong>
                                készül, amely magában foglalja a térszervezést, az anyag- és
                                színválasztást, a világítás megtervezését, valamint a bútorozás
                                és kiegészítők harmonikus összehangolását.
                            </p>
                            <p className={styles.tierDesc}>
                                A tervezési folyamatot részletes <strong>látványtervek</strong> és <strong>vizuális
                                    prezentációk</strong> kísérik, így az otthon már a kivitelezés előtt
                                életre kel.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
