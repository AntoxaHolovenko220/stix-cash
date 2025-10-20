import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { enTranslations } from './locales/en'
import { ruTranslations } from './locales/ru'

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: enTranslations },
		ru: { translation: ruTranslations },
	},
	lng: 'en',
	fallbackLng: 'en',
	supportedLngs: ['en', 'ru'],
	interpolation: {
		escapeValue: false,
	},
})

export default i18n
