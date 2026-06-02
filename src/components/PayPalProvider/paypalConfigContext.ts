import { createContext, useContext } from 'react'

export const PaypalClientIdContext = createContext<string | undefined>(
	undefined
)

export const usePaypalClientId = () => {
	const fromContext = useContext(PaypalClientIdContext)
	const fromEnv = import.meta.env.VITE_PAYPAL_CLIENT_ID as string | undefined
	return fromContext ?? fromEnv
}
