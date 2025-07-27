import { ReactNode, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header, Sidebar } from '@/layouts'
import { Box, useMediaQuery } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
import { SupportButtonModal } from '@/components'

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
						backgroundImage: 'url(/lines.png)',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
					key={location.pathname}
				>
					{/* <Box
						component='img'
						src='/lines.png'
						sx={{
							width: 'calc(100%)',
							ml: '-20px',
							position: 'absolute',
							zIndex: -1,
						}}
					/> */}
					{children}
					<SupportButtonModal />
				</Box>
			</Box>
		</Box>
	)
}

export default MainLayout
