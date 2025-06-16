import { Box } from '@mui/material'
import {
	BenefitsBlock,
	CardBlock,
	ConnectionBlock,
	FAQBlock,
	FeedbackBlock,
	HowFixBlock,
	HowWorkBlock,
	LandingFooter,
	LandingHeader,
} from './components'

const LandingPage = () => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateRows: 'auto 1fr',
				height: '100vh',
				overflow: 'hidden',
			}}
		>
			<LandingHeader />
			<Box sx={{ height: '84px' }} />
			<Box sx={{ overflow: 'auto' }}>
				<CardBlock />
				<HowFixBlock />
				<HowWorkBlock />
				<BenefitsBlock />
				<ConnectionBlock />
				<FeedbackBlock />
				<FAQBlock />
				<LandingFooter />
			</Box>
		</Box>
	)
}

export default LandingPage
