import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export interface TransactionData {
	type: string
	amount: string
	balance: string
	method: string
	date: string
	status: string
	transactionId: string
	note?: string
}

export const createAdminTransaction = async (
	clientId: string,
	data: TransactionData
) => {
	const response = await axios.post(
		`${API_URL}/transactions/admin/${clientId}`,
		{
			...data,
			currency: 'USD',
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				'Content-Type': 'application/json',
			},
		}
	)
	return response.data
}

export const createUserTransaction = async (data: TransactionData) => {
	const response = await axios.post(
		`${API_URL}/transactions`,
		{
			...data,
			currency: 'USD',
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				'Content-Type': 'application/json',
			},
		}
	)
	return response.data
}

export const getUserTransactionAdmin = async (clientId: string) => {
	const response = await axios.get(
		`${API_URL}/transactions?userId=${clientId}`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				'Content-Type': 'application/json',
			},
		}
	)
	return response.data
}

export const getTransactionAdmin = async () => {
	const response = await axios.get(`${API_URL}/transactions`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			'Content-Type': 'application/json',
		},
	})
	return response.data
}

export const getProfileTransaction = async () => {
	const response = await axios.get(`${API_URL}/transactions/my`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			'Content-Type': 'application/json',
		},
	})
	return response.data
}
