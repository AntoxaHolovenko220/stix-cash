import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const authHeaders = () => ({
	Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	'Content-Type': 'application/json',
})

export type PaypalConfig = {
	clientId: string
	mode: 'sandbox' | 'live'
}

export const getPaypalConfig = async (): Promise<PaypalConfig> => {
	const { data } = await axios.get(`${API_URL}/paypal/config`, {
		headers: authHeaders(),
	})
	return data
}

export const createPaypalOrder = async (
	amount: string
): Promise<{ orderId: string }> => {
	const { data } = await axios.post(
		`${API_URL}/paypal/orders`,
		{ amount },
		{ headers: authHeaders() }
	)
	return data
}

export const capturePaypalOrder = async (orderId: string) => {
	const { data } = await axios.post(
		`${API_URL}/paypal/orders/capture`,
		{ orderId },
		{ headers: authHeaders() }
	)
	return data
}
