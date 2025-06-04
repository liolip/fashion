import React, { useState } from 'react'
import CategoryWidget from '../../widget/categoryWidget/CategoryWidget'
import ButtonWidget from '../../widget/buttonWidget/ButtonWidget'
import FooterWidget from '../../widget/footerWidget/FooterWidget'
import HeaderWidget from '../../widget/headerWidget/HeaderWidget'
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'
import BannersBuyWidget from '../../widget/bannersWidget/BannersWidget'
import GenealogyTree from '../../widget/GenealogyTree/GenealogyTree'
// import AboutModal from '../about/About'

interface Product {
	id: number
	_id: string
	imageUrl: string
	title: string
	price: number
	category: string
}

interface HomePageProps {
	productsData: Product[]
}

const HomePage: React.FC<HomePageProps> = ({ productsData }) => {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

	const handleCloseLoginModal = () => {
		setIsLoginModalOpen(false)
	}

	return (
		<>
			<CategoryWidget />
			<GenealogyTree />
			<HeaderWidget />
			<LoginWidgetModal
				isOpen={isLoginModalOpen}
				onClose={handleCloseLoginModal}
			/>
			<BannersBuyWidget />
			<FooterWidget />
			<ButtonWidget />
		</>
	)
}

export default HomePage
