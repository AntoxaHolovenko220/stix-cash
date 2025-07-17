import { Box, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'

const BenefitsBlock = () => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')

	const titleStyles = {
		fontFamily: 'Manrope',
		fontSize: isMobile ? '40px' : '62px',
		fontWeight: 700,
		textAlign: 'center',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
	}

	const cardStyles = {
		width: isMobile ? '287px' : '415px',
		height: isMobile ? '160px' : '231px',
		mx: isMobile ? 'auto' : '0px',
		p: isMobile ? '20px' : '30px 20px',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		backdropFilter: 'blur(20px)',
		WebkitBackdropFilter: 'blur(20px)',
		border: '1px solid #9A9A9A',
		borderRadius: '20px',
		boxSizing: 'border-box',
	}

	const titleCardStyles = {
		fontFamily: 'Manrope',
		fontSize: isMobile ? '20px' : '30px',
		fontWeight: 700,
		lineHeight: 1,
		color: '#74AFFF',
	}

	const descriptionStyles = {
		mt: isMobile ? '15px' : '20px',
		fontFamily: 'Manrope',
		fontSize: isMobile ? '20px' : '26px',
		fontWeight: 400,
		lineHeight: 1,
		color: '#545454',
	}

	const benefits = [
		{ title: t('legally'), description: t('US law') },
		{ title: t('commission'), description: t('hiding costs') },
		{ title: t('quick'), description: t('can use') },
		{ title: t('counselling'), description: t('profitability') },
	]

	return (
		<Box
			sx={{
				py: isMobile ? '40px' : '150px',
				px: isMobile ? '20px' : ' 50px',
				pb: '150px',
				overflow: 'hidden',
				boxSizing: 'border-box',
			}}
		>
			<Box sx={{ display: 'flex', gap: '15px' }}>
				<Typography
					sx={{
						background: 'linear-gradient(90deg, #1C1C1C, #ACACAC)',
						...titleStyles,
					}}
				>
					{t('advantages')}{' '}
					<span
						style={{
							background: 'linear-gradient(90deg, #3AA2FF, #0073FF)',
							fontFamily: 'Manrope',
							fontSize: isMobile ? '40px' : '62px',
							fontWeight: 700,
							textAlign: 'center',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						{t('with us')}
					</span>
				</Typography>
			</Box>
			<Box
				sx={{
					maxWidth: '860px',
					mt: isMobile ? '30px' : '50px',
					ml: isMobile ? '0px' : '15px',
					position: 'relative',
					display: 'flex',
					gap: isMobile ? '15px' : '30px',
					flexWrap: 'wrap',
				}}
			>
				<Box
					component='img'
					src='lock.svg'
					sx={{
						position: 'absolute',
						top: isMobile ? '260px' : '-50px',
						right: isMobile ? '-460px' : '-49vw',
						transform: isMobile ? 'rotate(15deg) scale(0.62)' : 'rotate(15deg)',
						zIndex: -1,
					}}
				/>
				{benefits.map((benefit, index) => (
					<Box sx={cardStyles} key={index}>
						<Typography sx={titleCardStyles}>{benefit.title}</Typography>
						<Typography sx={descriptionStyles}>
							{benefit.description}
						</Typography>
					</Box>
				))}
			</Box>
		</Box>
	)
}

export default BenefitsBlock
