import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
	footerStyles,
	contactsBoxStyles,
	contactTextStyles,
	buttonStyles,
} from './style'

const LandingFooter = () => {
	const { t } = useTranslation()

	return (
		<Box sx={footerStyles}>
			<Box sx={{ display: 'flex', gap: '30px' }}>
				<Box sx={contactsBoxStyles}>
					<Typography
						sx={{
							...contactTextStyles,
							color: '#3AA2FF',
						}}
					>
						email:
					</Typography>
					<Typography
						sx={{
							...contactTextStyles,
							color: '#FFFFFF',
						}}
					>
						styxcash@gmail.com
					</Typography>
				</Box>
				<Box sx={contactsBoxStyles}>
					<Typography
						sx={{
							...contactTextStyles,
							color: '#3AA2FF',
						}}
					>
						{t('phone')}
					</Typography>
					<Typography
						sx={{
							...contactTextStyles,
							color: '#3AA2FF',
						}}
					>
						+ 1 123 456 78
					</Typography>
				</Box>
			</Box>
			<Button sx={buttonStyles}>{t('support')}</Button>
		</Box>
	)
}

export default LandingFooter
