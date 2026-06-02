import { Box, CircularProgress, Typography } from '@mui/material'
import { usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useTranslation } from 'react-i18next'
import PayPalCheckout from './PayPalCheckout'

interface Props {
	amount: string
	disabled: boolean
	onSuccess: () => void
	onError: (message?: string) => void
}

const PayPalTopUpBlock = ({ amount, disabled, onSuccess, onError }: Props) => {
	const { t } = useTranslation()
	const [{ isPending, isResolved }] = usePayPalScriptReducer()

	if (isPending) {
		return (
			<Box sx={{ mt: '20px', display: 'flex', justifyContent: 'center' }}>
				<CircularProgress size={32} />
			</Box>
		)
	}

	if (!isResolved) {
		return (
			<Typography
				sx={{
					mt: '20px',
					fontFamily: 'Manrope',
					fontSize: '14px',
					color: '#DE0000',
				}}
			>
				{t('paypal not configured')}
			</Typography>
		)
	}

	return (
		<PayPalCheckout
			amount={amount}
			disabled={disabled}
			onSuccess={onSuccess}
			onError={onError}
		/>
	)
}

export default PayPalTopUpBlock
