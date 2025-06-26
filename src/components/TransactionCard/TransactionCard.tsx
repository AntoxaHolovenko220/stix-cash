import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

type TransactionType = 'Deposit' | 'Withdrawal'
type TransactionStatus = 'Completed' | 'Canceled' | 'Pending'
type PaymentMethod = 'Zelle' | 'PayPal' | 'Wire transfer' | 'Wallet'

interface PaymentMethodConfig {
	icon: string
	label?: string
}

export interface TransactionCardProps {
	id: string
	date: string
	status: TransactionStatus
	type: TransactionType
	paymentMethod: PaymentMethod
	amount: number
	balance: number
	wallet?: string
}

const TransactionCard: React.FC<TransactionCardProps> = ({
	id,
	date,
	status,
	type,
	paymentMethod,
	amount,
	balance,
	wallet,
}) => {
	const { t } = useTranslation()

	// Форматирование чисел
	const formatNumber = (num: number) =>
		new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(num)

	// Конфигурация статусов
	const statusConfig = {
		Completed: { color: '#52BC37', icon: '/completed.svg' },
		Canceled: { color: '#D72828', icon: '/canceled.svg' },
		Pending: { color: '#F4D800', icon: '/pending.svg' },
	}

	// Конфигурация методов оплаты
	const paymentMethodConfig: Record<PaymentMethod, PaymentMethodConfig> = {
		PayPal: { icon: '/paypal.svg' },
		Zelle: { icon: '/zelle.svg' },
		'Wire transfer': { icon: '/wire-transfer.svg', label: 'Wire transfer' },
		Wallet: {
			icon: '/wallet.svg',
			label: type === 'Deposit' ? 'From wallet' : 'To wallet',
		},
	}

	// Общие стили
	const commonStyles = {
		fontFamily: 'Manrope',
		fontSize: '16px',
		lineHeight: 1,
	}

	// Получаем конфигурацию для текущего метода оплаты
	const currentPaymentMethod = paymentMethodConfig[paymentMethod]

	return (
		<Box
			sx={{
				width: 'calc(100% - 30px)',
				minHeight: '98px',
				backgroundColor: '#F7F9FF',
				p: '25px 15px',
			}}
		>
			<Box
				sx={{
					width: 'fit-content',
					p: '5px 9px',
					display: 'flex',
					alignItems: 'center',
					gap: '12px',
					bgcolor: '#BDCAF0',
					borderRadius: '4px',
					mb: '20px',
				}}
			>
				<Box
					component='img'
					src='/transaction-arrow.svg'
					sx={{
						transform: type === 'Deposit' ? 'rotate(0deg)' : 'rotate(180deg)',
					}}
				/>
				<Typography sx={{ ...commonStyles, fontWeight: 500, color: '#FFFFFF' }}>
					{type === 'Deposit' ? t('top-up') : t('withdrawal')}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
					<Box component='img' src={currentPaymentMethod.icon} />
					{currentPaymentMethod.label && (
						<Typography
							sx={{ ...commonStyles, fontWeight: 500, color: '#FFFFFF' }}
						>
							{currentPaymentMethod.label}
						</Typography>
					)}
				</Box>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				{[
					{ label: t('id transaction'), value: id },
					{ label: t('date'), value: date },
					{
						label: t('status'),
						value: (
							<Box
								sx={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}
							>
								<Typography
									sx={{
										...commonStyles,
										fontWeight: 600,
										color: statusConfig[status].color,
									}}
								>
									{status}
								</Typography>
								<Box component='img' src={statusConfig[status].icon} />
							</Box>
						),
					},
					{
						label: t('type'),
						value: (
							<Typography
								sx={{
									...commonStyles,
									fontWeight: 600,
									color: type === 'Deposit' ? '#52BC37' : '#000000',
								}}
							>
								{type}
							</Typography>
						),
					},
					{
						value: (
							<>
								<Box
									sx={{
										height: '16px',
										display: 'flex',
										alignItems: 'flex-start',
										gap: '5px',
									}}
								>
									<Box component='img' src={currentPaymentMethod.icon} />
									{currentPaymentMethod.label && (
										<Typography
											sx={{
												...commonStyles,
												fontWeight: 600,
												whiteSpace: 'nowrap',
											}}
										>
											{currentPaymentMethod.label}
										</Typography>
									)}
								</Box>
								<Typography
									sx={{ ...commonStyles, fontWeight: 400, mt: '15px' }}
								>
									{wallet
										? `${wallet.slice(0, 4)}...${wallet.slice(-6)}`
										: 'Details'}
								</Typography>
							</>
						),
					},
					{ label: t('amount'), value: formatNumber(amount) },
					{ label: t('balance'), value: formatNumber(balance) },
				].map((item, index) => (
					<Box
						key={index}
						sx={{
							maxWidth:
								index === 0
									? '114px'
									: index === 1
									? '110px'
									: index === 2
									? '108px'
									: index === 3
									? '90px'
									: index === 4
									? '128px'
									: index === 5
									? '85px'
									: '105px',
							width: '100%',
						}}
					>
						{item.label && (
							<Typography sx={{ ...commonStyles, fontWeight: 600, mb: '15px' }}>
								{item.label}
							</Typography>
						)}
						{typeof item.value === 'string' ? (
							<Typography sx={{ ...commonStyles, fontWeight: 400 }}>
								{item.value}
							</Typography>
						) : (
							item.value
						)}
					</Box>
				))}
			</Box>
		</Box>
	)
}

export default TransactionCard
