import { useState } from 'react'
import { LandingHeader } from '../LandingPage/components'
import { Box, Button, Typography } from '@mui/material'
import RegisterModal from '../RegisterModal'
import { useTranslation } from 'react-i18next'
import ResetPasswordModal from '../ResetPasswordModal'

export interface ModalProps {
	setModalOpen: (value: boolean) => void
}

const VerifyEmailPage = () => {
	const { t } = useTranslation()
	const [modalOpen, setModalOpen] = useState(false)
	const [resetOpen, setResetOpen] = useState(false)

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
						{t('confirmed')}
					</Typography>
					<Typography
						sx={{
							mt: '20px',
							fontFamily: 'Manrope',
							fontSize: '16px',
						}}
					>
						{t('thank')}
					</Typography>
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
							'&:disabled': {
								background: '#E0E0E0',
							},
						}}
					>
						{t('log in')}
					</Button>
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
