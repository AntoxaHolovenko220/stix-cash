import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const ClientsPage = () => {
	const { t } = useTranslation()

	return (
		<Box>
			<Typography
				sx={{
					ml: '2px',
					fontFamily: 'Manrope',
					fontSize: '14px',
				}}
			>
				<span style={{ opacity: 0.5 }}>{t('admin menu')}</span> | {t('clients')}
			</Typography>
			<Box sx={{ mt: '30px' }}>
				<Box>
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
				</Box>
			</Box>
		</Box>
	)
}

export default ClientsPage
