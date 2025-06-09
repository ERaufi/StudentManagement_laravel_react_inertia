import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import Laravel's lang files
import en from '@lang/en.json';
import fa from '@lang/fa.json';
import hi from '@lang/hi.json';
import ps from '@lang/ps.json';
import tr from '@lang/tr.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fa: { translation: fa },
            hi: { translation: hi },
            ps: { translation: ps },
            tr: { translation: tr },
        },
        lng: localStorage.getItem('lang') || 'en', // 👈 load from localStorage or fallback to 'en'
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
