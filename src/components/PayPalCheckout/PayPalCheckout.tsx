import { Box, Typography } from '@mui/material'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useTranslation } from 'react-i18next'
import { capturePaypalOrder, createPaypalOrder } from '@/api/paypalService'

interface Props {
	amount: string
	disabled?: boolean
	onSuccess: () => void
	onError: (message?: string) => void
}

const PayPalCheckout = ({ amount, disabled, onSuccess, onError }: Props) => {
	const { t } = useTranslation()

	const isAmountValid = () => {
		const num = Number(amount)
		return amount !== '' && !Number.isNaN(num) && num > 0
	}

	return (
		<Box sx={{ mt: '20px' }}>
			<Typography
				sx={{
					mb: '12px',
					fontFamily: 'Manrope',
					fontSize: '14px',
					color: '#6A6A6A',
				}}
			>
				{t('paypal payment hint')}
			</Typography>
			<PayPalButtons
				disabled={disabled || !isAmountValid()}
				style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }}
				createOrder={async () => {
					const formatted = Number(amount).toFixed(2)
					const { orderId } = await createPaypalOrder(formatted)
					return orderId
				}}
				onApprove={async data => {
					try {
						await capturePaypalOrder(data.orderID)
						onSuccess()
					} catch (err: unknown) {
						console.error(err)
						const message =
							(err as { response?: { data?: { message?: string } } })?.response
								?.data?.message ?? t('failed to complete')
						onError(message)
					}
				}}
				onError={err => {
					console.error(err)
					onError(t('failed to complete'))
				}}
				onCancel={() => onError(t('paypal payment cancelled'))}
			/>
		</Box>
	)
}

export default PayPalCheckout
