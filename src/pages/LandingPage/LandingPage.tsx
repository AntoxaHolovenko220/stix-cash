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
		<Box>
			<LandingHeader />
			<Box sx={{ height: '84px' }} />
			<CardBlock />
			<HowFixBlock />
			<HowWorkBlock />
			<BenefitsBlock />
			<ConnectionBlock />
			<FeedbackBlock />
			<FAQBlock />
			<LandingFooter />
		</Box>
	)
}

export default LandingPage
