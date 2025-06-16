import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import Circle from '../Circle'

const CardBlock = () => {
	const { t } = useTranslation()

	const titleStyles = {
		fontFamily: 'Manrope',
		fontSize: '64px',
		display: 'inline-block',
		lineHeight: 1,
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
	}

	const featureBoxStyles = {
		width: '350px',
		height: '70px',
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		backgroundColor: '#FFFFFF',
		border: '1px solid #979797',
		borderRadius: '8px',
	}

	const iconStyles = {
		ml: '20px',
		color: '#4a5568',
		width: '30px',
		height: '30px',
	}

	const features = [t('unique'), t('minimum'), t('maximum')]
	return (
		<Box
			sx={{
				minHeight: '700px',
				p: '50px',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			<Typography
				sx={{
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
						<Typography sx={{ fontFamily: 'Manrope', color: '#333333' }}>
							{text}
						</Typography>
					</Box>
				))}
			</Box>
			<Link to='/login'>
				<Button
					variant='contained'
					disableElevation
					sx={{
						width: '352px',
						height: '72px',
						mt: '30px',
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
			</Link>
			<Card
				sx={{
					position: 'absolute',
					top: '280px',
					right: '30px',
					transform: 'rotate(10deg)',
					zIndex: -1,
				}}
			/>
			<Circle
				size={495}
				color='linear-gradient(220deg, #006AFF, #80CEFF)'
				sx={{ position: 'absolute', top: '270px', right: '-250px', zIndex: -3 }}
			/>
			<Circle
				size={95}
				color='linear-gradient(90deg, #0A70FB, #76C4FB)'
				sx={{ position: 'absolute', top: '300px', right: '530px', zIndex: -3 }}
			/>
			<Circle
				size={55}
				color='linear-gradient(90deg, #0A70FB, #76C4FB)'
				sx={{ position: 'absolute', top: '550px', right: '430px', zIndex: -3 }}
			/>
		</Box>
	)
}

export default CardBlock
