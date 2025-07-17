import Circle from '../Circle'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'

const HowWorkBlock = () => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')

	const titleStyles = {
		fontFamily: 'Manrope',
		fontSize: isMobile ? '28px' : '73px',
		fontWeight: 700,
		textAlign: 'center',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
	}

	const numberStyles = {
		mt: '10px',
		fontFamily: 'Public Sans',
		fontSize: isMobile ? '64px' : '96px',
		fontWeight: 900,
		lineHeight: 1,
		textAlign: 'center',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
	}

	const cardStyles = {
		width: isMobile ? '175px' : '284px',
		height: isMobile ? '175px' : '231px',
		backgroundColor: '#FFFFFF',
		border: '1px solid #9A9A9A',
		borderRadius: '23px',
		textAlign: 'center',
	}

	const descriptionStyles = {
		mt: '10px',
		mx: '15px',
		fontFamily: 'Manrope',
		fontSize: isMobile ? '15px' : '20px',
		lineHeight: 1.1,
		color: '#363636',
	}

	const steps = [
		{
			text: t('left'),
			hasBreaks: true,
		},
		{
			text: t('analyze'),
		},
		{
			text: t('money arrives'),
		},
	]

	return (
		<Box sx={{ mt: isMobile ? '-50px' : '0px' }}>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Typography
					sx={{
						background: 'linear-gradient(90deg, #323030, #B1B1B1)',
						...titleStyles,
					}}
				>
					{t('how does')}{' '}
					<span
						style={{
							background: 'linear-gradient(90deg, #45A5FF, #31A0FF)',
							fontFamily: 'Manrope',
							fontSize: isMobile ? '28px' : '73px',
							fontWeight: 700,
							textAlign: 'center',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						{t('it work')}
					</span>
				</Typography>
			</Box>
			<Box
				sx={{
					my: isMobile ? '20px' : '50px',
					position: 'relative',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: isMobile ? '10px' : '60px',
				}}
			>
				{steps.map((step, index) => (
					<Box key={index + 1} sx={cardStyles}>
						<Typography
							sx={{
								background: 'linear-gradient(90deg, #111111, #B3B3B3)',
								...numberStyles,
							}}
						>
							{index + 1}
						</Typography>
						<Typography sx={descriptionStyles}>
							{step.hasBreaks ? (
								<>
									<br />
									{step.text}
									<br />
								</>
							) : (
								step.text
							)}
						</Typography>
					</Box>
				))}
				<Circle
					size={isMobile ? 45 : 145}
					color='linear-gradient(135deg, #0044FF, #77C4F9)'
					sx={{
						position: 'absolute',
						top: isMobile ? '-15px' : '-70px',
						right: isMobile ? '27px' : '135px',
						zIndex: -1,
					}}
				/>
				<Circle
					size={isMobile ? 80 : 145}
					color='linear-gradient(135deg, #0044FF, #77C4F9)'
					sx={{
						position: 'absolute',
						bottom: isMobile ? '150px' : '-35px',
						left: isMobile ? '30px' : '90px',
						zIndex: -1,
					}}
				/>
				<Circle
					size={isMobile ? 45 : 91}
					color='linear-gradient(135deg, #0044FF, #77C4F9)'
					sx={{
						position: 'absolute',
						bottom: isMobile ? '80px' : '-40px',
						right: isMobile ? '105px' : '42%',
						zIndex: -1,
					}}
				/>
			</Box>
		</Box>
	)
}

export default HowWorkBlock
