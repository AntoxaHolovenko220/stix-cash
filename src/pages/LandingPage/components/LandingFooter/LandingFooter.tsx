import { useState } from 'react'
import { Box, Button, useMediaQuery, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CustomerSupportModal, DocumentsModal } from '@/components'
import { DocumentInterface } from '@/components/DocumentsModal/DocumentsModal'
import termsData from '../../../../documents/terms_and_conditions.json'
import publicOffer from '../../../../documents/public_offer.json'
import privatePolicy from '../../../../documents/private_policy.json'
import kycPolicy from '../../../../documents/kyc_policy.json'
import disclaimer from '../../../../documents/disclaimer.json'
import amlPolicy from '../../../../documents/aml_privacy.json'
import FAQ from '../../../../documents/FAQ.json'

const LandingFooter = () => {
	const { t } = useTranslation()

	const [openCustomerSupportModal, setOpenCustomerSupportModal] =
		useState(false)

	const [documentsModal, setDocumentsModal] = useState(false)
	const [data, setData] = useState<DocumentInterface>()

	const isMobile = useMediaQuery('(max-width:480px)')

	const footerStyles = {
		py: isMobile ? '30px' : '50px',
		px: isMobile ? '20px' : '50px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: 'linear-gradient(120deg, #3B3B3B, #161A1A)',
		boxSizing: 'border-box',
	}

	const contactsBoxStyles = {
		maxWidth: isMobile ? '272px' : '335px',
		width: '100%',
		height: isMobile ? '60px' : '74px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '8px',
		borderRadius: '12px',
		background: 'linear-gradient(120deg, #1D1D1D, #000000)',
	}

	const contactTextStyles = {
		fontFamily: 'Manrope',
		fontSize: isMobile ? '16px' : '20px',
		fontWeight: 300,
	}

	const miniButtonStyles = {
		maxWidth: isMobile ? '157px' : '220px',
		width: '100%',
		minHeight: isMobile ? '36px' : '48px',
		borderRadius: '8px',
		fontFamily: 'Manrope',
		fontSize: isMobile ? '12px' : '16px',
		fontWeight: 300,
		color: '#3AA2FF',
		textTransform: 'none',
		background: 'linear-gradient(120deg, #1D1D1D, #000000)',
	}

	return (
		<Box sx={footerStyles}>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'row',
					rowGap: '20px',
					columnGap: '20px',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				<Box sx={contactsBoxStyles}>
					<Typography
						sx={{
							...contactTextStyles,
							color: '#3AA2FF',
						}}
					>
						email:
					</Typography>
					<Typography
						sx={{
							...contactTextStyles,
							color: '#FFFFFF',
						}}
					>
						styxcash@gmail.com
					</Typography>
				</Box>
				<Box sx={contactsBoxStyles}>
					<Typography
						sx={{
							...contactTextStyles,
							color: '#3AA2FF',
						}}
					>
						{t('phone')}
					</Typography>
					<Typography
						sx={{
							...contactTextStyles,
							color: '#3AA2FF',
						}}
					>
						+ 1 316 742 8113
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					width: '100%',
					mt: '20px',
					display: 'flex',
					flexDirection: 'row',
					rowGap: '20px',
					columnGap: '20px',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				<Button
					onClick={() => setOpenCustomerSupportModal(true)}
					sx={miniButtonStyles}
				>
					{t('support')}
				</Button>
				<Button
					onClick={() => {
						setDocumentsModal(true)
						setData(privatePolicy)
					}}
					sx={miniButtonStyles}
				>
					{t('policy')}
				</Button>
				<Button
					onClick={() => {
						setDocumentsModal(true)
						setData(termsData)
					}}
					sx={miniButtonStyles}
				>
					{t('terms')}
				</Button>
				<Button
					onClick={() => {
						setDocumentsModal(true)
						setData(publicOffer)
					}}
					sx={miniButtonStyles}
				>
					{t('offer')}
				</Button>
				<Button
					onClick={() => {
						setDocumentsModal(true)
						setData(kycPolicy)
					}}
					sx={miniButtonStyles}
				>
					{t('kyc')}
				</Button>
				<Button
					onClick={() => {
						setDocumentsModal(true)
						setData(disclaimer)
					}}
					sx={miniButtonStyles}
				>
					{t('disclaimer')}
				</Button>
				<Button
					onClick={() => {
						setDocumentsModal(true)
						setData(amlPolicy)
					}}
					sx={miniButtonStyles}
				>
					{t('aml')}
				</Button>
				<Button
					onClick={() => {
						setDocumentsModal(true)
						setData(FAQ)
					}}
					sx={miniButtonStyles}
				>
					FAQ
				</Button>
			</Box>
			<CustomerSupportModal
				open={openCustomerSupportModal}
				onClose={() => setOpenCustomerSupportModal(false)}
			/>
			{data && (
				<DocumentsModal
					open={documentsModal}
					onClose={() => setDocumentsModal(false)}
					data={data}
				/>
			)}
		</Box>
	)
}

export default LandingFooter
