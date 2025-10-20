import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
	Typography,
} from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { LandingHeader } from '../LandingPage/components'
import RegisterModal from '../RegisterModal'
import ResetPasswordModal from '../ResetPasswordModal'
import { textFieldStyles } from './styles'
import { ResetPassword } from '@/api/authService'

const ResetPasswordPage = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()
	const [loading, setLoading] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)
	const [resetOpen, setResetOpen] = useState(false)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [dialogText, setDialogText] = useState('')
	const [dialogText2, setDialogText2] = useState('')
	const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState<Record<string, string>>({})

	const [token, setToken] = useState<string | null>(null)

	useEffect(() => {
		const params = new URLSearchParams(location.search)
		setToken(params.get('token'))
	}, [location.search])

	const resetForm = () => {
		setPassword('')
		setConfirmPassword('')
		setErrors({})
	}

	const validateForm = () => {
		const newErrors: Record<string, string> = {}

		if (!password) newErrors.password = t('password required')
		if (password !== confirmPassword) {
			newErrors.confirmPassword = t('passwords do not match')
		}
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleFieldChange = (field: string, value: string) => {
		setErrors(prev => {
			const newErrors = { ...prev }
			delete newErrors[field]
			return newErrors
		})

		switch (field) {
			case 'password':
				setPassword(value)
				break
			case 'confirmPassword':
				setConfirmPassword(value)
				break
			default:
				break
		}
	}

	const getTextFieldProps = (fieldName: string) => {
		const hasError = !!errors[fieldName]
		return {
			error: hasError,
			helperText: errors[fieldName],
			FormHelperTextProps: { sx: { color: 'red', mt: 0.5 } },
			sx: {
				...textFieldStyles,
				mb: hasError ? '0px' : '23.901px',
				'& .MuiInput-underline:after': {
					borderBottomColor: hasError ? 'red' : undefined,
				},
			},
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setErrors({})

		if (!validateForm()) {
			setLoading(false)
			return
		}

		try {
			await ResetPassword(token!, password)
			setIsSuccess(true)
			setDialogText(t('reset-success'))
			setDialogOpen(true)
			resetForm()
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message
			if (
				errorMessage.includes('пароль') ||
				errorMessage.includes('password')
			) {
				setErrors({ password: t('incorrect password') })
			} else if (errorMessage.includes('Токен')) {
				setIsSuccess(false)
				setDialogText(t('reset-error'))
				setDialogText2(t('try-another'))
				setDialogOpen(true)
			} else {
				setErrors({ form: errorMessage })
			}
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

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
							mb: '20px',
						}}
					>
						{t('password-reset')}
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('make up password')}
							type='password'
							// autoComplete={isLoginForm ? 'current-password' : 'new-password'}
							value={password}
							onChange={e => handleFieldChange('password', e.target.value)}
							disabled={loading}
							{...getTextFieldProps('password')}
						/>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('repeat password')}
							type='password'
							autoComplete='new-password'
							value={confirmPassword}
							onChange={e =>
								handleFieldChange('confirmPassword', e.target.value)
							}
							disabled={loading}
							{...getTextFieldProps('confirmPassword')}
						/>
						<Button
							type='submit'
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
							{loading ? (
								<CircularProgress size={24} color='inherit' />
							) : (
								t('reset-password')
							)}
						</Button>
					</form>
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
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				PaperProps={{
					sx: {
						boxSizing: 'border-box',
						width: '390px',
						minHeight: '263px',
						borderRadius: '24px',
						background: 'linear-gradient(180deg, #58A9FF 0%, #0044FF 50%)',
						color: '#FFFFFF',
						padding: '20px 16px',
					},
				}}
			>
				<DialogContent
					sx={{
						p: '8px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{isSuccess === true && (
						<CheckRoundedIcon
							sx={{
								width: '45px',
								height: '45px',
								borderRadius: '10px',
								background: 'linear-gradient(135deg, #0CAA0C, #60E260)',
							}}
						/>
					)}

					{isSuccess === false && (
						<CloseRoundedIcon
							sx={{
								width: '45px',
								height: '45px',
								borderRadius: '10px',
								background: 'linear-gradient(-45deg, #EF3030 0%, #980202 80%)',
							}}
						/>
					)}

					<Typography
						sx={{
							mt: '15px',
							fontFamily: 'Manrope',
							fontSize: '18px',
							fontWeight: 600,
							color: '#FFFFFF',
							textAlign: 'center',
						}}
					>
						{dialogText}
					</Typography>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '18px',
							color: '#FFFFFF',
							textAlign: 'center',
						}}
					>
						{dialogText2}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={async () => {
							setDialogOpen(false)
							navigate('/')
						}}
						sx={{
							width: '100%',
							height: '56px',
							border: '1px solid #232323',
							borderRadius: '6px',
							backgroundColor: '#FFFFFF',
							display: 'inline-block',
						}}
					>
						<Typography
							sx={{
								background: 'linear-gradient(180deg, #58A9FF 0%, #0044FF 50%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								fontFamily: 'Manrope',
								fontSize: '20px',
								fontWeight: 700,
								textTransform: 'none',
							}}
						>
							{t('return to the main page')}
						</Typography>
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default ResetPasswordPage
