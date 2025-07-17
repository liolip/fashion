import React, { useState } from 'react'
import styles from './style.module.scss'
import { NavLink } from 'react-router-dom'
import CartWidget from '../cartWidget/CartWidget'
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'

interface PersonType {
	id: string
	name: string
	description: string
	imageUrl?: string
}

const translations = {
	RU: {
		// project: 'О проекте',
		searchPlaceholder: 'Введите имя',
		login: 'Войти',
		// logoText: '',
	},
	EN: {
		// project: 'About',
		searchPlaceholder: 'Enter name',
		login: 'Login',
		// logoText: 'Sanjyra',
	},
	KG: {
		// project: 'Жобонун тууралуу',
		searchPlaceholder: 'Атыңызды жазыңыз',
		login: 'Кирүү',
		// logoText: 'Санжыра',
	},
}

const HeaderWidget: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [language, setLanguage] = useState<'RU' | 'EN' | 'KG'>('RU')
	const [showFilters, setShowFilters] = useState(false)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [isLoginOpen, setIsLoginOpen] = useState(false)
	const [foundPerson, setFoundPerson] = useState<PersonType | null>(null)
	const scrollToPersonById = (id: string) => {
		const element = document.getElementById(`node-${id}`)
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			})
		}
	}

	const currentTexts = translations[language]

	const toggleLanguage = () => {
		setLanguage(prev => (prev === 'RU' ? 'EN' : prev === 'EN' ? 'KG' : 'RU'))
	}

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	const handleLoginClick = () => {
		setIsLoginOpen(true)
	}
	const handleSearch = async () => {
		if (!searchValue.trim()) return

		try {
			const response = await fetch(
				`https://fashion-mwc8.onrender.com/api/person/search?name=${encodeURIComponent(
					searchValue
				)}`
			)
			if (!response.ok) throw new Error('Ошибка сети')
			const data = await response.json()

			if (data.length > 0) {
				const person = data[0]
				setFoundPerson({
					id: person._id,
					name: person.name,
					description: person.description,
					imageUrl: person.imageUrl || '',
				})
				setIsSidebarOpen(true)

				// ⬇ Центрируем узел после рендера
				setTimeout(() => {
					scrollToPersonById(person._id)
				}, 300)
			} else {
				alert('Человек не найден')
				setFoundPerson(null)
				setIsSidebarOpen(false)
			}
		} catch (error) {
			console.error('Ошибка при поиске:', error)
			alert('Ошибка при поиске, попробуйте позже')
		}
	}

	// const handleSearch = async () => {
	// 	const name = searchValue.trim()
	// 	if (!name) return

	// 	try {
	// 		const url = `https://fashion-mwc8.onrender.com/api/person/search?name=${encodeURIComponent(
	// 			name
	// 		)}&t=${Date.now()}`
	// 		alert(`Отправляем запрос на:\n${url}`) // Показываем URL запроса

	// 		const response = await fetch(url)

	// 		if (!response.ok) {
	// 			alert(`Ошибка сети: ${response.status} ${response.statusText}`)
	// 			throw new Error('Ошибка сети')
	// 		}

	// 		const data = await response.json()
	// 		alert('Ответ с сервера:\n' + JSON.stringify(data, null, 2)) // Показываем ответ сервера

	// 		if (data.length > 0) {
	// 			const person = data[0]
	// 			setFoundPerson({
	// 				id: person._id,
	// 				name: person.name,
	// 				description: person.description,
	// 				imageUrl: person.imageUrl || '',
	// 			})
	// 			setIsSidebarOpen(true)

	// 			setTimeout(() => {
	// 				scrollToPersonById(person._id)
	// 			}, 300)
	// 		} else {
	// 			alert('Человек не найден')
	// 			setFoundPerson(null)
	// 			setIsSidebarOpen(false)
	// 		}
	// 	} catch (error) {
	// 		alert('Ошибка при поиске: ' + String(error))
	// 		console.error('Ошибка при поиске:', error)
	// 	}
	// }

	return (
		<>
			<header className={styles.header}>
				<div className={styles.container}>
					<NavLink to='/'>
						<img className={styles.logo} src='/logo.kg.svg' alt='logo' />
					</NavLink>

					<nav className={styles.nav}>
						<NavLink
							to='/'
							className={({ isActive }) => (isActive ? styles.active : '')}
						>
							{/* {currentTexts.logoText} */}
						</NavLink>

						<NavLink
							to='/about'
							className={({ isActive }) => (isActive ? styles.active : '')}
						>
							{/* {currentTexts.project} */}
						</NavLink>
					</nav>
					<div className={styles.searchWrapper}>
						<label className={styles.searchLabel} htmlFor='search-input'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 20 20'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className={styles.searchIcon}
							>
								<path
									d='M19 19L14.65 14.65M16.2071 9.60355C16.2071 12.9017 13.4046 15.7042 10.1064 15.7042C6.80823 15.7042 4.00574 12.9017 4.00574 9.60355C4.00574 6.30534 6.80823 3.50285 10.1064 3.50285C13.4046 3.50285 16.2071 6.30534 16.2071 9.60355Z'
									stroke='#666'
									strokeWidth='1.5'
									strokeLinecap='round'
								/>
							</svg>
							<input
								id='search-input'
								type='search'
								placeholder={currentTexts.searchPlaceholder}
								value={searchValue}
								onChange={e => setSearchValue(e.target.value)}
								className={styles.searchInput}
								autoComplete='off'
								onKeyDown={e => {
									if (e.key === 'Enter') handleSearch()
								}}
							/>
						</label>

						<div className={styles.searchWrapper}>
							<label className={styles.searchLabel} htmlFor='search-input'>
								<span className={styles.searchIcon}>🔍</span>
								<input
									id='search-input'
									type='search'
									placeholder={currentTexts.searchPlaceholder}
									value={searchValue}
									onChange={e => setSearchValue(e.target.value)}
									onKeyDown={e => e.key === 'Enter' && handleSearch()}
									className={styles.searchInput}
									autoComplete='off'
								/>
							</label>
							<button
								type='button'
								className={styles.searchButton}
								onClick={handleSearch}
							>
								Найти
							</button>
						</div>
					</div>

					<div className={styles.buttons}>
						<button
							className={styles.langBtn}
							onClick={toggleLanguage}
							aria-label='Toggle Language'
						>
							{language}
						</button>

						<button
							className={styles.loginBtn}
							onClick={handleLoginClick}
							aria-label='Login'
						>
							{currentTexts.login}
						</button>
					</div>
				</div>
			</header>

			<CartWidget
				isOpen={isSidebarOpen}
				onClose={toggleSidebar}
				person={foundPerson}
			/>
			<LoginWidgetModal
				isOpen={isLoginOpen}
				onClose={() => setIsLoginOpen(false)}
			/>
		</>
	)
}

export default HeaderWidget
// import React, { useState } from 'react'
// import styles from './style.module.scss'
// import { NavLink } from 'react-router-dom'
// import CartWidget from '../cartWidget/CartWidget'
// import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'

// const translations = {
// 	RU: {
// 		project: 'О проекте',
// 		searchPlaceholder: 'Введите имя',
// 		login: 'Войти',
// 		logoText: 'Санжыра',
// 	},
// 	EN: {
// 		project: 'About',
// 		searchPlaceholder: 'Enter name',
// 		login: 'Login',
// 		logoText: 'Sanjyra',
// 	},
// 	KG: {
// 		project: 'Жобонун тууралуу',
// 		searchPlaceholder: 'Атыңызды жазыңыз',
// 		login: 'Кирүү',
// 		logoText: 'Санжыра',
// 	},
// }

// const HeaderWidget: React.FC = () => {
// 	const [searchValue, setSearchValue] = useState('')
// 	const [language, setLanguage] = useState<'RU' | 'EN' | 'KG'>('RU')
// 	const [showFilters, setShowFilters] = useState(false)
// 	const [filterRoddy, setFilterRoddy] = useState('')
// 	const [filterPlemya, setFilterPlemya] = useState('')
// 	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
// 	const [isLoginOpen, setIsLoginOpen] = useState(false)

// 	const currentTexts = translations[language]

// 	const toggleLanguage = () => {
// 		setLanguage(prev => (prev === 'RU' ? 'EN' : prev === 'EN' ? 'KG' : 'RU'))
// 	}

// 	const toggleSidebar = () => {
// 		setIsSidebarOpen(!isSidebarOpen)
// 	}

// 	const handleLoginClick = () => {
// 		setIsLoginOpen(true)
// 	}

// 	return (
// 		<>
// 			<header className={styles.header}>
// 				<div className={styles.container}>
// 					<NavLink to='/'>
// 						<img className={styles.logo} src='/logo.kg.svg' alt='logo' />
// 					</NavLink>

// 					<nav className={styles.nav}>
// 						<NavLink
// 							to='/'
// 							className={({ isActive }) => (isActive ? styles.active : '')}
// 						>
// 							{currentTexts.logoText}
// 						</NavLink>

// 						<NavLink
// 							to='/about'
// 							className={({ isActive }) => (isActive ? styles.active : '')}
// 						>
// 							{currentTexts.project}
// 						</NavLink>
// 					</nav>

// 					<div
// 						className={styles.searchWrapper}
// 						onFocus={() => setShowFilters(true)}
// 						onBlur={e => {
// 							if (e.currentTarget.contains(e.relatedTarget as Node)) {
// 								return
// 							}
// 							setShowFilters(false)
// 						}}
// 						tabIndex={-1}
// 					>
// 						<label className={styles.searchLabel} htmlFor='search-input'>
// 							<svg
// 								width='20'
// 								height='20'
// 								viewBox='0 0 20 20'
// 								fill='none'
// 								xmlns='http://www.w3.org/2000/svg'
// 								className={styles.searchIcon}
// 							>
// 								<path
// 									d='M19 19L14.65 14.65M16.2071 9.60355C16.2071 12.9017 13.4046 15.7042 10.1064 15.7042C6.80823 15.7042 4.00574 12.9017 4.00574 9.60355C4.00574 6.30534 6.80823 3.50285 10.1064 3.50285C13.4046 3.50285 16.2071 6.30534 16.2071 9.60355Z'
// 									stroke='#666'
// 									strokeWidth='1.5'
// 									strokeLinecap='round'
// 								/>
// 							</svg>
// 							<input
// 								id='search-input'
// 								type='search'
// 								placeholder={currentTexts.searchPlaceholder}
// 								value={searchValue}
// 								onChange={e => setSearchValue(e.target.value)}
// 								className={styles.searchInput}
// 								autoComplete='off'
// 							/>
// 						</label>
// 					</div>

// 					<div className={styles.buttons}>
// 						<button
// 							className={styles.langBtn}
// 							onClick={toggleLanguage}
// 							aria-label='Toggle Language'
// 						>
// 							{language}
// 						</button>

// 						<button
// 							className={styles.loginBtn}
// 							onClick={handleLoginClick}
// 							aria-label='Login'
// 						>
// 							{currentTexts.login}
// 						</button>
// 					</div>
// 				</div>
// 			</header>

// 			<CartWidget isOpen={isSidebarOpen} onClose={toggleSidebar} />
// 			<LoginWidgetModal
// 				isOpen={isLoginOpen}
// 				onClose={() => setIsLoginOpen(false)}
// 			/>
// 		</>
// 	)
// }

// export default HeaderWidget
// import React, { useState, useEffect, useRef } from 'react'
// import styles from './style.module.scss'
// import { NavLink } from 'react-router-dom'
// import CartWidget from '../cartWidget/CartWidget'
// import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'

// const translations = {
// 	RU: {
// 		project: 'О проекте',
// 		searchPlaceholder: 'Введите имя',
// 		login: 'Войти',
// 		logoText: 'Санжыра',
// 	},
// 	EN: {
// 		project: 'About',
// 		searchPlaceholder: 'Enter name',
// 		login: 'Login',
// 		logoText: 'Sanjyra',
// 	},
// 	KG: {
// 		project: 'Жобонун тууралуу',
// 		searchPlaceholder: 'Атыңызды жазыңыз',
// 		login: 'Кирүү',
// 		logoText: 'Санжыра',
// 	},
// }

// // Пример списка людей для поиска, замени на реальные данные
// const peopleList = [
// 	{ id: '1', name: 'Алишер', description: 'Описание Алишера' },
// 	{ id: '2', name: 'Алексей', description: 'Описание Алексея' },
// 	{ id: '3', name: 'Алия', description: 'Описание Алиии' },
// 	{ id: '4', name: 'Бакыт', description: 'Описание Бакыта' },
// ]

// const HeaderWidget: React.FC = () => {
// 	const [searchValue, setSearchValue] = useState('')
// 	const [language, setLanguage] = useState<'RU' | 'EN' | 'KG'>('RU')
// 	const [showFilters, setShowFilters] = useState(false) // можно убрать, если не нужно
// 	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
// 	const [isLoginOpen, setIsLoginOpen] = useState(false)

// 	const [filteredPeople, setFilteredPeople] = useState<typeof peopleList>([])
// 	const [selectedPerson, setSelectedPerson] = useState<
// 		(typeof peopleList)[0] | null
// 	>(null)

// 	const currentTexts = translations[language]

// 	const searchWrapperRef = useRef<HTMLDivElement>(null)

// 	// Фильтрация списка при вводе
// 	useEffect(() => {
// 		if (searchValue.trim() === '') {
// 			setFilteredPeople([])
// 			return
// 		}
// 		const filtered = peopleList.filter(person =>
// 			person.name.toLowerCase().includes(searchValue.toLowerCase())
// 		)
// 		setFilteredPeople(filtered)
// 	}, [searchValue])

// 	// Закрытие выпадающего списка при клике вне
// 	useEffect(() => {
// 		const handleClickOutside = (event: MouseEvent) => {
// 			if (
// 				searchWrapperRef.current &&
// 				!searchWrapperRef.current.contains(event.target as Node)
// 			) {
// 				setFilteredPeople([])
// 			}
// 		}
// 		document.addEventListener('mousedown', handleClickOutside)
// 		return () => document.removeEventListener('mousedown', handleClickOutside)
// 	}, [])

// 	const toggleLanguage = () => {
// 		setLanguage(prev => (prev === 'RU' ? 'EN' : prev === 'EN' ? 'KG' : 'RU'))
// 	}

// 	const handlePersonClick = (person: (typeof peopleList)[0]) => {
// 		setSelectedPerson(person)
// 		setIsSidebarOpen(true)
// 		setFilteredPeople([])
// 		setSearchValue('')
// 	}

// 	const toggleSidebar = () => {
// 		setIsSidebarOpen(!isSidebarOpen)
// 	}

// 	const handleLoginClick = () => {
// 		setIsLoginOpen(true)
// 	}

// 	return (
// 		<>
// 			<header className={styles.header}>
// 				<div className={styles.container}>
// 					<NavLink to='/'>
// 						<img className={styles.logo} src='/logo.kg.svg' alt='logo' />
// 					</NavLink>

// 					<nav className={styles.nav}>
// 						<NavLink
// 							to='/'
// 							className={({ isActive }) => (isActive ? styles.active : '')}
// 						>
// 							{currentTexts.logoText}
// 						</NavLink>

// 						<NavLink
// 							to='/about'
// 							className={({ isActive }) => (isActive ? styles.active : '')}
// 						>
// 							{currentTexts.project}
// 						</NavLink>
// 					</nav>

// 					<div
// 						className={styles.searchWrapper}
// 						ref={searchWrapperRef}
// 						tabIndex={-1}
// 					>
// 						<label className={styles.searchLabel} htmlFor='search-input'>
// 							<svg
// 								width='20'
// 								height='20'
// 								viewBox='0 0 20 20'
// 								fill='none'
// 								xmlns='http://www.w3.org/2000/svg'
// 								className={styles.searchIcon}
// 							>
// 								<path
// 									d='M19 19L14.65 14.65M16.2071 9.60355C16.2071 12.9017 13.4046 15.7042 10.1064 15.7042C6.80823 15.7042 4.00574 12.9017 4.00574 9.60355C4.00574 6.30534 6.80823 3.50285 10.1064 3.50285C13.4046 3.50285 16.2071 6.30534 16.2071 9.60355Z'
// 									stroke='#666'
// 									strokeWidth='1.5'
// 									strokeLinecap='round'
// 								/>
// 							</svg>
// 							<input
// 								id='search-input'
// 								type='search'
// 								placeholder={currentTexts.searchPlaceholder}
// 								value={searchValue}
// 								onChange={e => setSearchValue(e.target.value)}
// 								className={styles.searchInput}
// 								autoComplete='off'
// 							/>
// 						</label>

// 						{filteredPeople.length > 0 && (
// 							<ul className={styles.searchResults}>
// 								{filteredPeople.map(person => (
// 									<li
// 										key={person.id}
// 										className={styles.searchResultItem}
// 										tabIndex={0}
// 										onClick={() => handlePersonClick(person)}
// 										onKeyDown={e => {
// 											if (e.key === 'Enter' || e.key === ' ') {
// 												handlePersonClick(person)
// 											}
// 										}}
// 									>
// 										{person.name}
// 									</li>
// 								))}
// 							</ul>
// 						)}
// 					</div>

// 					<div className={styles.buttons}>
// 						<button
// 							className={styles.langBtn}
// 							onClick={toggleLanguage}
// 							aria-label='Toggle Language'
// 							type='button'
// 						>
// 							{language}
// 						</button>

// 						<button
// 							className={styles.loginBtn}
// 							onClick={handleLoginClick}
// 							aria-label='Login'
// 							type='button'
// 						>
// 							{currentTexts.login}
// 						</button>
// 					</div>
// 				</div>
// 			</header>

// 			<CartWidget
// 				isOpen={isSidebarOpen}
// 				onClose={toggleSidebar}
// 				person={selectedPerson}
// 			/>

// 			<LoginWidgetModal
// 				isOpen={isLoginOpen}
// 				onClose={() => setIsLoginOpen(false)}
// 			/>
// 		</>
// 	)
// }

// export default HeaderWidget
