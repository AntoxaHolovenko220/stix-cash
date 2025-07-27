import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FirstStep from './components/FirstStep/FirstStep'
import { useEffect, useState } from 'react'
import SecondStep from './components/SecondStep/SecondStep'
import { Client, getProfile } from '@/api/clientService'

const TopUpPage = () => {
	const { t } = useTranslation()

	const [profile, setProfile] = useState<Client>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

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
	}, [])

	const [method, setMethod] = useState<
		'paypalAddress' | 'zelleTransfer' | 'wireTransfer' | 'walletBTCAddress'
	>('paypalAddress')
	const [checkForm, setCheckFrom] = useState(false)

	return (
		<Box>
			{!checkForm ? (
				<FirstStep
					selectedOption={method}
					setSelectedOption={setMethod}
					setCheckForm={setCheckFrom}
					profile={profile!}
				/>
			) : (
				<SecondStep method={method} profile={profile!} />
			)}
		</Box>
	)
}

export default TopUpPage
