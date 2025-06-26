import { ReactNode, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header, Sidebar } from '@/layouts'
import { Box, useMediaQuery } from '@mui/material'

interface MainLayoutProps {
	children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const location = useLocation()
	const isWideScreen = useMediaQuery('(min-width:1280px)')

	useEffect(() => {
		setIsSidebarOpen(isWideScreen)
	}, [isWideScreen])

	const toggleSidebar = () => {
		if (!isWideScreen) {
			setIsSidebarOpen(!isSidebarOpen)
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: isWideScreen ? 'row' : 'column',
				height: '100vh',
				overflow: 'hidden',
			}}
		>
			{isWideScreen && (
				<Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
			)}
			{!isWideScreen && <Header onLogoClick={toggleSidebar} />}
			<Box
				sx={{
					display: 'flex',
					flexDirection: !isWideScreen ? 'row' : 'column',
					flex: 1,
					overflow: 'hidden',
				}}
			>
				{isWideScreen && <Header onLogoClick={toggleSidebar} />}
				{!isWideScreen && (
					<Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
				)}
				<Box
					sx={{
						flex: 1,
						overflowY: 'auto',
						position: 'relative',
						p: '20px',
					}}
					key={location.pathname}
				>
					{children}
				</Box>
			</Box>
		</Box>
	)
}

export default MainLayout
