import React from 'react'
import { useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	IconButton,
	Typography,
	Checkbox,
	Box,
	CircularProgress,
	Autocomplete,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'

import countries from './countries.json'
import { useRegisterModal } from './useRegisterModal'
import { AuthModalProps } from './types'
import {
	dialogStyles,
	closeButtonStyles,
	textFieldStyles,
	agreementTextStyles,
	linkStyles,
	primaryButtonStyles,
	secondaryButtonStyles,
	footerTextStyles,
} from './styles'

const RegisterModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
	const { t } = useTranslation()
	const {
		isLoginForm,
		email,
		password,
		confirmPassword,
		firstName,
		lastName,
		phone,
		country,
		isTermsAccepted,
		loading,
		error,
		setEmail,
		setPassword,
		setConfirmPassword,
		setFirstName,
		setLastName,
		setPhone,
		setCountry,
		setІsTermsAccepted,
		handlePhoneChange,
		handleSubmit,
		switchAuthMode,
		resetForm,
	} = useRegisterModal()

	useEffect(() => {
		console.log('Agree updated:', isTermsAccepted)
	}, [isTermsAccepted])

	const handleClose = () => {
		resetForm()
		onClose()
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth='xs'
			fullWidth
			PaperProps={dialogStyles.PaperProps}
		>
			<IconButton onClick={handleClose} sx={closeButtonStyles}>
				<CloseIcon />
			</IconButton>

			<form onSubmit={handleSubmit}>
				<DialogContent sx={{ mt: '30px', pb: 0 }}>
					{error && (
						<Typography color='error' gutterBottom>
							{error}
						</Typography>
					)}

					{!isLoginForm && (
						<>
							<TextField
								variant='standard'
								required
								fullWidth
								placeholder={t('name')}
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
								sx={textFieldStyles}
							/>
							<TextField
								variant='standard'
								required
								fullWidth
								placeholder={t('surname')}
								value={lastName}
								onChange={e => setLastName(e.target.value)}
								sx={textFieldStyles}
							/>
						</>
					)}

					<TextField
						variant='standard'
						required
						fullWidth
						placeholder={isLoginForm ? t('your email') : 'Email'}
						type='email'
						autoComplete='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						disabled={loading}
						sx={textFieldStyles}
					/>

					{!isLoginForm && (
						<>
							<TextField
								variant='standard'
								required
								fullWidth
								placeholder={t('phone number')}
								value={phone}
								onChange={e => handlePhoneChange(e.target.value)}
								// inputProps={{
								// 	pattern: '[0-9]*',
								// }}
								sx={textFieldStyles}
							/>

							<Autocomplete
								options={countries}
								getOptionLabel={option => option.label}
								value={country}
								onChange={(_, newValue) => setCountry(newValue)}
								renderInput={params => (
									<TextField
										{...params}
										variant='standard'
										placeholder={t('country')}
										required
									/>
								)}
								sx={{ mb: 2 }}
							/>
						</>
					)}

					<TextField
						variant='standard'
						required
						fullWidth
						placeholder={isLoginForm ? t('password') : t('make up password')}
						type='password'
						autoComplete={isLoginForm ? 'current-password' : 'new-password'}
						value={password}
						onChange={e => setPassword(e.target.value)}
						disabled={loading}
						sx={textFieldStyles}
					/>

					{!isLoginForm && (
						<>
							<TextField
								variant='standard'
								required
								fullWidth
								placeholder={t('repeat password')}
								type='password'
								autoComplete='new-password'
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								error={password !== confirmPassword && confirmPassword !== ''}
								disabled={loading}
								sx={textFieldStyles}
							/>

							<Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
								<Checkbox
									checked={isTermsAccepted}
									onChange={() => setІsTermsAccepted(!isTermsAccepted)}
									disabled={loading}
									sx={{ mt: '-9px', ml: '-11px' }}
								/>
								<Typography sx={agreementTextStyles}>
									{t('aknowledge')}{' '}
									<span style={linkStyles}>{t('agreement')}</span> {t('and')}{' '}
									<span style={linkStyles}>{t('statement')}</span>{' '}
									{t('legal age')}
								</Typography>
							</Box>
						</>
					)}

					{isLoginForm && (
						<Typography sx={{ ...footerTextStyles, cursor: 'pointer' }}>
							{t('forgot password')}
						</Typography>
					)}
				</DialogContent>

				<DialogActions sx={{ flexDirection: 'column', px: 3, pb: 3, pt: 0 }}>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						disabled={loading}
						sx={primaryButtonStyles}
					>
						{loading ? (
							<CircularProgress size={24} color='inherit' />
						) : isLoginForm ? (
							t('log in')
						) : (
							t('register')
						)}
					</Button>

					{isLoginForm && (
						<Typography sx={footerTextStyles}>
							{t('log in button')}{' '}
							<span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
								{t('personal data')}
							</span>
						</Typography>
					)}

					<Typography sx={{ ...footerTextStyles, cursor: 'pointer' }}>
						{isLoginForm ? t('no account') : t('have account')}
					</Typography>

					<Button
						fullWidth
						variant='outlined'
						onClick={switchAuthMode}
						disabled={loading}
						sx={secondaryButtonStyles}
					>
						{isLoginForm ? t('register') : t('log in')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}

export default React.memo(RegisterModal)
