import Circle from '../Circle'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
	titleStyles,
	numberStyles,
	cardStyles,
	descriptionStyles,
} from './style'

const HowWorkBlock = () => {
	const { t } = useTranslation()

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
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
				<Typography
					sx={{
						background: 'linear-gradient(90deg, #323030, #B1B1B1)',
						...titleStyles,
					}}
				>
					{t('how does')}
				</Typography>
				<Typography
					sx={{
						background: 'linear-gradient(90deg, #45A5FF, #31A0FF)',
						...titleStyles,
					}}
				>
					{t('it work')}
				</Typography>
			</Box>
			<Box
				sx={{
					my: '50px',
					position: 'relative',
					display: 'flex',
					justifyContent: 'center',
					gap: '60px',
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
					size={145}
					color='linear-gradient(135deg, #0044FF, #77C4F9)'
					sx={{
						position: 'absolute',
						top: '-70px',
						right: '135px',
						zIndex: -1,
					}}
				/>
				<Circle
					size={145}
					color='linear-gradient(135deg, #0044FF, #77C4F9)'
					sx={{
						position: 'absolute',
						bottom: '-35px',
						left: '90px',
						zIndex: -1,
					}}
				/>
				<Circle
					size={91}
					color='linear-gradient(135deg, #0044FF, #77C4F9)'
					sx={{
						position: 'absolute',
						bottom: '-40px',
						right: '42%',
						zIndex: -1,
					}}
				/>
			</Box>
		</Box>
	)
}

export default HowWorkBlock
