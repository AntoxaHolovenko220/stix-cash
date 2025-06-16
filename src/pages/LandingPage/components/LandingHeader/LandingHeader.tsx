import { LanguageSwitcher } from '@/components'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const LandingHeader = () => {
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
						lineHeight: '20px',
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
				<Link to='/login'>
					<Box component='img' src='person.svg' />
				</Link>
			</Box>
		</Box>
	)
}

export default LandingHeader
