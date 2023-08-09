import styles from "./Overlay.module.scss";
import { FormControlLabel, Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { useSelector } from "react-redux";
import { motion, useScroll } from 'framer-motion'
import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { styled } from '@mui/material/styles';
import { OrbitControls, Preload } from '@react-three/drei'
import Computers from "./scene/Computer";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? 'black' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? 'black' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'black' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export function Overlay() {
  const dispatch = useDispatch();
  const test = useRef()
  const { theme } = useSelector((state) => state.theme);
  const [displayModal, setDisplayModal] = useState(false)
  const [modalData, setModalData] = useState(null)
  const arrayPictures = [
    ["argentbank/argentbank.png", "ArgentBank", ["HTML", "CSS", "React", "Redux", "Typescript"], ["Création d'une application web permettant aux clients de se connecter et de gérer leurs comptes et leur profil", "Création des endpoints d’API nécessaires pour une éventuelle deuxième mission une fois que nous aurons terminé la première"], ["Mai 2023"], ["argentbank/argentbank.png", "argentbank1/argentbank.png"]],
    ["billed/billed.png", "Billed", ["Chrome Debugger", "Jest"], ["Débugger une application web avec le Chrome Debugger", "Ecrire des tests unitaires et d'intégration avec JavaScript", "Rédiger un plan de test end-to-end manuel"], ["Décembre 2022"], ["billed/billed.png"]],
    ["fisheye/fisheye.png", "Fisheye", ["HTMl", "CSS", "Javascript", "Accessibilité web", "Fetch API"], ["Assurer l'accessibilité d'un site web", "Gérer les évènements d'un site avec JavaScript", "Développer une application web modulaire avec des design patterns", "Ecrire du code JavaScript maintenable."], ["Octobre 2022"], ["fisheye/fisheye.png", "fisheye/fisheye1.png", "fisheye/fisheye2.png", "fisheye/fisheye3.png"]],
    ["gameon/gameon.png", "GameOn", ["HTMl", "CSS", "Javascript"], ["Programmer en JavaScript"], ["Septembre 2022"], ["gameon/gameon.png", "gameon/gameon1.png", "gameon/gameon2.png", "gameon/gameon3.png"]],
    ["hrnet/hrnet.png", "Hrnet", ["React", "Typescript"], ["Analyser la performance d'une application web", "Déployer une application front-end", "Refondre une application pour réduire la dette technique", "Mettre en place son environnement Front-End", "Produire de la documentation technique pour une application"], ["Juillet 2023"], ["hrnet/hrnet.png", "hrnet/hrnet1.png", "hrnet/hrnet2.png", "hrnet/hrnet3.png"]],
    ["kasa/kasa.png", "Kasa", ["React", "Typescript"], ["Créer des composants avec React", "Développer les routes d'une application web avec React Router", "Initialiser une application web avec un framework"], ["Février 2023"], ["kasa/kasa.png", "kasa/kasa1.png", "kasa/kasa2.png"]],
    ["lespetitsplats/lespetitsplats.png", "Les petits plats", ["HTLM", "CSS", "Javascript"], ["Analyser un problème informatique", "Développer un algorithme pour résoudre un problème."], ["Novembre 2022"], ["lespetitsplats/lespetitsplats.png", "lespetitsplats/lespetitsplats1.png", "lespetitsplats/lespetitsplats2.png", "lespetitsplats/lespetitsplats3.png"]],
    ["sportsee/sportsee.png", "SportSee", ["HTMl", "CSS", "React", "Typescript", "Fetch API"], ["Assurer la qualité des données d'une application", "Développer des éléments graphiques avancés à l'aide de bibliothèques JavaScript", "Interagir avec un service Web."], ["Mai 2023"], ["sportsee/sportsee.png", "sportsee/sportsee1.png"]],
  ];
  const [index, setIndex] = useState(0);
  //const [type, setType] = useState("js");
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        className={styles.progressBar}
        style={{ scaleX: scrollYProgress }}
      />
      {displayModal === true && (

        <div className={`${styles.modal} ${theme === "light" ? styles.modal__light : styles.modal__dark}`}>
          <button className={styles.modal__btn} onClick={() => {
            setDisplayModal(false);
            setModalData(null)
          }}><span className={styles.modal__btn__cross}>&times;</span></button>

          <h1 className={`${theme === "light" ? styles.modal__h1__light : styles.modal__h1__dark}`}>{modalData[1]}</h1>
          <div className={styles.modal__div}>
            <div className={styles.modal__div__left}>
              <p className={`${styles.modal__div__left__p} ${theme === "light" ? styles.modal__div__left__p__light : styles.modal__div__left__p__dark}`}>Technologie utilisé</p>
              <ul className={styles.modal__div__left__ul}>
                {modalData[2].map((data) => {
                  return (<li className={`${theme === "light" ? styles.modal__div__left__ul__li__light : styles.modal__div__left__ul__li__dark}`}>{data}</li>)

                })}
              </ul>
              <p className={`${styles.modal__div__left__p} ${theme === "light" ? styles.modal__div__left__p__light : styles.modal__div__left__p__dark}`}>Compétences aquises</p>
              <ul className={styles.modal__div__left__ul}>
                {modalData[3].map((data) => {
                  return (<li className={`${theme === "light" ? styles.modal__div__left__ul__li__light : styles.modal__div__left__ul__li__dark}`}>{data}</li>)

                })}
              </ul>
              <p className={`${styles.modal__div__left__p} ${theme === "light" ? styles.modal__div__left__p__light : styles.modal__div__left__p__dark}`}>{modalData[4]}</p>
              <p className={`${styles.modal__div__left__p} ${theme === "light" ? styles.modal__div__left__p__light : styles.modal__div__left__p__dark}`}>Ouvrir le site</p>
              <p className={`${styles.modal__div__left__p} ${theme === "light" ? styles.modal__div__left__p__light : styles.modal__div__left__p__dark}`}>Ouvrir le repository Github</p>
            </div>
            <div className={styles.modal__div__right}>
              <img alt="" className={`${theme === "dark" ? styles.modal__div__right__img__dark : styles.modal__div__right__img__light} ${styles.modal__div__right__img}`} src={`../assets/img/${modalData[5][index]}`} />
              <div className={styles.modal__div__right__div}>
                <button className={styles.modal__div__right__div__btn} onClick={() => {
                  let length = Object.entries(modalData[5]).length
                  if (index === 0) {
                    setIndex(length - 1)
                  } else {
                    setIndex(index - 1)
                  }
                }}>Précedent</button>
                <span className={`${styles.modal__div__right__div__span} ${theme === "light" ? styles.modal__div__right__div__span__light : styles.modal__div__right__div__span__dark}`}>{index + 1} / {Object.entries(modalData[5]).length}</span>
                <button className={styles.modal__div__right__div__btn} onClick={() => {
                  let length = Object.entries(modalData[5]).length
                  if (index === length - 1) {
                    setIndex(0)
                  } else {
                    setIndex(index + 1)
                  }

                }}>Suivant</button>
              </div>
            </div>


          </div>


        </div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "999",
        }}
      >
        <FormControlLabel
        style={theme === "light" ? {color: 'black'} : {color: 'white'}}
          value="top"
          control={
            <MaterialUISwitch sx={{ m: 1 }} onChange={() =>
              dispatch({
                type: "theme/changeTheme",
              })
            }d />

          }
          label="Theme"
          labelPlacement="top"
        />
      </div>
      <header style={displayModal === true ? { opacity: 0.1 } : { opacity: 1 }} className={`${styles.header} ${theme === "dark" ? styles.header__back__black : styles.header__back__light}`}>
        <nav className={styles.header__nav}>
          <ul className={styles.header__nav__ul}>
            <li className={styles.header__nav__ul__li}>
              <Link
                className={`${styles.header__nav__ul__li__link} ${theme === "light"
                  ? styles.header__nav__ul__li__link__light
                  : styles.header__nav__ul__li__link__dark
                  }`}
              >
                Thomas DA SILVA
                Bordeaux, France
              </Link>
            </li>
            <li className={styles.header__nav__ul__li}>
              <Link
              onClick={() => {
                document
                  .getElementById("aboutme")
                  .scrollIntoView({ behavior: "smooth" });
              }}
                href="#"
                className={`${styles.header__nav__ul__li__link} ${theme === "light"
                  ? styles.header__nav__ul__li__link__light
                  : styles.header__nav__ul__li__link__dark
                  }`}
              >
                / Mes projets
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main
        style={displayModal === true ? { opacity: 0.1 } : { opacity: 1 }}
        className={`${styles.overlay} ${theme === 'dark' ? styles.overlay__back__dark : styles.overlay__back__light}`}
      >
        <section className={styles.overlay__sectionHero}>
          <p
            className={`${styles.overlay__sectionHero__p} ${theme === "light"
              ? styles.overlay__sectionHero__p__light
              : styles.overlay__sectionHero__p__dark
              }`}
          >
            Développeur front-end.
            <br />
            Scroll cette page pour me découvrir!
          </p>
          <p className={styles.overlay__sectionHero__icon}>
            <svg
              width="30"
              height="71"
              viewBox="0 0 30 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.5"
                y="1.5"
                width="27"
                height="45"
                rx="13.5"
                stroke={`${theme === "light" ? "black" : "white"}`}
                stroke-opacity="0.6"
                stroke-width="3"
              />
              <path
                d="M15 12V20"
                stroke={`${theme === "light" ? "black" : "white"}`}
                stroke-opacity="0.6"
                stroke-width="3"
                stroke-linecap="round"
              />
              <path
                d="M8 54L14.5 60.5L21 54"
                stroke={`${theme === "light" ? "black" : "white"}`}
                stroke-opacity="0.6"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 63L14.5 69.5L21 63"
                stroke={`${theme === "light" ? "black" : "white"}`}
                stroke-opacity="0.6"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </p>
          <div style={{ position: "absolute", zIndex: "0", left: "0px", top: "0px", width: "100%", height: "100%" }}>
            <Canvas
              frameloop='demand'
              dpr={[1, 2]}
              camera={{ position: [30, 23, 25], fov: 25 }}
              gl={{ preserveDrawingBuffer: true }}
            >
              <Suspense fallback={null}>
                <OrbitControls
                  enableZoom={false}
                />
                <Computers />
              </Suspense>

              <Preload all />
            </Canvas>
          </div>
        </section>
        <section
          ref={test}
          className={`${styles.overlay__sectionAbout} ${theme === "dark" ? styles.overlay__sectionAbout__back__dark : styles.overlay__sectionAbout__back__light}`}
        >
          <motion.h1
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { translateY: 0 }, hidden: { translateY: 100 } }} transition={{ type: "spring", bounce: 0.25 }}

            className={`${theme === "dark" ? styles.overlay__sectionAbout__h1__dark : styles.overlay__sectionAbout__h1__light}`}>About me</motion.h1>
          <motion.p id="aboutme"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { translateY: 0 }, hidden: { translateY: 100 } }} transition={{ type: "spring", bounce: 0.25 }}
            className={`${theme === "dark" ? styles.overlay__sectionAbout__p__dark : styles.overlay__sectionAbout__p__light}`}>
            Mon nom est Thomas et j'ai 25 ans.
            <br />
            Je suis autodidacte, j'aime me perfectionner, et apprendre.
            <br />
            Je peux créer et gérer des sites en font-end à l'aide de ces différents langages et outils : HTML, CSS, Javascript, React.
            <br />
            Et j'ai également des connaissances en PHP / Symfony, Nextjs et nodejs ce qui me permet de réaliser des sites web fullstack et des API
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { translateY: 0 }, hidden: { translateY: 100 } }} transition={{ type: "spring", bounce: 0.25 }} className={styles.overlay__sectionAbout__div}>
            <Tilt
              className={styles.overlay__sectionAbout__div__tilt}
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.1}
            >
              <div className={`${styles.overlay__sectionAbout__div__tilt__card} ${theme === 'dark' ? styles.overlay__sectionAbout__div__tilt__card__dark : styles.overlay__sectionAbout__div__tilt__card__light}`}>

                <h2 className={styles.overlay__sectionAbout__div__tilt__card__h2}>test</h2>
              </div>
            </Tilt>
            <Tilt
              className={styles.overlay__sectionAbout__div__tilt}
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.1}
            >
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { opacity: 1, scale: 1 }, hidden: { opacity: 0, scale: 0 } }} transition={{ duration: 0.2 }} className={`${styles.overlay__sectionAbout__div__tilt__card} ${theme === 'dark' ? styles.overlay__sectionAbout__div__tilt__card__dark : styles.overlay__sectionAbout__div__tilt__card__light}`}>

                <h2 className={styles.overlay__sectionAbout__div__tilt__card__h2}>test</h2>
              </motion.div>
            </Tilt>
            <Tilt
              className={styles.overlay__sectionAbout__div__tilt}
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.1}
            >
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { opacity: 1, scale: 1 }, hidden: { opacity: 0, scale: 0 } }} transition={{ duration: 0.2 }} className={`${styles.overlay__sectionAbout__div__tilt__card} ${theme === 'dark' ? styles.overlay__sectionAbout__div__tilt__card__dark : styles.overlay__sectionAbout__div__tilt__card__light}`}>

                <h2 className={styles.overlay__sectionAbout__div__tilt__card__h2}>test</h2>
              </motion.div>
            </Tilt>
          </motion.div>
        </section>
        <section
          className={`${styles.overlay__sectionSkills} ${theme === "dark" ? styles.overlay__sectionSkills__back__dark : styles.overlay__sectionSkills__back__light}`}
        >
          <motion.h1
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { translateY: 0 }, hidden: { translateY: 100 } }} transition={{ type: "spring", bounce: 0.25 }}

            className={`${styles.overlay__sectionSkills__h1} ${theme === "dark" ? styles.overlay__sectionSkills__h1__dark : styles.overlay__sectionSkills__h1__light}`}>Expériences</motion.h1>
          <div className={styles.overlay__sectionSkills__div}>
            <span className={`${styles.overlay__sectionSkills__div__line} ${theme === "light" ? styles.overlay__sectionSkills__div__line__light : styles.overlay__sectionSkills__div__line__black }`}></span>
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { translateX: 0 }, hidden: { translateX: -100 } }} transition={{ type: "spring", bounce: 0.25 }} className={`${styles.overlay__sectionSkills__div__card} ${styles.overlay__sectionSkills__div__card__left} ${theme === "light" ? styles.overlay__sectionSkills__div__card__light : styles.overlay__sectionSkills__div__card__black}`}>
                <img alt="" className={styles.overlay__sectionSkills__div__card__left__img} href={"../assets/img/billed.png"} />
                <h3 className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Formation développeur Javascript/React - Openclassroom</h3>
                <p className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Compétences aquises</p>
                <ul >
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Choisir une solution technique adaptée à votre client et travailler en mode Agile</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Créer des sites webs avec HTML et CSS</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Créer des applications web dynamiques avec Javascript et React</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Communiquer avec le back-end de l’application grâce à une API</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Mettre en œuvre des test unitaires et d’intégration et débugger le code</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Résoudre des problèmes techniques avec un langage de programmation et des algorithmes</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Refactoriser du code pour qu’il soit plus moderne et optimisé</li>
                </ul>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { translateX: 0 }, hidden: { translateX: 100 } }} transition={{ type: "spring", bounce: 0.25 }} className={`${styles.overlay__sectionSkills__div__card} ${styles.overlay__sectionSkills__div__card__right} ${theme === "light" ? styles.overlay__sectionSkills__div__card__light : styles.overlay__sectionSkills__div__card__black}`}>
                <img alt="" className={styles.overlay__sectionSkills__div__card__right__img} href={"../assets/img/billed.png"} />

                <h3 className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Formation développeur PHP / Symfony - Openclassroom</h3>
                <p className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Compétences aquises</p>
                <ul>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Analyser un cahier des charges et choisir une solution technique adaptée parmi les solutions existantes</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Concevoir l’architecture technique d’une application à l’aide de diagrammes UML</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Créer des projets web dynamiques grâce PHP</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Communiquer avec une base de données pour stocker et requêter des informations</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Développer de manière professionnelle grâce au framework Symfony</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Mettre en oeuvre des tests unitaires et fonctionnels ainsi qu’utiliser les outils les plus connus d’intégration continue</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Produire une documentation technique et fonctionnelle de l’application</li>
                  <li className={`${theme === "light" ? styles.overlay__sectionSkills__div__card__h3__light : styles.overlay__sectionSkills__div__card__h3__black}`}>Prendre en compte les problématiques de performance d’une application PHP</li>
                </ul>
              </motion.div>
            </div>

          </div>
        </section>
        <section
          className={`${styles.overlay__sectionWork} ${theme === "dark" ? styles.overlay__sectionWork__back__dark : styles.overlay__sectionWork__back__light}`}

        >
          <motion.h1
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { translateY: 0 }, hidden: { translateY: 100 } }} transition={{ type: "spring", bounce: 0.25 }}

            className={`${styles.overlay__sectionWork__h1} ${theme === "dark" ? styles.overlay__sectionWork__h1__dark : styles.overlay__sectionWork__h1__light}`}>My work</motion.h1>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { translateY: 0 }, hidden: { translateY: 100 } }} transition={{ type: "spring", bounce: 0.25 }}
          >
            <select
              name=""
              id=""
              onChange={(e) => {
                //setType(e.target.value);
              }}
            >
              <option>Type de projet</option>
              <option value="php">Openclassroom PHP/Symfony</option>
              <option value="js">Openclassroom JS/React</option>
              <option value="Personnel">Personnel</option>
              <option value="Professionnel">Professionnel</option>
            </select>
          </motion.div>
          <div className={styles.overlay__sectionWork__div}>
            {arrayPictures.map((p, index) => {
              return (
                <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { translateY: 0 }, hidden: { translateY: 100 } }} transition={{ type: "spring", bounce: 0.25 }} className={styles.overlay__sectionWork__carrousel}>
                  <Tilt
                    className={styles.overlay__sectionWork__carrousel__tilt}
                    perspective={500}
                    glareEnable={true}
                    glareMaxOpacity={0.45}
                    scale={1.02}
                  >
                    <img
                      className={`${styles.overlay__sectionWork__carrousel__tilt__img
                        } ${theme === "light"
                          ? styles.overlay__sectionWork__carrousel__tilt__img__light
                          : styles.overlay__sectionWork__carrousel__tilt__img__dark
                        }`}
                      onClick={() => {
                        setDisplayModal(true);
                        setModalData(p)
                      }}
                      src={`../assets/img/${p[0]}`}
                      alt=""
                    />
                  </Tilt>
                </motion.p>)
            })}
          </div>


        </section>
        <section
          className={`${styles.overlay__sectionContact} ${theme === "dark" ? styles.overlay__sectionContact__back__dark : styles.overlay__sectionContact__back__light}`}

        >
          <p
            className={`${styles.overlay__sectionContact__p} ${theme === "dark" ? styles.overlay__sectionContact__p__dark : styles.overlay__sectionContact__p__light}`}

            id="aboutme">
            My name is Max.
            <br />
            As you can see I like plants,
            <br />
            design, and coffee.
          </p>
        </section>
      </main>
    </>
  );
}
