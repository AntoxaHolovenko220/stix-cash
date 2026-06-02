import { Box, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FirstStep from './components/FirstStep/FirstStep'
import { useEffect, useState } from 'react'
import SecondStep from './components/SecondStep/SecondStep'
import { Client, getProfile } from '@/api/clientService'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'
import routes from '@/router/routes.json'
import { VerificationRequiredModal } from '@/components'

const WithdrawPage = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const [profile, setProfile] = useState<Client>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [verificationModalOpen, setVerificationModalOpen] = useState(false)

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await getProfile()
				setProfile(data)
			} catch (err) {
				setError(t('error occurred'))
				console.error('Failed to fetch profile:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchProfile()
	}, [t])

	const [method, setMethod] = useState<
		'paypalAddress' | 'zelleTransfer' | 'walletBTCAddress' | 'card'
	>('paypalAddress')
	const [checkForm, setCheckFrom] = useState(false)

	if (loading || !profile) {
		return null
	}

	if (error) {
		return <Box sx={{ p: 2 }}>{error}</Box>
	}

	return (
		<Box>
			{!checkForm ? (
				<FirstStep
					selectedOption={method}
					setSelectedOption={setMethod}
					setCheckForm={setCheckFrom}
					profile={profile}
					onVerificationRequired={() => setVerificationModalOpen(true)}
				/>
			) : (
				<>
					<IconButton
						sx={{ position: 'absolute', top: '46px', left: '12px' }}
						onClick={() => setCheckFrom(false)}
					>
						<KeyboardBackspaceIcon sx={{ color: '#000000' }} />
					</IconButton>
					<SecondStep
						method={method}
						profile={profile}
						setCheckForm={setCheckFrom}
						onVerificationRequired={() => setVerificationModalOpen(true)}
					/>
				</>
			)}

			<VerificationRequiredModal
				open={verificationModalOpen}
				onClose={() => setVerificationModalOpen(false)}
				onVerify={() => {
					setVerificationModalOpen(false)
					navigate(routes.ProfilePage.path)
				}}
			/>
		</Box>
	)
}

export default WithdrawPage
