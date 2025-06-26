import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import routes from '@/router/routes.json'
import CardBalance from './CardBalance'
import { TransactionCard } from '@/components'
import jsonTransactions from '@/pages/transactions.json'
import { TransactionCardProps } from '@/components/TransactionCard/TransactionCard'

const HomePage = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const parseDate = (dateStr: string) => {
		const [day, month, yearAndTime] = dateStr.split('.')
		const [year, time] = yearAndTime.split(' ')
		return new Date(`20${year}-${month}-${day}T${time}`)
	}

	const latestTransactions = [...(jsonTransactions as TransactionCardProps[])]
		.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
		.slice(0, 4)

	const gradientText = {
		background: 'linear-gradient(90deg, #0246FF, #666666)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		fontFamily: 'Manrope',
		fontWeight: 700,
		lineHeight: 1,
		textTransform: 'uppercase',
	}

	const actionButton = {
		px: '50px',
		width: '100%',
		height: '56px',
		border: '1px solid #414141',
		borderRadius: '6px',
		boxShadow: 'none',
		background: 'linear-gradient(90deg, #58A9FF, #0044FF)',
	}

	return (
		<Box>
			<Typography
				sx={{
					ml: '2px',
					fontFamily: 'Manrope',
					fontSize: '14px',
					// color: '#232323',
				}}
			>
				{t('home')}
			</Typography>

			<Box
				sx={{ mt: '60px', display: 'flex', justifyContent: 'space-between' }}
			>
				<Box sx={{ maxWidth: '393px', width: '100%' }}>
					<Typography sx={{ ...gradientText, fontSize: '40px' }}>
						{t('nice to see')}
					</Typography>
					<Typography sx={{ ...gradientText, mt: '15px', fontSize: '26px' }}>
						{t('bridge')}
					</Typography>
				</Box>

				<Box sx={{ maxWidth: '420px', width: '100%' }}>
					<CardBalance balance={50.95} />
					<Box
						sx={{
							mt: '60px',
							display: 'flex',
							flexDirection: 'column',
							gap: '25px',
						}}
					>
						<Button
							variant='contained'
							sx={actionButton}
							onClick={() => navigate(routes.TopUpPage.path)}
						>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Typography
									sx={{
										fontFamily: 'Manrope',
										fontSize: '20px',
										fontWeight: 700,
										textTransform: 'none',
									}}
								>
									{t('top up')}
								</Typography>
								<Box component='img' src='/top-up.svg' />
							</Box>
						</Button>

						<Button
							variant='contained'
							sx={actionButton}
							onClick={() => navigate(routes.WithdrawPage.path)}
						>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Typography
									sx={{
										fontFamily: 'Manrope',
										fontSize: '20px',
										fontWeight: 700,
										textTransform: 'none',
									}}
								>
									{t('withdraw')}
								</Typography>
								<Box component='img' src='/withdraw.svg' />
							</Box>
						</Button>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', mt: '60px' }}
			>
				<Typography sx={{ ...gradientText, fontSize: '22px', lineHeight: 1.2 }}>
					{t('transaction history')}
				</Typography>
				<Typography
					sx={{
						fontFamily: 'Manrope',
						fontSize: '20px',
						borderBottom: '1px solid #000000',
						cursor: 'pointer',
						'&:hover': { opacity: 0.7 },
					}}
					onClick={() => navigate(routes.TransactionsPage.path)}
				>
					{t('all transactions')}
				</Typography>
			</Box>

			<Box
				sx={{
					mt: '50px',
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
				}}
			>
				{latestTransactions.map(tx => (
					<TransactionCard key={`${tx.id}-${tx.date}`} {...tx} />
				))}
			</Box>
		</Box>
	)
}

export default HomePage
