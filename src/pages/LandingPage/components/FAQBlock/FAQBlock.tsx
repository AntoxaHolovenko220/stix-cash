import { useState } from 'react'
import { Box, Typography, IconButton, Collapse } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FAQBlock = () => {
	const { t } = useTranslation()

	const faqItems = [
		{
			question: t('get money'),
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id faucibus nulla. Donec non ante sem. Donec lorem est, molestie eget finibus vitae, pulvinar nec leo.',
		},
		{
			question: t('time'),
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id faucibus nulla. Donec non ante sem. Donec lorem est, molestie eget finibus vitae, pulvinar nec leo.',
		},
		{
			question: t('risks'),
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id faucibus nulla. Donec non ante sem. Donec lorem est, molestie eget finibus vitae, pulvinar nec leo.',
		},
		{
			question: t('commissions'),
			answer:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id faucibus nulla. Donec non ante sem. Donec lorem est, molestie eget finibus vitae, pulvinar nec leo.',
		},
	]

	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const handleToggle = (index: number) => {
		setOpenIndex(prev => (prev === index ? null : index))
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				px: '50px',
				pb: '150px',
			}}
		>
			<Typography
				sx={{
					mt: '65px',
					mb: '30px',
					fontFamily: 'Public Sans',
					fontStyle: 'italic',
					fontSize: '55px',
					fontWeight: 600,
					lineHeight: 1,
					color: '#000000',
				}}
			>
				FAQ
			</Typography>
			<Box
				sx={{
					p: '35px 90px',
					backgroundColor: '#242424',
					borderRadius: '42px',
				}}
			>
				{faqItems.map((item, index) => (
					<Box
						key={index}
						sx={{
							my: '15px',
							borderRadius: '10px',
							background: 'linear-gradient(90deg, #006CFF, #3AA2FF)',
							color: '#FFFFFF',
							overflow: 'hidden',
							border: `1px solid #979797`,
						}}
					>
						<Box
							sx={{
								height: '98px',
								px: '32px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								cursor: 'pointer',
							}}
							onClick={() => handleToggle(index)}
						>
							<Typography
								sx={{
									fontFamily: 'Manrope',
									fontSize: '32px',
									fontStyle: 'italic',
									flexGrow: 1,
									color: '#FFFFFF',
									fontWeight: 300,
								}}
							>
								{item.question}
							</Typography>
							<IconButton
								sx={{
									transform:
										openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
									transition: '0.3s',
								}}
							>
								<ExpandMoreIcon
									sx={{
										width: '40px',
										height: '40px',
										color: '#FFFFFF',
									}}
								/>
							</IconButton>
						</Box>

						<Collapse in={openIndex === index} timeout='auto' unmountOnExit>
							<Box
								sx={{
									p: '32px',
									background: 'linear-gradient(90deg, #2D2D2D, #003277)',
								}}
							>
								<Typography
									sx={{
										fontFamily: 'Manrope',
										fontSize: '27px',
										fontWeight: 200,
										color: '#FFFFFF',
										lineHeight: 1,
									}}
								>
									{item.answer}
								</Typography>
							</Box>
						</Collapse>
					</Box>
				))}
			</Box>
		</Box>
	)
}

export default FAQBlock
