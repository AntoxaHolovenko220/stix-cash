import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const CreateTransactionForm = () => {
	const { t } = useTranslation()
	return (
		<Box sx={{ maxWidth: '355px', width: '100%' }}>
			<Typography
				sx={{
					fontFamily: 'Manrope',
					fontSize: '22px',
					fontWeight: 700,
					lineHeight: 1,
					textTransform: 'uppercase',
				}}
			>
				{t('create transaction')}
			</Typography>
		</Box>
	)
}

export default CreateTransactionForm
