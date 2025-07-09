import { Box, Typography, SxProps, Theme } from '@mui/material'
import LabelIcon from '@mui/icons-material/Label'
import { useTranslation } from 'react-i18next'

interface VerificationProps {
	verified: boolean
	sx?: SxProps<Theme>
}

const VerificationBlock = ({ verified = false, sx }: VerificationProps) => {
	const { t } = useTranslation()
	return (
		<Box
			sx={{
				width: '192px',
				height: '38px',
				px: '10px',
				border: '1px solid',
				borderRadius: '10px',
				borderColor: verified ? '#52BC37' : '#D72828',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: '8px',
				...sx,
			}}
		>
			<Typography
				sx={{
					fontFamily: 'Manrope',
					fontSize: '16px',
					lineHeight: 1.3,
					color: verified ? '#52BC37' : '#D72828',
				}}
			>
				{verified ? t('verified') : t('no-verified')}
			</Typography>
			<LabelIcon
				sx={{
					color: verified ? '#52BC37' : '#D72828',
					transform: 'rotate(90deg)',
				}}
			/>
		</Box>
	)
}

export default VerificationBlock
