import { LanguageSwitcher } from '@/components'
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import { ModalProps } from '../../LandingPage'

const LandingHeader = ({ setModalOpen }: ModalProps) => {
	const isMobile = useMediaQuery('(max-width:480px)')

	return (
		<Box
			sx={{
				width: '100%',
				py: '20px',
				px: isMobile ? '20px' : '50px',
				position: 'fixed',
				display: 'flex',
				justifyContent: 'space-between',
				backgroundColor: '#FFFFFF',
				boxSizing: 'border-box',
				zIndex: 100,
			}}
		>
			<Box
				sx={{
					width: 'fit-content',
					p: '10px',
					bgcolor: '#EFEFEF',
					borderRadius: '30px',
				}}
			>
				<Typography
					sx={{
						fontFamily: 'Benzin',
						fontSize: '16px',
						fontWeight: 700,
						lineHeight: '31px',
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
