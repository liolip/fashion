import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import CategoryWidget from '../../widget/categoryWidget/CategoryWidget';
import ButtonWidget from '../../widget/buttonWidget/ButtonWidget';
import FooterWidget from '../../widget/footerWidget/FooterWidget';
import HeaderWidget from '../../widget/headerWidget/HeaderWidget';
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal';
import BannersBuyWidget from '../../widget/bannersWidget/BannersWidget';
import GenealogyTree from '../../widget/GenealogyTree/GenealogyTree';
import BookIcon from '../../widget/BookIcon/BookIcon';
import AuthNoticeWidget from '../../widget/AuthNoticeWidget/AuthNoticeWidget';
const HomePage = ({ productsData }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(BookIcon, { onClick: () => {
                    console.log('BookIcon clicked');
                } }), _jsx(ButtonWidget, { onInfoClick: () => console.log('Инфо нажато'), onDeleteClick: () => console.log('Удалить нажато') }), _jsx(CategoryWidget, {}), _jsx(GenealogyTree, {}), _jsx(HeaderWidget, {}), _jsx(AuthNoticeWidget, { isOpen: false, onClose: () => { }, onLoginClick: () => setIsLoginModalOpen(true), personName: '\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0447\u0435\u043B\u043E\u0432\u0435\u043A' }), _jsx(LoginWidgetModal, { isOpen: isLoginModalOpen, onClose: handleCloseLoginModal }), _jsx(BannersBuyWidget, {}), _jsx(FooterWidget, {})] }));
};
export default HomePage;
