import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CountryOption } from './types'
import routes from '@/router/routes.json'
import { registerUser, loginUser, storeTokens } from '@/api/authService'
import { useTranslation } from 'react-i18next'

export const useRegisterModal = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [isLoginForm, setIsLoginForm] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	const [country, setCountry] = useState<CountryOption | null>(null)
	const [isTermsAccepted, setІsTermsAccepted] = useState(true)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const resetForm = () => {
		setEmail('')
		setPassword('')
		setConfirmPassword('')
		setFirstName('')
		setLastName('')
		setPhone('')
		setCountry(null)
		setІsTermsAccepted(false)
		setError('')
	}

	const handlePhoneChange = (value: string) => {
		const digits = value.replace(/\D/g, '')
		setPhone(digits.length === 0 ? '' : `+${digits}`)
	}

	const switchAuthMode = () => {
		setIsLoginForm(!isLoginForm)
		resetForm()
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			if (!email || !password) {
				throw new Error(t('incorrect email'))
			}

			if (!isLoginForm) {
				if (!firstName || !lastName || !phone || !country) {
					throw new Error(t('fill all fields'))
				}
				if (password !== confirmPassword) {
					throw new Error(t('incorrect password'))
				}
				if (!isTermsAccepted) {
					throw new Error(t('agree to terms'))
				}

				// Регистрация
				const registerData = {
					firstName,
					lastName,
					email,
					phone,
					country: country.label,
					password,
					isTermsAccepted,
				}
				console.log(registerData)

				const tokens = await registerUser(registerData)
				storeTokens(tokens)
			} else {
				// Логин
				const loginData = {
					email,
					password,
				}

				const tokens = await loginUser(loginData)
				storeTokens(tokens)
			}

			navigate(routes.HomePage.path)
		} catch (err: any) {
			setError(
				err.response?.data?.message || err.message || t('error occurred')
			)
		} finally {
			setLoading(false)
		}
	}

	return {
		isLoginForm,
		email,
		password,
		confirmPassword,
		firstName,
		lastName,
		phone,
		country,
		isTermsAccepted,
		loading,
		error,
		setEmail,
		setPassword,
		setConfirmPassword,
		setFirstName,
		setLastName,
		setPhone,
		setCountry,
		setІsTermsAccepted,
		handlePhoneChange,
		handleSubmit,
		switchAuthMode,
		resetForm,
	}
}
