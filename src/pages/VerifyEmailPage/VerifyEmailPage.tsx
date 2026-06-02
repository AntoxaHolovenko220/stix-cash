import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LandingHeader } from '../LandingPage/components'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import RegisterModal from '../RegisterModal'
import { useTranslation } from 'react-i18next'
import ResetPasswordModal from '../ResetPasswordModal'

const API_URL = import.meta.env.VITE_API_URL

type VerifyStatus = 'loading' | 'ok' | 'invalid' | 'not_found' | 'idle'

const VerifyEmailPage = () => {
	const { t } = useTranslation()
	const [searchParams] = useSearchParams()
	const [modalOpen, setModalOpen] = useState(false)
	const [resetOpen, setResetOpen] = useState(false)
	const [status, setStatus] = useState<VerifyStatus>('idle')

	useEffect(() => {
		const token = searchParams.get('token')
		const statusParam = searchParams.get('status')

		if (token) {
			setStatus('loading')
			window.location.replace(
				`${API_URL}/auth/verify-email?token=${encodeURIComponent(token)}`
			)
			return
		}

		if (statusParam === 'ok') {
			setStatus('ok')
		} else if (statusParam === 'invalid') {
			setStatus('invalid')
		} else if (statusParam === 'not_found') {
			setStatus('not_found')
		}
	}, [searchParams])

	const title =
		status === 'loading'
			? t('verify_email_loading')
			: status === 'ok'
				? t('confirmed')
				: status === 'invalid'
					? t('verify_email_invalid')
					: status === 'not_found'
						? t('verify_email_not_found')
						: t('confirmed')

	const description =
		status === 'loading'
			? t('verify_email_loading_hint')
			: status === 'ok'
				? t('thank')
				: status === 'invalid'
					? t('verify_email_invalid_hint')
					: status === 'not_found'
						? t('verify_email_not_found_hint')
						: t('thank')

	return (
		<Box>
			<LandingHeader setModalOpen={setModalOpen} />
			<Box sx={{ height: '80px' }} />
			<Box
				sx={{
					width: '100%',
					height: 'calc(100vh - 80px)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Box
					sx={{
						maxWidth: '446px',
						width: '100%',
						p: '24px',
						border: '1px solid #1F1FFF',
						borderRadius: '20px',
						boxSizing: 'border-box',
					}}
				>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '24px',
							fontWeight: 600,
							textAlign: 'center',
						}}
					>
						{title}
					</Typography>
					<Typography
						sx={{
							mt: '20px',
							fontFamily: 'Manrope',
							fontSize: '16px',
						}}
					>
						{description}
					</Typography>
					{status === 'loading' ? (
						<Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
							<CircularProgress />
						</Box>
					) : status === 'ok' ? (
						<Button
							onClick={() => setModalOpen(true)}
							fullWidth
							variant='contained'
							sx={{
								height: '56px',
								mt: '20px',
								border: '1px solid #414141',
								borderRadius: '6px',
								background: 'linear-gradient(90deg, #58A9FF, #0044FF)',
								fontFamily: 'Manrope',
								fontSize: '22px',
								fontWeight: 500,
								textTransform: 'none',
							}}
						>
							{t('log in')}
						</Button>
					) : null}
				</Box>
			</Box>
			<RegisterModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onReset={() => setResetOpen(true)}
			/>
			<ResetPasswordModal
				open={resetOpen}
				onClose={() => setResetOpen(false)}
			/>
		</Box>
	)
}

export default VerifyEmailPage
