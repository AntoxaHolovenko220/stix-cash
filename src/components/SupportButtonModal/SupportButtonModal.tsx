import {
	IconButton,
	Box,
	Dialog,
	DialogContent,
	Typography,
	DialogActions,
	DialogTitle,
	Link,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TelegramIcon from '@mui/icons-material/Telegram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

const SupportButtonModal = () => {
	const { t } = useTranslation()
	const [openCustomerSupportModal, setOpenCustomerSupportModal] =
		useState(false)

	useEffect(() => {
		const handleOpen = () => setOpenCustomerSupportModal(true)

		window.addEventListener('openSupportModal', handleOpen)

		return () => {
			window.removeEventListener('openSupportModal', handleOpen)
		}
	}, [])

	return (
		<>
			<IconButton
				sx={{ position: 'fixed', bottom: '10px', right: '10px' }}
				onClick={() => setOpenCustomerSupportModal(true)}
			>
				<Box component='img' src='/support.svg' />
			</IconButton>

			<Dialog
				open={openCustomerSupportModal}
				onClose={() => setOpenCustomerSupportModal(false)}
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
				<DialogTitle sx={{ p: 0 }}>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '20px',
							fontWeight: 700,
							textAlign: 'center',
						}}
					>
						{t('customer support')}
					</Typography>
				</DialogTitle>
				<DialogContent
					sx={{
						p: '8px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography
						sx={{
							mt: '15px',
							fontFamily: 'Manrope',
							fontSize: '18px',
							fontWeight: 400,
							textAlign: 'left',
						}}
					>
						{t('please select')}
					</Typography>
				</DialogContent>
				<DialogActions
					sx={{ display: 'flex', justifyContent: 'center', gap: '50px' }}
				>
					<Link
						href='https://t.me/stix_cash_support'
						target='_blank'
						rel='noopener noreferrer'
						style={{ textDecoration: 'none' }}
					>
						<IconButton>
							<TelegramIcon
								sx={{ width: '50px', height: '50px', color: '#FFFFFF' }}
							/>
						</IconButton>
					</Link>
					<Link
						href='https://wa.me/380'
						target='_blank'
						rel='noopener noreferrer'
						style={{ textDecoration: 'none' }}
					>
						<IconButton>
							<WhatsAppIcon
								sx={{ width: '50px', height: '50px', color: '#1ed760' }}
							/>
						</IconButton>
					</Link>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default SupportButtonModal
