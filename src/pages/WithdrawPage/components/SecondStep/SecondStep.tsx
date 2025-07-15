import { Box, TextField, Typography, Button, Checkbox } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction, useState } from 'react'

const commonTextStyles = {
	fontFamily: 'Manrope',
	lineHeight: 1,
}

const textFieldStyles = {
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
	'& .Mui-error': {
		'& .MuiInput-root': {
			'&:before': {
				borderBottomColor: '#DE0000',
			},
			'&:after': {
				borderBottomColor: '#DE0000',
			},
			'&:hover:not(.Mui-disabled):before': {
				borderBottomColor: '#DE0000',
			},
		},
	},
}

type Method = 'paypalAddress' | 'wireTransfer' | 'walletBTCAddress'

interface Props {
	method: Method
}

const SecondStep = ({ method }: Props) => {
	const { t } = useTranslation()

	const [paypalAddress, setPaypalAddress] = useState('')
	const [walletBTCAddress, setWalletBTCAddress] = useState('')
	const [wireTransferFirstName, setWireTransferFirstName] = useState('')
	const [wireTransferLastName, setWireTransferLastName] = useState('')
	const [wireTransferAccountNumber, setWireTransferAccountNumber] = useState('')
	const [wireTransferRoutingNumber, setWireTransferRoutingNumber] = useState('')
	const [wireTransferBankName, setWireTransferBankName] = useState('')
	const [wireTransferAddress, setWireTransferAddress] = useState('')
	const [zelleTransferName, setZelleTransferName] = useState('')
	const [zelleTransferEmail, setZelleTransferEmail] = useState('')
	const [zelleTransferPhone, setZelleTransferPhone] = useState('')
	const [amount, setAmount] = useState('')
	const [isTermsAccepted, setІsTermsAccepted] = useState(false)

	return (
		<Box>
			<Typography sx={{ ml: '2px', ...commonTextStyles, fontSize: '14px' }}>
				<span style={{ opacity: 0.5 }}>
					{t('home')} | {t('withdraw')}
				</span>{' '}
				|{' '}
				{method === 'paypalAddress'
					? 'PayPal'
					: method === 'walletBTCAddress'
					? 'Crypto'
					: 'Wire transfer'}
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
				{t('please provide data')}{' '}
				<span>
					{method === 'paypalAddress'
						? 'PayPal'
						: method === 'walletBTCAddress'
						? 'Crypto'
						: 'Wire transfer'}
				</span>
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
						mt: '15px',
						mb: '25px',
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
								: '/bigwire-transfer.svg'
						}
					/>
					<Typography
						sx={{ ...commonTextStyles, fontSize: '22px', fontWeight: 700 }}
					>
						{method === 'walletBTCAddress'
							? 'Crypto'
							: method === 'wireTransfer'
							? 'Wire transfer'
							: ''}
					</Typography>
				</Box>
				{method === 'paypalAddress' ? (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('link')}
							value={paypalAddress}
							onChange={e => setPaypalAddress(e.target.value)}
							sx={textFieldStyles}
						/>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('amount')}
							value={amount}
							onChange={e => {
								const val = e.target.value
								let cleaned = val.replace(/[^0-9.]/g, '')
								const parts = cleaned.split('.')
								if (parts.length > 2) {
									cleaned = parts[0] + '.' + parts.slice(1).join('')
								}
								setAmount(cleaned)
							}}
							sx={textFieldStyles}
						/>
					</Box>
				) : method === 'walletBTCAddress' ? (
					<Box>
						<Typography
							sx={{ ...commonTextStyles, fontSize: '14px', color: '#6A6A6A' }}
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
								boxSizing: 'border-box',
							}}
						>
							<TextField
								variant='standard'
								value={walletBTCAddress}
								onChange={e => setWalletBTCAddress(e.target.value)}
								InputProps={{
									disableUnderline: true,
									sx: {
										width: '165px',
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
										navigator.clipboard
											.writeText(walletBTCAddress)
											.catch(err => {
												console.error('Failed to copy: ', err)
											})
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
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('amount')}
							value={amount}
							onChange={e => {
								const val = e.target.value
								let cleaned = val.replace(/[^0-9.]/g, '')
								const parts = cleaned.split('.')
								if (parts.length > 2) {
									cleaned = parts[0] + '.' + parts.slice(1).join('')
								}
								setAmount(cleaned)
							}}
							sx={textFieldStyles}
						/>
					</Box>
				) : (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('count number')}
							value={wireTransferAccountNumber}
							onChange={e =>
								setWireTransferAccountNumber(e.target.value.replace(/\D/g, ''))
							}
							sx={textFieldStyles}
						/>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('route number')}
							value={wireTransferRoutingNumber}
							onChange={e =>
								setWireTransferRoutingNumber(e.target.value.replace(/\D/g, ''))
							}
							sx={textFieldStyles}
						/>

						<TextField
							variant='standard'
							fullWidth
							placeholder={t('bank')}
							value={wireTransferBankName}
							onChange={e => setWireTransferBankName(e.target.value)}
							sx={textFieldStyles}
						/>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('address')}
							value={wireTransferAddress}
							onChange={e => setWireTransferAddress(e.target.value)}
							sx={textFieldStyles}
						/>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('first name')}
							value={wireTransferFirstName}
							onChange={e => setWireTransferFirstName(e.target.value)}
							sx={textFieldStyles}
						/>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('surname')}
							value={wireTransferLastName}
							onChange={e => setWireTransferLastName(e.target.value)}
							sx={textFieldStyles}
						/>
						<TextField
							variant='standard'
							fullWidth
							placeholder={t('amount')}
							value={amount}
							onChange={e => {
								const val = e.target.value
								let cleaned = val.replace(/[^0-9.]/g, '')
								const parts = cleaned.split('.')
								if (parts.length > 2) {
									cleaned = parts[0] + '.' + parts.slice(1).join('')
								}
								setAmount(cleaned)
							}}
							sx={textFieldStyles}
						/>
						<Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
							<Checkbox
								checked={isTermsAccepted}
								onChange={() => setІsTermsAccepted(!isTermsAccepted)}
								// disabled={loading}
								sx={{ mt: '-9px', ml: '-11px' }}
							/>
							<Typography
								sx={{
									mb: '5px',
									fontSize: '12px',
									fontFamily: 'Manrope',
									color: '#0C0C0C90',
								}}
							>
								{t('aknowledge')}{' '}
								<span
									style={{
										borderBottom: '1px solid #0C0C0C90',
									}}
								>
									{t('agreement')}
								</span>{' '}
								{t('and')}{' '}
								<span
									style={{
										borderBottom: '1px solid #0C0C0C90',
									}}
								>
									{t('statement')}
								</span>
							</Typography>
						</Box>
					</Box>
				)}
				<Button
					variant='contained'
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
					// onClick={() => setCheckForm(true)}
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
		</Box>
	)
}

export default SecondStep
