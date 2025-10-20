import { useState } from 'react'
import {
	Alert,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	IconButton,
	Snackbar,
	TextField,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { ResetModalProps } from './types'
import { useTranslation } from 'react-i18next'
import { ForgotPassword } from '@/api/authService'

const ResetPasswordModal = ({ open, onClose }: ResetModalProps) => {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(false)
	const [showSuccessAlert, setShowSuccessAlert] = useState(false)
	const [email, setEmail] = useState('')

	const resetForm = () => {
		setEmail('')
	}

	const handleClose = () => {
		resetForm()
		onClose()
	}

	const handleSubmit = async (e?: React.FormEvent) => {
		e?.preventDefault()
		setLoading(true)
		try {
			await ForgotPassword(email)
			setShowSuccessAlert(true)
			onClose()
		} catch (error) {
			console.log('Error while sending email', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth='xs'
				fullWidth
				PaperProps={{ sx: { borderRadius: '20px' } }}
			>
				<IconButton
					onClick={handleClose}
					sx={{
						position: 'absolute',
						top: '5px',
						right: '5px',
					}}
				>
					<CloseIcon />
				</IconButton>

				<form onSubmit={handleSubmit}>
					<DialogContent sx={{ mt: '30px' }}>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('your email')}
							type='email'
							autoComplete='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							sx={{
								'& .MuiInput-root': {
									'&:before': {
										borderBottomColor: '#E0E0E0',
									},
									'&:hover:not(.Mui-disabled):before': {
										borderBottomColor: '#BDBDBD',
									},
								},
								'& .MuiInput-input': {
									fontFamily: 'Manrope',
								},
							}}
						/>
					</DialogContent>
					<DialogActions sx={{ p: ' 0px 24px 20px' }}>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							disabled={loading}
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
							{loading ? (
								<CircularProgress size={24} color='inherit' />
							) : (
								t('reset-password')
							)}
						</Button>
					</DialogActions>
				</form>
			</Dialog>

			<Snackbar
				open={showSuccessAlert}
				autoHideDuration={5000}
				onClose={() => setShowSuccessAlert(false)}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				style={{ zIndex: 15000 }}
			>
				<Alert
					icon={<CheckIcon fontSize='inherit' />}
					severity='success'
					variant='filled'
					style={{ zIndex: 15000 }}
				>
					{t('reset-request')}
				</Alert>
			</Snackbar>
		</>
	)
}

export default ResetPasswordModal
