import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ReactNode, useEffect, useState } from 'react'
import { getPaypalConfig } from '@/api/paypalService'
import { PaypalClientIdContext } from './paypalConfigContext'

const envClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID as string | undefined

interface Props {
	children: ReactNode
}

const PayPalProvider = ({ children }: Props) => {
	const [clientId, setClientId] = useState<string | undefined>(envClientId)

	useEffect(() => {
		if (envClientId) return

		let cancelled = false
		getPaypalConfig()
			.then(cfg => {
				if (!cancelled) {
					setClientId(cfg.clientId)
				}
			})
			.catch(() => {
				if (!cancelled) setClientId(undefined)
			})

		return () => {
			cancelled = true
		}
	}, [])

	if (!clientId) {
		return (
			<PaypalClientIdContext.Provider value={undefined}>
				{children}
			</PaypalClientIdContext.Provider>
		)
	}

	return (
		<PaypalClientIdContext.Provider value={clientId}>
			<PayPalScriptProvider
				options={{
					clientId,
					currency: 'USD',
					intent: 'capture',
				}}
			>
				{children}
			</PayPalScriptProvider>
		</PaypalClientIdContext.Provider>
	)
}

export default PayPalProvider
