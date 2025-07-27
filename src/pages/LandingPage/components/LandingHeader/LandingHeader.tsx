import { LanguageSwitcher } from '@/components'
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import { ModalProps } from '../../LandingPage'

const LandingHeader = ({ setModalOpen }: ModalProps) => {
	const isMobile = useMediaQuery('(max-width:480px)')

	return (
		<Box
			sx={{
				width: '100%',
				height: '80px',
				px: isMobile ? '20px' : '50px',
				position: 'fixed',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: '#FFFFFF',
				boxSizing: 'border-box',
				zIndex: 100,
			}}
		>
			<Box
				sx={{
					width: '126px',
					height: '39px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					bgcolor: '#EFEFEF',
					borderRadius: '30px',
					boxSizing: 'border-box',
				}}
			>
				<Typography
					sx={{
						fontFamily: 'Benzin',
						fontSize: '16px',
						lineHeight: 1.2,
						fontWeight: 700,
						background: 'linear-gradient(90deg, #0044FF, #002999)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						display: 'inline-block',
					}}
				>
					Styx Cash
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
				<LanguageSwitcher />
				<IconButton onClick={() => setModalOpen(true)}>
					<Box component='img' src='person.svg' />
				</IconButton>
			</Box>
		</Box>
	)
}

export default LandingHeader
