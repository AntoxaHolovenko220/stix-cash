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

export const registerUser = async (
	data: RegisterData
): Promise<AuthResponse> => {
	const response = await axios.post(`${API_URL}/user/auth/register`, data)
	return response.data
}

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
	const response = await axios.post(`${API_URL}/user/auth/login`, data)
	return response.data
}

export const storeTokens = (tokens: AuthResponse) => {
	localStorage.setItem('accessToken', tokens.accessToken)
	localStorage.setItem('refreshToken', tokens.refreshToken)
}

export const clearTokens = () => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
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
