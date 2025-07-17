import { useState } from 'react'
import {
	Box,
	Typography,
	IconButton,
	Collapse,
	useMediaQuery,
} from '@mui/material'
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

	const isMobile = useMediaQuery('(max-width:480px)')

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				px: isMobile ? '20px' : '50px',
				pb: isMobile ? '50px' : '150px',
				boxSizing: 'border-box',
			}}
		>
			<Typography
				sx={{
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
					p: isMobile ? '20px' : '35px 90px',
					backgroundColor: '#242424',
					borderRadius: isMobile ? '30px' : '42px',
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
							boxSizing: 'border-box',
						}}
					>
						<Box
							sx={{
								height: isMobile ? '75px' : '98px',
								px: isMobile ? '15px' : '32px',
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
									fontSize: isMobile ? '24px' : '32px',
									fontStyle: 'italic',
									flexGrow: 1,
									color: '#FFFFFF',
									fontWeight: 300,
									lineHeight: 1,
								}}
							>
								{item.question}
							</Typography>
							<IconButton
								sx={{
									mr: isMobile ? '-10px' : '0px',
									transform:
										openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
									transition: '0.3s',
								}}
							>
								<ExpandMoreIcon
									sx={{
										width: isMobile ? '25px' : '40px',
										height: isMobile ? '25px' : '40px',
										color: '#FFFFFF',
									}}
								/>
							</IconButton>
						</Box>

						<Collapse in={openIndex === index} timeout='auto' unmountOnExit>
							<Box
								sx={{
									p: isMobile ? '15px' : '32px',
									background: 'linear-gradient(90deg, #2D2D2D, #003277)',
								}}
							>
								<Typography
									sx={{
										fontFamily: 'Manrope',
										fontSize: isMobile ? '20px' : '27px',
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
