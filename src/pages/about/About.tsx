// import React from 'react'
// import styles from './style.module.scss'

// interface Props {
// 	isOpen: boolean
// 	onClose: () => void
// }

// const AboutModal: React.FC<Props> = ({ isOpen, onClose }) => {
// 	if (!isOpen) return null

// 	return (
// 		<div className={styles.overlay} onClick={onClose}>
// 			<div className={styles.modal} onClick={e => e.stopPropagation()}>
// 				<button className={styles.closeBtn} onClick={onClose}>
// 					X
// 				</button>
// 				<h2>О проекте</h2>
// 				<p>
// 					О проекте Добро пожаловать! Наш проект — уникальное место, где история
// 					встречается с современностью, а прошлое сливается с настоящим. Это
// 					цифровой мост между поколениями, берущий свое начало с момента
// 					появления на свет Долон бия и до наших дней. А вы, наш дорогой
// 					пользователь — уже часть этого уникального путешествия через время.
// 					Санжыра была важной частью жизни наших предков. Она помогала им
// 					сохранять память о прошлом, устанавливать связи в настоящем и
// 					передавать знания будущим поколениям. Сегодня санжыра помогает нам
// 					лучше понять наше происхождение и ценить наше наследие. Санжыра - это
// 					не просто генеалогическое дерево, это живой архив. Он помогает нам
// 					понять, откуда мы пришли, и дает нам чувство принадлежности и
// 					целостности. Поэтому наши пользователи могут не только помогать
// 					дополнять наше основное древо, но и создать генеалогическое цепочку
// 					своего рода, публикуя уникальные рассказы о своих предках. Мы
// 					приглашаем вас присоединиться к нам в этом увлекательном путешествии
// 					через время, открывая новые страницы хроник и оставляя свой след в
// 					них. Вместе мы можем создать что-то по-настоящему уникальное и
// 					значимое - место, где каждый может стать частью большой истории нашего
// 					народа.
// 				</p>
// 			</div>
// 		</div>
// 	)
// }

// export default AboutModal
// import React from 'react'
// import styles from './style.module.scss'

// const AboutPage: React.FC = () => {
// 	return (
// 		<section className={styles.about}>
// 			<h1 className={styles.title}>О проекте</h1>
// 			<p className={styles.greeting}>Добро пожаловать!</p>
// 			<div className={styles.textBlock}>
// 				<p>
// 					Наш проект — уникальное место, где история встречается с
// 					современностью, а прошлое сливается с настоящим. Это цифровой мост
// 					между поколениями, берущий свое начало с момента появления на свет
// 					Долон бия и до наших дней. А вы, наш дорогой пользователь — уже часть
// 					этого уникального путешествия через время.
// 				</p>
// 				<p>
// 					Санжыра была важной частью жизни наших предков. Она помогала им
// 					сохранять память о прошлом, устанавливать связи в настоящем и
// 					передавать знания будущим поколениям. Сегодня санжыра помогает нам
// 					лучше понять наше происхождение и ценить наше наследие.
// 				</p>
// 				<p>
// 					Санжыра — это не просто генеалогическое дерево, это живой архив. Он
// 					помогает нам понять, откуда мы пришли, и дает нам чувство
// 					принадлежности и целостности. Поэтому наши пользователи могут не
// 					только помогать дополнять наше основное древо, но и создавать
// 					генеалогическую цепочку своего рода, публикуя уникальные рассказы о
// 					своих предках.
// 				</p>
// 				<p>
// 					Мы приглашаем вас присоединиться к нам в этом увлекательном
// 					путешествии через время, открывая новые страницы хроник и оставляя
// 					свой след в них. Вместе мы можем создать что-то по-настоящему
// 					уникальное и значимое — место, где каждый может стать частью большой
// 					истории нашего народа.
// 				</p>
// 			</div>
// 		</section>
// 	)
// }

// export default AboutPage
import React from 'react'
import styles from './style.module.scss'

const About: React.FC = () => {
	return (
		<div className={styles.aboutPage}>
			<div className={styles.content}>
				{/* <h1>О проекте</h1> */}
				<p>Добро пожаловать!</p>
				<p>
					Наш проект — уникальное место, где история встречается с
					современностью, а прошлое сливается с настоящим. Это цифровой мост
					между поколениями, берущий своё начало с момента появления на свет
					Долон бия и до наших дней. А вы, наш дорогой пользователь — уже часть
					этого уникального путешествия через время.
				</p>
				<p>
					Санжыра была важной частью жизни наших предков. Она помогала им
					сохранять память о прошлом, устанавливать связи в настоящем и
					передавать знания будущим поколениям. Сегодня санжыра помогает нам
					лучше понять наше происхождение и ценить наше наследие.
				</p>
				<p>
					Санжыра — это не просто генеалогическое дерево, это живой архив. Он
					помогает нам понять, откуда мы пришли, и даёт нам чувство
					принадлежности и целостности. Поэтому наши пользователи могут не
					только помогать дополнять основное древо, но и создавать
					генеалогическую цепочку своего рода, публикуя уникальные рассказы о
					своих предках.
				</p>
				<p>
					Мы приглашаем вас присоединиться к нам в этом увлекательном
					путешествии через время, открывая новые страницы хроник и оставляя
					свой след в них. Вместе мы можем создать что-то по-настоящему
					уникальное и значимое — место, где каждый может стать частью большой
					истории нашего народа.
				</p>
			</div>
		</div>
	)
}

export default About
