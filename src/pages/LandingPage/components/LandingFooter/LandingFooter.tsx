import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'

const LandingFooter = () => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')

	const footerStyles = {
		py: '50px',
		px: isMobile ? '20px' : '50px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: 'linear-gradient(120deg, #3B3B3B, #161A1A)',
		boxSizing: 'border-box',
	}

	const contactsBoxStyles = {
		maxWidth: isMobile ? '272px' : '335px',
		width: '100%',
		height: isMobile ? '60px' : '74px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '8px',
		borderRadius: '12px',
		background: 'linear-gradient(120deg, #1D1D1D, #000000)',
	}

	const contactTextStyles = {
		fontFamily: 'Manrope',
		fontSize: isMobile ? '16px' : '20px',
		fontWeight: 300,
	}

	const buttonStyles = {
		maxWidth: isMobile ? '272px' : '335px',
		width: '100%',
		height: isMobile ? '60px' : '74px',
		mt: '20px',
		borderRadius: '12px',
		fontFamily: 'Manrope',
		fontSize: isMobile ? '16px' : '20px',
		fontWeight: 300,
		color: '#3AA2FF',
		textTransform: 'none',
		background: 'linear-gradient(120deg, #1D1D1D, #000000)',
	}

	return (
		<Box sx={footerStyles}>
			<Box
				sx={{
					display: 'flex',
					rowGap: '20px',
					columnGap: '30px',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
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
