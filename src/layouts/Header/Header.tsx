import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '@/components'
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import routes from '@/router/routes.json'

interface HeaderProps {
	onLogoClick: () => void
}

const Header = ({ onLogoClick }: HeaderProps) => {
	const navigate = useNavigate()
	const isWideScreen = useMediaQuery('(min-width:1280px)')

	return (
		<Box
			sx={{
				width: '100%',
				py: '20px',
				display: 'flex',
				justifyContent: !isWideScreen ? 'space-between' : 'flex-end',
				backgroundColor: '#0246FF',
				position: 'relative', // Добавляем позиционирование
			}}
		>
			{!isWideScreen && (
				<Box
					onClick={onLogoClick}
					sx={{
						width: 'fit-content',
						ml: '50px',
						p: '10px',
						bgcolor: '#EFEFEF',
						borderRadius: '30px',
						cursor: 'pointer',
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
			)}
			<Box
				sx={{ mr: '50px', display: 'flex', alignItems: 'center', gap: '20px' }}
			>
				<LanguageSwitcher color='#FFFFFF' />
				<IconButton onClick={() => navigate(`${routes.HomePage.path}`)}>
					<Box component='img' src='/person-white.svg' />
				</IconButton>
			</Box>
		</Box>
	)
}

export default Header
