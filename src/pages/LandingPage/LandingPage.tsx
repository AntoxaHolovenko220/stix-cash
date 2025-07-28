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
import { useState } from 'react'
import RegisterModal from '../RegisterModal'

export interface ModalProps {
	setModalOpen: (value: boolean) => void
}

const LandingPage = () => {
	const [modalOpen, setModalOpen] = useState(false)

	return (
		<Box>
			<LandingHeader setModalOpen={setModalOpen} />
			<Box sx={{ height: '80px' }} />
			<CardBlock setModalOpen={setModalOpen} />
			<HowFixBlock />
			<HowWorkBlock />
			<BenefitsBlock />
			<ConnectionBlock setModalOpen={setModalOpen} />
			<FeedbackBlock />
			<FAQBlock />
			<LandingFooter />
			<RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
		</Box>
	)
}

export default LandingPage
