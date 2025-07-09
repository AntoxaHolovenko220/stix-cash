import { TransactionCardProps } from '@/components/TransactionCard/TransactionCard'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export interface Balance {
	$numberDecimal: string
}

export interface WireTransfer {
	firstName: string
	lastName: string
	accountNumber: string
	routingNumber: string
	bankName: string
	address: string
	_id: string
}

export interface ZelleTransfer {
	recipientName: string
	email: string
	phone: string
	_id: string
}

export interface Client {
	_id: string
	firstName: string
	lastName: string
	email: string
	phone: string
	country: string
	password: string
	isTermsAccepted: boolean
	roles: string[]
	isVerified: boolean
	documents: string[]
	googleDriveFolderId: string
	balance: Balance
	balanceBTC: Balance
	showBTCBalance: boolean
	walletBTCAddress: string
	paypalAddress: string
	wireTransfer: WireTransfer
	zelleTransfer: ZelleTransfer
	transactions: TransactionCardProps[]
	createdAt: string
	updatedAt: string
}

export const getClients = async (): Promise<Client[]> => {
	const response = await axios.get(`${API_URL}/admin/users`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
	})
	return response.data
}

export const getClient = async (id: string): Promise<Client> => {
	const response = await axios.get(`${API_URL}/admin/users/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
	})
	return response.data
}

export const getProfile = async (): Promise<Client> => {
	const response = await axios.get(`${API_URL}/user/profile`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
	})
	return response.data
}

export const verifyDocuments = async (files: File[]) => {
	const token = localStorage.getItem('accessToken')
	if (!token) {
		throw new Error('No access token found')
	}

	const formData = new FormData()
	files.forEach(file => {
		formData.append('file', file)
	})

	const response = await axios.post(
		'http://localhost:3000/user/documents',
		formData,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		}
	)

	return response.data
}

export const updateClientField = async (
	id: string,
	payload: Record<string, any>
) => {
	const token = localStorage.getItem('accessToken')
	if (!token) throw new Error('No token found')

	return axios.patch(`http://localhost:3000/admin/users/${id}`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})
}
