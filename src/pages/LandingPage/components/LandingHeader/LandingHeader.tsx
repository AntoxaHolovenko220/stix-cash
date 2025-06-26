import { useState } from 'react'
import { LanguageSwitcher } from '@/components'
import { Box, IconButton, Typography } from '@mui/material'
import { RegisterModal } from '@/pages'

const LandingHeader = () => {
	const [modalOpen, setModalOpen] = useState(false)
	return (
		<Box
			sx={{
				width: '100%',
				py: '20px',
				position: 'fixed',
				display: 'flex',
				justifyContent: 'space-between',
				backgroundColor: '#FFFFFF',
				zIndex: 100,
			}}
		>
			<Box
				sx={{
					width: 'fit-content',
					ml: '50px',
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
			<Box
				sx={{ mr: '50px', display: 'flex', alignItems: 'center', gap: '20px' }}
			>
				<LanguageSwitcher />
				<IconButton onClick={() => setModalOpen(true)}>
					<Box component='img' src='person.svg' />
				</IconButton>
			</Box>
			<RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
		</Box>
	)
}

export default LandingHeader
