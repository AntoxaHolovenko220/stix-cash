import { TransactionCardProps } from '@/components/TransactionCard/TransactionCard'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

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
	roles: string[]
	isVerified: boolean
	balance: number
	balanceBTC: number
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
