import { Box, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'

const HowFixBlock = () => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')

	const titleStyles = {
		fontFamily: 'Manrope',
		fontSize: isMobile ? '36px' : '57px',
		fontWeight: 700,
		lineHeight: 1,
		textAlign: 'center',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
	}

	const cardStyles = {
		width: '397px',
		minHeight: isMobile ? '220px' : '280px',
		p: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: isMobile ? '10px' : '20px',
		background:
			'linear-gradient(180deg, rgba(0, 62, 147, 0.75), rgba(0, 40, 84, 0.75))',
		backdropFilter: 'blur(12px)',
		WebkitBackdropFilter: 'blur(12px)',
		borderRadius: isMobile ? '30px' : '50px',
		pointerEvents: 'auto',
		boxSizing: 'border-box',
	}

	const textStyles = {
		maxWidth: '320px',
		fontFamily: 'Manrope',
		fontSize: isMobile ? '12px' : '18px',
		fontWeight: 200,
		lineHeight: 1.2,
		color: '#FFFFFF',
		textAlign: 'center',
	}

	return (
		<Box
			sx={{
				px: isMobile ? '10px' : '0px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				overflow: 'hidden',
				boxSizing: 'border-box',
			}}
		>
			<Typography
				sx={{
					maxWidth: isMobile ? '300px' : '720px',
					background: 'linear-gradient(90deg, #74AFFF, #0096FF)',
					...titleStyles,
				}}
			>
				{t('why')}{' '}
				<span
					style={{
						background: 'linear-gradient(90deg, #A7A7A7, #3B3B3B)',
						fontFamily: 'Manrope',
						fontSize: isMobile ? '36px' : '57px',
						fontWeight: 700,
						lineHeight: 1,
						textAlign: 'center',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
					}}
				>
					{t('fix')}
				</span>
			</Typography>
			<Typography
				sx={{
					maxWidth: isMobile ? '298px' : '458px',
					mt: '10px',
					fontFamily: 'Manrope',
					fontSize: isMobile ? '16px' : '23px',
					lineHeight: 1,
					textAlign: 'center',
					color: '#868686',
				}}
			>
				{t('made it easy')}
			</Typography>
			<Box
				sx={{
					width: '100%',
					position: 'relative',
					mt: isMobile ? '-50px' : '0',
				}}
			>
				<Box
					component='img'
					src='vector-line.svg'
					sx={{
						minWidth: '1280px',
						width: '100%',
						display: 'block',
						ml: isMobile ? '-50%' : '0px',
					}}
				/>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: isMobile ? '10px' : '80px',
						width: '100%',
						pointerEvents: 'none',
					}}
				>
					<Box sx={{ ...cardStyles, transform: 'translateY(20px)' }}>
						<Box component='img' src='cash.svg' />
						<Typography sx={{ ...textStyles, maxWidth: '304px' }}>
							{t('we know')}
						</Typography>
					</Box>
					<Box sx={{ ...cardStyles, transform: 'translateY(-20px)' }}>
						<Box component='img' src='no-cash.svg' />
						<Typography sx={textStyles}>{t('too high')}</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default HowFixBlock
