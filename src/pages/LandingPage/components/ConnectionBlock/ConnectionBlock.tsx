import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ModalProps } from '../../LandingPage'

const ConnectionBlock = ({ setModalOpen }: ModalProps) => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')

	return (
		<Box
			sx={{
				mt: '50px',
				py: '100px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				background: 'linear-gradient(120deg, #006CFF, #5DA2FF)',
				textAlign: 'center',
			}}
		>
			<Typography
				sx={{
					maxWidth: isMobile ? '360px' : '900px',
					fontFamily: 'Manrope',
					fontSize: isMobile ? '32px' : '54px',
					fontWeight: 700,
					lineHeight: 1,
					background: 'linear-gradient(90deg, #FFFFFF, #E0E0E0)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
			>
				{t('transfer')}
			</Typography>
			<Typography
				sx={{
					maxWidth: isMobile ? '335px' : '510px',
					mt: '30px',
					fontFamily: 'Manrope',
					fontSize: isMobile ? '20px' : '22px',
					fontWeight: 300,
					lineHeight: 1,
					color: '#EEEEEE',
				}}
			>
				{t('leave contact')}
			</Typography>
			<Button
				onClick={() => setModalOpen(true)}
				sx={{
					width: '323px',
					height: '65px',
					mt: '40px',
					backgroundColor: '#FFFFFF',
					border: '1px solid #414141',
					borderRadius: '8px',
				}}
			>
				<Typography
					sx={{
						fontFamily: 'Manrope',
						fontSize: '16px',
						fontWeight: 600,
						background: 'linear-gradient(90deg, #0044FF, #0B73FF)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
					}}
				>
					{t('get money')}
				</Typography>
			</Button>
		</Box>
	)
}

export default ConnectionBlock
