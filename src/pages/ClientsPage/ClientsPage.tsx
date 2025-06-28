// src/pages/ClientsPage/ClientsPage.tsx
import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CreateIcon from '@mui/icons-material/Create'
import { useEffect, useState } from 'react'
import { getClients } from '@/api/clientService'
import { Loader } from '@/components'

const ClientsPage = () => {
	const { t } = useTranslation()
	const [clients, setClients] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const data = await getClients()
				setClients(data)
			} catch (err) {
				setError(t('error occurred'))
				console.error('Failed to fetch clients:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchClients()
	}, [t])

	const headerStyles = {
		fontFamily: 'Manrope',
		fontSize: '12px',
		fontWeight: 700,
	}

	const cellStyles = {
		fontFamily: 'Manrope',
		fontSize: '12px',
	}

	if (loading) {
		return <Loader />
	}

	if (error) {
		return <Typography color='error'>{error}</Typography>
	}

	return (
		<Box>
			<Typography sx={{ ml: '2px', fontFamily: 'Manrope', fontSize: '14px' }}>
				<span style={{ opacity: 0.5 }}>{t('admin menu')}</span> | {t('clients')}
			</Typography>

			<Box sx={{ mt: '30px' }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
						<Typography
							sx={{
								fontFamily: 'Manrope',
								fontSize: '22px',
								fontWeight: 700,
								lineHeight: 1,
								textTransform: 'uppercase',
							}}
						>
							{t('clients')}
						</Typography>
						<Typography
							sx={{
								fontFamily: 'Manrope',
								fontSize: '14px',
								fontWeight: 400,
								lineHeight: 1,
								color: '#232323',
								opacity: 0.5,
							}}
						>
							{clients.length} {t('found')}
						</Typography>
					</Box>
				</Box>

				<Box sx={{ mt: '30px' }}>
					<Box
						sx={{
							height: '32px',
							px: '10px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							backgroundColor: '#F7F9FF',
							borderRadius: '8px',
						}}
					>
						{[
							'Id',
							t('first name'),
							t('last name'),
							t('wallet'),
							t('balance'),
						].map((text, index) => (
							<Typography
								key={index}
								sx={{
									width:
										index === 0
											? '20px'
											: index === 3
											? '250px'
											: index === 4
											? '95px'
											: '70px',
									...headerStyles,
								}}
							>
								{text}
							</Typography>
						))}
					</Box>

					{clients.map((client, index) => (
						<Box
							key={client._id}
							sx={{
								mt: '12px',
								height: '32px',
								px: '10px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								borderRadius: '8px',
								border: '0.5px solid #9eb2d7',
							}}
						>
							<Typography sx={{ width: '20px', ...cellStyles }}>
								{index + 1}
							</Typography>
							<Typography sx={{ width: '70px', ...cellStyles }}>
								{client.firstName}
							</Typography>
							<Typography sx={{ width: '70px', ...cellStyles }}>
								{client.lastName}
							</Typography>
							<Typography sx={{ width: '250px', ...cellStyles }}>
								{client.walletBTCAddress || 'N/A'}
							</Typography>
							<Box
								sx={{
									width: '95px',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Typography sx={cellStyles}>{client.balance}</Typography>
								<IconButton>
									<CreateIcon
										sx={{ width: '18px', height: '18px', color: '#0246FF' }}
									/>
								</IconButton>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default ClientsPage
