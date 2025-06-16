import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
	titleStyles,
	cardStyles,
	titleCardStyles,
	descriptionStyles,
} from './style'

const BenefitsBlock = () => {
	const { t } = useTranslation()

	const benefits = [
		{ title: t('legally'), description: t('US law') },
		{ title: t('commission'), description: t('hiding costs') },
		{ title: t('quick'), description: t('can use') },
		{ title: t('counselling'), description: t('profitability') },
	]

	return (
		<Box sx={{ p: '150px 50px', overflow: 'hidden' }}>
			<Box sx={{ display: 'flex', gap: '15px' }}>
				<Typography
					sx={{
						background: 'linear-gradient(90deg, #1C1C1C, #ACACAC)',
						...titleStyles,
					}}
				>
					{t('advantages')}
				</Typography>
				<Typography
					sx={{
						background: 'linear-gradient(90deg, #3AA2FF, #0073FF)',
						...titleStyles,
					}}
				>
					{t('with us')}
				</Typography>
			</Box>
			<Box
				sx={{
					maxWidth: '860px',
					mt: '50px',
					ml: '15px',
					position: 'relative',
					display: 'flex',
					gap: '30px',
					flexWrap: 'wrap',
				}}
			>
				<Box
					component='img'
					src='lock.svg'
					sx={{
						position: 'absolute',
						top: '-50px',
						left: '550px',
						transform: 'rotate(15deg)',
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
