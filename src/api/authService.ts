import axios from 'axios'

const API_URL = 'http://localhost:3000'

export interface AuthResponse {
	accessToken: string
	refreshToken: string
}

export interface RegisterData {
	firstName: string
	lastName: string
	email: string
	phone: string
	country: string
	password: string
	isTermsAccepted: boolean
}

export interface LoginData {
	email: string
	password: string
}

export interface TokenPayload {
	sub: string // user id
	email: string
	roles: string[]
	iat: number // issued at
	exp: number // expiration time
}

export const registerUser = async (
	data: RegisterData
): Promise<AuthResponse> => {
	const response = await axios.post(`${API_URL}/user/auth/register`, data)
	return response.data
}

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
	const response = await axios.post(`${API_URL}/admin/auth/login`, data)
	return response.data
}

const decodeToken = (token: string): TokenPayload | null => {
	try {
		const base64Url = token.split('.')[1]
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join('')
		)
		return JSON.parse(jsonPayload)
	} catch (e) {
		console.error('Failed to decode token', e)
		return null
	}
}

export const storeTokens = (tokens: AuthResponse) => {
	localStorage.setItem('accessToken', tokens.accessToken)
	localStorage.setItem('refreshToken', tokens.refreshToken)

	const payload = decodeToken(tokens.accessToken)
	if (payload) {
		localStorage.setItem(
			'userData',
			JSON.stringify({
				id: payload.sub,
				email: payload.email,
				roles: payload.roles,
				tokenExp: payload.exp,
			})
		)
	}
}

export const clearTokens = () => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
	localStorage.removeItem('userData')
}

export const getUserData = (): TokenPayload | null => {
	const userData = localStorage.getItem('userData')
	return userData ? JSON.parse(userData) : null
}

export const isAuthenticated = () => {
	return !!localStorage.getItem('accessToken')
}

axios.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
