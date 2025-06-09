import { ReactNode } from 'react'
import { Header, Sidebar, Footer } from '@/layouts'

interface MainLayoutProps {
	children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<>
			<Header />
			<Sidebar />
			<main>{children}</main>
			<Footer />
		</>
	)
}

export default MainLayout
