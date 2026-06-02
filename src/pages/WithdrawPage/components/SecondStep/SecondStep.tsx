import {
	Box,
	TextField,
	Typography,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction, useState } from 'react'
import { Client, updateProfileField } from '@/api/clientService'
import { useRandomId } from '@/hooks/useRandomId'
import { createUserTransaction } from '@/api/transactionService'
import { useNavigate } from 'react-router-dom'
import routes from '@/router/routes.json'
import { isKycVerified } from '@/utils/isKycVerified'

const commonTextStyles = {
	fontFamily: 'Manrope',
	lineHeight: 1,
}

const textFieldStyles = {
	'& .MuiInput-root': {
		'&:before': { borderBottomColor: '#E0E0E0' },
		'&:hover:not(.Mui-disabled):before': { borderBottomColor: '#BDBDBD' },
	},
	'& .MuiInput-input': { fontFamily: 'Manrope' },
	'& .Mui-error': {
		'& .MuiInput-root': {
			'&:before': { borderBottomColor: '#DE0000' },
			'&:after': { borderBottomColor: '#DE0000' },
			'&:hover:not(.Mui-disabled):before': { borderBottomColor: '#DE0000' },
		},
	},
}

type Method = 'paypalAddress' | 'zelleTransfer' | 'walletBTCAddress' | 'card'

interface Props {
	method: Method
	profile: Client
	setCheckForm: Dispatch<SetStateAction<boolean>>
	onVerificationRequired: () => void
}

const getMethodLabel = (method: Method) => {
	switch (method) {
		case 'paypalAddress':
			return 'PayPal'
		case 'walletBTCAddress':
			return 'Crypto'
		case 'zelleTransfer':
			return 'Zelle'
		case 'card':
			return 'Visa / Mastercard'
	}
}

const SecondStep = ({
	method,
	profile,
	setCheckForm,
	onVerificationRequired,
}: Props) => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const [dialogOpen, setDialogOpen] = useState(false)
	const [dialogText, setDialogText] = useState('')
	const [dialogText2, setDialogText2] = useState('')
	const [dialogText3, setDialogText3] = useState('')
	const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
	const [amountError, setAmountError] = useState('')

	const [paypalAddress, setPaypalAddress] = useState('')
	const [walletBTCAddress, setWalletBTCAddress] = useState(
		profile.walletBTCAddress ?? '',
	)
	const [zelleTransferName, setZelleTransferName] = useState(
		profile.zelleTransfer.recipientName ?? '',
	)
	const [zelleTransferEmail, setZelleTransferEmail] = useState(
		profile.zelleTransfer.email ?? '',
	)
	const [zelleTransferPhone, setZelleTransferPhone] = useState(
		profile.zelleTransfer.phone ?? '',
	)
	const [amount, setAmount] = useState('')
	const generateRandomId = useRandomId()
	const [transactionId] = useState(() => generateRandomId())

	const handlePhoneChange = (value: string) => {
		const digits = value.replace(/\D/g, '')
		setZelleTransferPhone(digits.length === 0 ? '' : `+${digits}`)
	}

	const isButtonDisabled = () => {
		if (amountError) return true
		if (!amount || Number(amount) <= 0) return true
		if (method === 'paypalAddress' && !paypalAddress) return true
		if (method === 'walletBTCAddress' && !walletBTCAddress) return true
		if (method === 'zelleTransfer') {
			if (!zelleTransferName || !zelleTransferEmail || !zelleTransferPhone) {
				return true
			}
		}
		return false
	}

	const handleCreateTransaction = async () => {
		if (!isKycVerified(profile.kycStatus)) {
			onVerificationRequired()
			return
		}

		try {
			let paymentDetails: Record<string, string> = {}

			if (method === 'paypalAddress') {
				paymentDetails = { paypalAddress }
			} else if (method === 'walletBTCAddress') {
				paymentDetails = { walletBTCAddress }
			} else if (method === 'zelleTransfer') {
				paymentDetails = {
					recipientName: zelleTransferName,
					email: zelleTransferEmail,
					phone: zelleTransferPhone,
				}
			}

			if (!profile.isTransactionAllowed) {
				setIsSuccess(false)
				setDialogText(t('oops'))
				setDialogText2(t('writing to support'))
				setDialogText3(t('we help'))
				setDialogOpen(true)
				return
			}

			await createUserTransaction({
				type: 'withdrawal',
				amount: Number(amount).toFixed(2),
				method,
				date: new Date(Date.now()).toISOString(),
				status: 'pending',
				transactionId,
				paymentDetails,
			})
			await updateProfileField({
				balance: (Number(profile.balance) - Number(amount)).toFixed(2),
			})
			setIsSuccess(true)
			setDialogText(t('ready-steady'))
			setDialogOpen(true)
		} catch (err) {
			console.error(err)
			setIsSuccess(false)
			setDialogText(t('oops'))
			setDialogText2(t('writing to support'))
			setDialogText3(t('we help'))
			setDialogOpen(true)
		}
	}

	const inputs: Record<
		Exclude<Method, 'card'>,
		Array<{
			name: string
			key: string
			value: string
			onchange: (val: string) => void
		}>
	> = {
		paypalAddress: [
			{
				name: t('paypal payout address'),
				key: 'paypalAddress',
				value: paypalAddress,
				onchange: setPaypalAddress,
			},
		],
		walletBTCAddress: [
			{
				name: t('BTC adress'),
				key: 'walletBTCAddress',
				value: walletBTCAddress,
				onchange: setWalletBTCAddress,
			},
		],
		zelleTransfer: [
			{
				name: t('first name'),
				key: 'zelleTransferName',
				value: zelleTransferName,
				onchange: setZelleTransferName,
			},
			{
				name: t('email'),
				key: 'zelleTransferEmail',
				value: zelleTransferEmail,
				onchange: setZelleTransferEmail,
			},
			{
				name: t('number'),
				key: 'zelleTransferPhone',
				value: zelleTransferPhone,
				onchange: handlePhoneChange,
			},
		],
	}

	const methodLabel = getMethodLabel(method)

	return (
		<Box>
			<Typography sx={{ ml: '2px', ...commonTextStyles, fontSize: '14px' }}>
				<span style={{ opacity: 0.5 }}>
					{t('home')} |{' '}
					<span
						onClick={() => setCheckForm(false)}
						style={{ cursor: 'pointer' }}
					>
						{t('withdraw')}
					</span>
				</span>{' '}
				| {methodLabel}
			</Typography>

			<Typography
				sx={{
					mt: '60px',
					...commonTextStyles,
					fontSize: '22px',
					fontWeight: 700,
					textTransform: 'uppercase',
				}}
			>
				{t('step 2 of 2')}
			</Typography>

			<Typography
				sx={{
					mt: '10px',
					...commonTextStyles,
					fontSize: '16px',
					fontWeight: 400,
				}}
			>
				{t('please provide data')} <span>{methodLabel}</span>
			</Typography>

			<Box
				sx={{
					maxWidth: '500px',
					width: '100%',
					m: '30px auto',
					p: '20px',
					backgroundColor: '#F8F8F8',
					borderRadius: '28px',
					boxSizing: 'border-box',
				}}
			>
				<Box
					sx={{
						mt: method === 'card' ? '10px' : '15px',
						mb: method === 'card' ? '20px' : '25px',
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
					}}
				>
					<Box
						component='img'
						src={
							method === 'paypalAddress'
								? '/bigpaypal.svg'
								: method === 'walletBTCAddress'
									? '/bigwallet.svg'
									: method === 'zelleTransfer'
										? '/bigzelle.svg'
										: '/visa.png'
						}
						sx={{
							width:
								method === 'paypalAddress'
									? '75px'
									: method === 'zelleTransfer'
										? '60x'
										: method === 'walletBTCAddress'
											? '34px'
											: '65px',
						}}
					/>
					{method === 'card' && (
						<Box component='img' src='/mastercard.svg' sx={{ width: '55px' }} />
					)}
					<Typography
						sx={{ ...commonTextStyles, fontSize: '22px', fontWeight: 700 }}
					>
						{method === 'walletBTCAddress' ? 'Crypto' : ''}
					</Typography>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
					{method !== 'card' &&
						inputs[method]?.map(input =>
							input.key === 'walletBTCAddress' ? (
								<Box key={input.key}>
									<Typography
										sx={{
											...commonTextStyles,
											fontSize: '14px',
											color: '#6A6A6A',
										}}
									>
										{t('BTC adress')}
									</Typography>
									<Box
										sx={{
											width: '100%',
											mt: '10px',
											mb: '30px',
											p: '5px 10px',
											borderRadius: '8px',
											backgroundColor: '#FFFFFF',
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											gap: '10px',
											boxSizing: 'border-box',
										}}
									>
										<TextField
											variant='standard'
											value={walletBTCAddress}
											placeholder={t('type address')}
											onChange={e => setWalletBTCAddress(e.target.value)}
											sx={{ width: '100%' }}
											InputProps={{
												disableUnderline: true,
												sx: {
													fontSize: '13px',
													fontFamily: 'Manrope',
													padding: 0,
													backgroundColor: 'transparent',
												},
											}}
										/>
										<Button
											onClick={() => {
												if (walletBTCAddress) {
													navigator.clipboard.writeText(walletBTCAddress)
												}
											}}
											sx={{
												width: '54px',
												height: '24px',
												borderRadius: '6px',
												backgroundColor: '#0549FF',
												color: '#FFFFFF',
												...commonTextStyles,
												fontSize: '14px',
												textTransform: 'none',
											}}
										>
											Copy
										</Button>
									</Box>
								</Box>
							) : (
								<TextField
									key={input.key}
									variant='standard'
									fullWidth
									placeholder={input.name}
									value={input.value}
									onChange={e => input.onchange(e.target.value)}
									sx={textFieldStyles}
									type={input.key === 'zelleTransferEmail' ? 'email' : 'text'}
								/>
							),
						)}
					<TextField
						variant='standard'
						fullWidth
						placeholder={t('amount')}
						value={amount}
						error={!!amountError}
						helperText={(amountError && t('amountError')) || ' '}
						onChange={e => {
							const val = e.target.value
							let cleaned = val.replace(/[^0-9.]/g, '')
							const parts = cleaned.split('.')
							if (parts.length > 2) {
								cleaned = parts[0] + '.' + parts.slice(1).join('')
							}
							setAmount(cleaned)
							if (Number(cleaned) > Number(profile.balance)) {
								setAmountError(t('amount exceeds balance'))
							} else {
								setAmountError('')
							}
						}}
						sx={textFieldStyles}
					/>
				</Box>

				<Button
					variant='contained'
					disabled={isButtonDisabled()}
					sx={{
						mt: '35px',
						px: '50px',
						width: '100%',
						height: '56px',
						border: '1px solid #414141',
						borderRadius: '6px',
						boxShadow: 'none',
						background: 'linear-gradient(90deg, #58A9FF, #0044FF)',
					}}
					onClick={handleCreateTransaction}
				>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Typography
							sx={{
								...commonTextStyles,
								fontSize: '20px',
								fontWeight: 700,
								textTransform: 'none',
							}}
						>
							{t('withdraw')}
						</Typography>
						<Box component='img' src='/withdraw.svg' />
					</Box>
				</Button>
				<Box
					sx={{
						mt: '25px',
						display: 'flex',
						gap: '10px',
						alignItems: 'center',
					}}
				>
					<InfoOutlinedIcon />
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '14px',
							color: '#414141',
							opacity: 0.5,
						}}
					>
						{t('if you need help')}
					</Typography>
				</Box>
			</Box>

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
							fontWeight: 600,
							color: '#FFFFFF',
							textAlign: 'center',
						}}
					>
						{dialogText2}
					</Typography>
					{isSuccess === false && (
						<Typography
							sx={{
								fontFamily: 'Manrope',
								fontSize: '18px',
								color: '#FFFFFF',
								textAlign: 'center',
							}}
						>
							{dialogText3}
						</Typography>
					)}
				</DialogContent>
				<DialogActions
					sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
				>
					{isSuccess === false && (
						<Button
							onClick={() => {
								setDialogOpen(false)
								window.dispatchEvent(new Event('openSupportModal'))
							}}
							sx={{
								width: '100%',
								height: '56px',
								border: '1px solid #232323',
								borderRadius: '6px',
								backgroundColor: '#FFFFFF',
							}}
						>
							<Typography
								sx={{
									background:
										'linear-gradient(180deg, #58A9FF 0%, #0044FF 50%)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									fontFamily: 'Manrope',
									fontSize: '20px',
									fontWeight: 700,
									textTransform: 'none',
								}}
							>
								{t('write to support service')}
							</Typography>
						</Button>
					)}
					<Button
						onClick={() => {
							setDialogOpen(false)
							navigate(routes.HomePage.path)
						}}
						sx={{
							width: '100%',
							m: '0px !important',
							height: '56px',
							border: '1px solid #232323',
							borderRadius: '6px',
							backgroundColor: '#FFFFFF',
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

export default SecondStep
