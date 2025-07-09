import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
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
					mt: '30px',
					display: 'flex',
					gap: '20px',
					justifyContent: 'space-around',
				}}
			>
				<UserInfoBlock profile={profile} />
				{profile.isVerified === false && <DocumentVerificationBlock />}
			</Box>
		</Box>
	)
}

export default ProfilePage
