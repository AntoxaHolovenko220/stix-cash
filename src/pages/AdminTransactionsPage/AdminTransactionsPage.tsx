import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import jsonTransactions from '@/pages/transactions.json'
import { TransactionCard } from '@/components'
import { TransactionCardProps } from '@/components/TransactionCard/TransactionCard'

const AdminTransactionsPage = () => {
	const { t } = useTranslation()

	const parseDate = (dateStr: string) => {
		const [day, month, yearAndTime] = dateStr.split('.')
		const [year, time] = yearAndTime.split(' ')
		return new Date(`20${year}-${month}-${day}T${time}`)
	}

	const sortedTransactions = [
		...(jsonTransactions as TransactionCardProps[]),
	].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())

	return (
		<Box>
			<Typography
				sx={{
					ml: '2px',
					fontFamily: 'Manrope',
					fontSize: '14px',
				}}
			>
				<span style={{ opacity: 0.5 }}>{t('admin menu')}</span> |{' '}
				{t('transaction history')}
			</Typography>
			<Typography
				sx={{
					mt: '60px',
					fontFamily: 'Manrope',
					fontSize: '22px',
					fontWeight: 700,
					lineHeight: 1,
					textTransform: 'uppercase',
				}}
			>
				{t('transaction history')}
			</Typography>
			<Box
				sx={{
					mt: '40px',
					display: 'flex',
					flexDirection: 'column',
					gap: '25px',
				}}
			>
				{sortedTransactions.map(tx => (
					<TransactionCard key={`${tx.id}-${tx.date}`} {...tx} />
				))}
			</Box>
		</Box>
	)
}

export default AdminTransactionsPage
