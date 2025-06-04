import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import CategoryWidget from '../../widget/categoryWidget/CategoryWidget';
import ButtonWidget from '../../widget/buttonWidget/ButtonWidget';
import FooterWidget from '../../widget/footerWidget/FooterWidget';
import HeaderWidget from '../../widget/headerWidget/HeaderWidget';
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal';
import BannersBuyWidget from '../../widget/bannersWidget/BannersWidget';
import GenealogyTree from '../../widget/GenealogyTree/GenealogyTree';
const HomePage = ({ productsData }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(CategoryWidget, {}), _jsx(GenealogyTree, {}), _jsx(HeaderWidget, {}), _jsx(LoginWidgetModal, { isOpen: isLoginModalOpen, onClose: handleCloseLoginModal }), _jsx(BannersBuyWidget, {}), _jsx(FooterWidget, {}), _jsx(ButtonWidget, {})] }));
};
export default HomePage;
