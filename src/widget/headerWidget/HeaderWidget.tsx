import React, { useState } from 'react'
import styles from './style.module.scss'
import { NavLink } from 'react-router-dom'
import CartWidget from '../cartWidget/CartWidget'
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'

const translations = {
	RU: {
		project: 'О проекте',
		searchPlaceholder: 'Введите имя',
		login: 'Войти',
		logoText: 'Санжыра',
	},
	EN: {
		project: 'About',
		searchPlaceholder: 'Enter name',
		login: 'Login',
		logoText: 'Sanjyra',
	},
	KG: {
		project: 'Жобонун тууралуу',
		searchPlaceholder: 'Атыңызды жазыңыз',
		login: 'Кирүү',
		logoText: 'Санжыра',
	},
}

const HeaderWidget: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [language, setLanguage] = useState<'RU' | 'EN' | 'KG'>('RU')
	const [showFilters, setShowFilters] = useState(false)
	const [filterRoddy, setFilterRoddy] = useState('')
	const [filterPlemya, setFilterPlemya] = useState('')
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [isLoginOpen, setIsLoginOpen] = useState(false)

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
							{currentTexts.logoText}
						</NavLink>

						<NavLink
							to='/about'
							className={({ isActive }) => (isActive ? styles.active : '')}
						>
							{currentTexts.project}
						</NavLink>
					</nav>

					<div
						className={styles.searchWrapper}
						onFocus={() => setShowFilters(true)}
						onBlur={e => {
							if (e.currentTarget.contains(e.relatedTarget as Node)) {
								return
							}
							setShowFilters(false)
						}}
						tabIndex={-1}
					>
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
							/>
						</label>

						{/* {showFilters && (
							<div className={styles.filters}>
								<input
									type='text'
									placeholder='Роды племен'
									value={filterRoddy}
									onChange={e => setFilterRoddy(e.target.value)}
									className={styles.filterInput}
								/>
								<input
									type='text'
									placeholder='Племена'
									value={filterPlemya}
									onChange={e => setFilterPlemya(e.target.value)}
									className={styles.filterInput}
								/>
							</div>
						)} */}
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

			<CartWidget isOpen={isSidebarOpen} onClose={toggleSidebar} />
			<LoginWidgetModal
				isOpen={isLoginOpen}
				onClose={() => setIsLoginOpen(false)}
			/>
		</>
	)
}

export default HeaderWidget
