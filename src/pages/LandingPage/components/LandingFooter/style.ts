import { SxProps } from '@mui/material'

export const footerStyles: SxProps = {
	py: '50px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	background: 'linear-gradient(120deg, #3B3B3B, #161A1A)',
}

export const contactsBoxStyles: SxProps = {
	width: '335px',
	height: '74px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '8px',
	borderRadius: '12px',
	background: 'linear-gradient(120deg, #1D1D1D, #000000)',
}

export const contactTextStyles: SxProps = {
	fontFamily: 'Manrope',
	fontSize: '20px',
	fontWeight: 300,
}

export const buttonStyles: SxProps = {
	width: '335px',
	height: '74px',
	mt: '20px',
	borderRadius: '12px',
	fontFamily: 'Manrope',
	fontSize: '20px',
	fontWeight: 300,
	color: '#3AA2FF',
	textTransform: 'none',
	background: 'linear-gradient(120deg, #1D1D1D, #000000)',
}
