import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from '@/store';

import AlertModal from "@/components/ModalModule/AlertModal.tsx";

const container = document.getElementById('root');

if (!container) {
    throw new Error('루트 요소가 없습니다.');
}

const root = ReactDOM.createRoot(container);

root.render(
    <Provider store={store}>
        <App />
        <AlertModal />
    </Provider>
);