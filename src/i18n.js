import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                enter: 'Enter your credentials:',
                username: 'Username',
                password: 'Password',
                login: 'Log in',
            },
        },
        de: {
            translation: {
                enter: 'Geben Sie Ihre Anmeldeinformationen ein:',
                username: 'Benutzername',
                password: 'Passwort',
                login: 'Anmelden',
            },
        }
    }
})

export default i18n;