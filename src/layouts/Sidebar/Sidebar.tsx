import { useEffect, useState } from 'react'
import {
	Box,
	IconButton,
	List,
	ListItem,
	Typography,
	useMediaQuery,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { clearTokens, getUserData } from '@/api/authService'
import routes from '@/router/routes.json'

interface SidebarProps {
	isOpen: boolean
	onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()
	const [activePath, setActivePath] = useState(location.pathname)
	const isWideScreen = useMediaQuery('(min-width:1280px)')
	const userData = getUserData()

	useEffect(() => {
		setActivePath(location.pathname)
	}, [location.pathname])

	const navItems = [
		{ label: t('home'), path: routes.HomePage.path },
		{ label: t('transactions'), path: routes.TransactionsPage.path },
		{ label: t('profile'), path: routes.ProfilePage.path },
		// { label: t('customer support'), path: routes.CustomerSupportPage.path },
	]

	const adminNavItems = [
		{ label: t('clients'), path: routes.ClientsPage.path },
		{ label: t('transactions'), path: routes.AdminTransactionsPage.path },
	]

	const handleLogout = () => {
		clearTokens()
		navigate(routes.LandingPage.path)
	}

	return (
		<Box
			sx={{
				height: '100vh',
				width: '295px',
				backgroundColor: '#0C3E9C',
				position: isWideScreen ? 'relative' : 'fixed',
				left: isOpen ? 0 : '-345px',
				top: 0,
				transition: !isWideScreen ? 'left 0.3s ease' : 'none',
				zIndex: 1000,
				pt: '22px',
				pl: '50px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography
					sx={{
						fontFamily: 'Benzin',
						fontSize: '20px',
						fontWeight: 700,
						lineHeight: '40px',
						color: '#FFFFFF',
					}}
				>
					Styx Cash
				</Typography>
				{!isWideScreen && (
					<IconButton
						onClick={onClose}
						sx={{
							mt: '3px',
							mr: '10px',
							color: 'white',
						}}
					>
						<CloseIcon />
					</IconButton>
				)}
			</Box>

			{userData?.roles?.includes('user') ? (
				<List
					sx={{
						mt: '70px',
						display: 'flex',
						flexDirection: 'column',
						gap: '30px',
						color: '#FFFFFF',
						fontFamily: 'Manrope',
						fontSize: '18px',
						lineHeight: 1,
					}}
				>
					{navItems.map(item => {
						const isActive = activePath === item.path

						return (
							<Box
								key={item.path}
								sx={{
									position: 'relative',
									'&:hover': {
										'& .nav-item': {
											borderTopRightRadius: !isActive ? '50px' : '0',
											borderBottomRightRadius: !isActive ? '50px' : '0',
											backgroundColor: !isActive
												? 'rgba(255, 255, 255, 0.1)'
												: '#FFFFFF',
										},
									},
								}}
							>
								<ListItem
									className='nav-item'
									onClick={() => {
										navigate(item.path)
										onClose()
									}}
									sx={{
										cursor: 'pointer',
										backgroundColor: isActive ? '#FFFFFF' : 'transparent',
										color: isActive ? '#0C3E9C' : '#FFFFFF',
										borderTopLeftRadius: '50px',
										borderBottomLeftRadius: '50px',

										px: '20px',
										py: '12px',
										position: 'relative',
										zIndex: 1,
									}}
								>
									{item.label}
								</ListItem>

								{isActive && (
									<>
										<Box
											sx={{
												position: 'absolute',
												right: '42px',
												top: '-62px',
												bottom: '0',
												width: '20px',
												backgroundColor: '#FFFFFF',
												transform: 'rotate(-90deg)',
												zIndex: 0,
											}}
										>
											<Box
												sx={{
													width: '100%',
													height: '100%',
													backgroundColor: '#0C3E9C',
													borderBottomLeftRadius: '50px',
												}}
											/>
										</Box>
										<Box
											sx={{
												position: 'absolute',
												right: '42px',
												top: '0',
												bottom: '-62px',
												width: '20px',
												backgroundColor: '#FFFFFF',
												transform: 'rotate(90deg)',
												zIndex: 0,
											}}
										>
											<Box
												sx={{
													width: '100%',
													height: '100%',
													backgroundColor: '#0C3E9C',
													borderTopLeftRadius: '50px',
												}}
											/>
										</Box>
									</>
								)}
							</Box>
						)
					})}
				</List>
			) : (
				<Box sx={{ mt: '40px' }}>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '18px',
							color: '#FFFFFF',
							opacity: 0.5,
						}}
					>
						{t('admin menu')}
					</Typography>
					<List
						sx={{
							mt: '10px',
							display: 'flex',
							flexDirection: 'column',
							gap: '30px',
							color: '#FFFFFF',
							fontFamily: 'Manrope',
							fontSize: '18px',
							lineHeight: 1,
						}}
					>
						{adminNavItems.map(item => {
							const isActive = activePath === item.path

							return (
								<Box
									key={item.path}
									sx={{
										position: 'relative',
										'&:hover': {
											'& .nav-item': {
												borderTopRightRadius: !isActive ? '50px' : '0',
												borderBottomRightRadius: !isActive ? '50px' : '0',
												backgroundColor: !isActive
													? 'rgba(255, 255, 255, 0.1)'
													: '#FFFFFF',
											},
										},
									}}
								>
									<ListItem
										className='nav-item'
										onClick={() => {
											navigate(item.path)
											onClose()
										}}
										sx={{
											cursor: 'pointer',
											backgroundColor: isActive ? '#FFFFFF' : 'transparent',
											color: isActive ? '#0C3E9C' : '#FFFFFF',
											borderTopLeftRadius: '50px',
											borderBottomLeftRadius: '50px',

											px: '20px',
											py: '12px',
											position: 'relative',
											zIndex: 1,
										}}
									>
										{item.label}
									</ListItem>

									{isActive && (
										<>
											<Box
												sx={{
													position: 'absolute',
													right: '42px',
													top: '-62px',
													bottom: '0',
													width: '20px',
													backgroundColor: '#FFFFFF',
													transform: 'rotate(-90deg)',
													zIndex: 0,
												}}
											>
												<Box
													sx={{
														width: '100%',
														height: '100%',
														backgroundColor: '#0C3E9C',
														borderBottomLeftRadius: '50px',
													}}
												/>
											</Box>
											<Box
												sx={{
													position: 'absolute',
													right: '42px',
													top: '0',
													bottom: '-62px',
													width: '20px',
													backgroundColor: '#FFFFFF',
													transform: 'rotate(90deg)',
													zIndex: 0,
												}}
											>
												<Box
													sx={{
														width: '100%',
														height: '100%',
														backgroundColor: '#0C3E9C',
														borderTopLeftRadius: '50px',
													}}
												/>
											</Box>
										</>
									)}
								</Box>
							)
						})}
					</List>
				</Box>
			)}
			<Box
				sx={{
					mt: '50px',
					width: 'fit-content',
					display: 'flex',
					alignItems: 'center',
					cursor: 'pointer',
					gap: 1,
				}}
				onClick={handleLogout}
			>
				<LogoutRoundedIcon sx={{ color: '#FFFFFF' }} />
				<Typography
					sx={{
						fontFamily: 'Manrope',
						color: '#FFFFFF',
					}}
				>
					{t('logout')}
				</Typography>
			</Box>
		</Box>
	)
}

export default Sidebar
