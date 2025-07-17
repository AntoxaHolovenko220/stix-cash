import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import Circle from '../Circle'
import { ModalProps } from '../../LandingPage'

const CardBlock = ({ setModalOpen }: ModalProps) => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')

	const titleStyles = {
		fontFamily: 'Manrope',
		fontSize: isMobile ? '40px' : '64px',
		display: 'inline-block',
		lineHeight: 1,
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
	}

	const featureBoxStyles = {
		width: isMobile ? '247px' : '350px',
		height: isMobile ? '46px' : '70px',
		px: isMobile ? '10px' : '20px',
		display: 'flex',
		alignItems: 'center',
		gap: isMobile ? '5px' : '10px',
		backgroundColor: '#FFFFFF',
		border: '1px solid #979797',
		borderRadius: '8px',
		boxSizing: 'border-box',
	}

	const iconStyles = {
		color: '#4a5568',
		width: isMobile ? '20px' : '30px',
		height: isMobile ? '20px' : '30px',
	}

	const features = [t('unique'), t('minimum'), t('maximum')]
	return (
		<Box
			sx={{
				minHeight: '700px',
				pb: isMobile ? '110px' : '250px',
				pt: isMobile ? '20px' : '50px',
				px: isMobile ? '25px' : '50px',
				position: 'relative',
				overflow: 'hidden',
				boxSizing: 'border-box',
			}}
		>
			<Typography
				sx={{
					maxWidth: isMobile ? '300px' : '100%',
					width: '100%',
					background: 'linear-gradient(90deg, #3B3B3B, #B2B2B2)',
					...titleStyles,
				}}
			>
				{t('easy')}
			</Typography>
			<Typography
				sx={{
					background: 'linear-gradient(90deg, #0044FF, #98CEFF)',
					...titleStyles,
					fontWeight: 700,
					maxWidth: '850px',
				}}
			>
				{t('withdrawing')}
			</Typography>
			<Box
				sx={{
					mt: '20px',
					display: 'flex',
					flexWrap: 'wrap',
					gap: '15px',
					maxWidth: '719px',
				}}
			>
				{features.map((text, index) => (
					<Box key={index} sx={featureBoxStyles}>
						<CheckCircleIcon sx={iconStyles} />
						<Typography
							sx={{
								fontFamily: 'Manrope',
								fontSize: isMobile ? '13px' : '16px',
								color: '#333333',
							}}
						>
							{text}
						</Typography>
					</Box>
				))}
			</Box>
			<Button
				variant='contained'
				disableElevation
				onClick={() => setModalOpen(true)}
				sx={{
					width: isMobile ? '100%' : '352px',
					height: '72px',
					mt: isMobile ? '400px' : '30px',
					border: '1px solid #414141',
					borderRadius: '8px',
					background: 'linear-gradient(90deg, #58A9FF, #0044FF)',
					textTransform: 'none',
					fontFamily: 'Manrope',
					fontSize: '20px',
					fontWeight: 600,
				}}
			>
				{t('get money')}
			</Button>
			<Card
				sx={{
					position: 'absolute',
					top: isMobile ? '490px' : '280px',
					right: isMobile ? '-230px' : '30px',
					transform: isMobile ? 'rotate(15deg)' : 'rotate(10deg)',
					zIndex: -1,
				}}
			/>
			<Circle
				size={495}
				color='linear-gradient(220deg, #006AFF, #80CEFF)'
				sx={{
					position: 'absolute',
					top: isMobile ? '493px' : '270px',
					right: '-250px',
					zIndex: -3,
				}}
			/>
			<Circle
				size={95}
				color='linear-gradient(90deg, #0A70FB, #76C4FB)'
				sx={{
					position: 'absolute',
					top: isMobile ? '380px' : '300px',
					right: isMobile ? '150px' : '530px',
					zIndex: -3,
				}}
			/>
			<Circle
				size={55}
				color='linear-gradient(90deg, #0A70FB, #76C4FB)'
				sx={{
					position: 'absolute',
					top: isMobile ? '580px' : '550px',
					right: isMobile ? '285px' : '430px',
					zIndex: -3,
				}}
			/>
		</Box>
	)
}

export default CardBlock
