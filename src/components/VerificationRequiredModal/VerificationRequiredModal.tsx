import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Typography,
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useTranslation } from 'react-i18next'

interface VerificationRequiredModalProps {
	open: boolean
	onClose: () => void
	onVerify: () => void
}

const VerificationRequiredModal = ({
	open,
	onClose,
	onVerify,
}: VerificationRequiredModalProps) => {
	const { t } = useTranslation()

	return (
		<Dialog
			open={open}
			onClose={onClose}
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
				<CloseRoundedIcon
					sx={{
						width: '45px',
						height: '45px',
						borderRadius: '10px',
						background: 'linear-gradient(-45deg, #EF3030 0%, #980202 80%)',
					}}
				/>
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
					{t('verification_required_title')}
				</Typography>
				<Typography
					sx={{
						mt: '10px',
						fontFamily: 'Manrope',
						fontSize: '16px',
						fontWeight: 400,
						color: '#FFFFFF',
						textAlign: 'center',
					}}
				>
					{t('verification_required_message')}
				</Typography>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
				<Button
					onClick={onVerify}
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
							background: 'linear-gradient(180deg, #58A9FF 0%, #0044FF 50%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							fontFamily: 'Manrope',
							fontSize: '20px',
							fontWeight: 700,
							textTransform: 'none',
						}}
					>
						{t('verify')}
					</Typography>
				</Button>
				<Button
					onClick={onClose}
					sx={{
						width: '100%',
						m: '0px !important',
						height: '56px',
						border: '1px solid #232323',
						borderRadius: '6px',
						backgroundColor: '#DE0000',
					}}
				>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '16px',
							fontWeight: 600,
							textTransform: 'none',
							color: '#FFFFFF',
						}}
					>
						{t('close')}
					</Typography>
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default VerificationRequiredModal
