import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { titleStyles, cardStyles, textStyles } from './style'

const HowFixBlock = () => {
	const { t } = useTranslation()

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			<Typography
				sx={{
					background: 'linear-gradient(90deg, #74AFFF, #0096FF)',
					...titleStyles,
				}}
			>
				{t('why')}
			</Typography>
			<Typography
				sx={{
					background: 'linear-gradient(90deg, #A7A7A7, #3B3B3B)',
					...titleStyles,
				}}
			>
				{t('fix')}
			</Typography>
			<Typography
				sx={{
					maxWidth: '458px',
					mt: '10px',
					fontFamily: 'Manrope',
					fontSize: '23px',
					lineHeight: 1,
					textAlign: 'center',
					color: '#868686',
				}}
			>
				{t('made it easy')}
			</Typography>
			<Box sx={{ width: '100%', position: 'relative' }}>
				<Box
					component='img'
					src='vector-line.svg'
					sx={{ minWidth: '1280px', width: '100%', display: 'block' }}
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
						gap: '80px',
						width: '100%',
						pointerEvents: 'none',
					}}
				>
					<Box sx={{ ...cardStyles, transform: 'translateY(20px)' }}>
						<Box component='img' src='cash.svg' sx={{ mt: '35px' }} />
						<Typography sx={{ ...textStyles, maxWidth: '304px' }}>
							{t('we know')}
						</Typography>
					</Box>
					<Box sx={{ ...cardStyles, transform: 'translateY(-20px)' }}>
						<Box component='img' src='no-cash.svg' sx={{ mt: '35px' }} />
						<Typography sx={textStyles}>{t('too high')}</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default HowFixBlock
