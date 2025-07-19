import { useEffect, useState } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { Loader } from '@/components'
import { useTranslation } from 'react-i18next'
import { getProfile, Client } from '@/api/clientService'
import UserInfoBlock from './UserInfoBlock'
import DocumentVerificationBlock from './DocumentVerificationBlock'

const ProfilePage = () => {
	const { t } = useTranslation()
	const [profile, setProfile] = useState<Client>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [showDocument, setShowDocument] = useState(false)

	const isMobile = useMediaQuery('(max-width:480px)')

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

	if (loading) return <Loader />
	if (error) return <Typography color='error'>{error}</Typography>
	if (!profile) return <Typography>{t('error occurred')}</Typography>

	return (
		<Box>
			<Typography sx={{ ml: '2px', fontFamily: 'Manrope', fontSize: '14px' }}>
				<span style={{ opacity: 0.5 }}>{t('home')}</span> | {t('profile')}
			</Typography>
			<Box
				sx={{
					mt: '100px',
					display: 'flex',
					gap: '20px',
					justifyContent: 'space-around',
					boxShadow: 'border-box',
				}}
			>
				{!showDocument && (
					<UserInfoBlock
						profile={profile}
						setProfile={setProfile}
						setShowDocument={setShowDocument}
					/>
				)}
				{profile.verificationStatus === 'unverified' && !isMobile && (
					<DocumentVerificationBlock
						setProfile={setProfile}
						setShowDocument={setShowDocument}
					/>
				)}
				{showDocument && (
					<DocumentVerificationBlock
						setProfile={setProfile}
						setShowDocument={setShowDocument}
					/>
				)}
			</Box>
		</Box>
	)
}

export default ProfilePage
