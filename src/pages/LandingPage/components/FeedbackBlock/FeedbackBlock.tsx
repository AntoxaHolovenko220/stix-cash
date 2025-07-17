import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Circle from '../Circle'

// Кастомные стрелки
const NextArrow = (props: any) => {
	const { className, onClick } = props
	return (
		<div
			className={className}
			onClick={onClick}
			style={{
				right: '-30px',
				zIndex: 1,
				width: '30px',
				height: '30px',
				backgroundColor: '#2E2E2E',
				borderRadius: '50%',
			}}
		>
			<svg
				width='32'
				height='30'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M9 18L15 12L9 6'
					stroke='#FFFFFF'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		</div>
	)
}

const PrevArrow = (props: any) => {
	const { className, onClick } = props
	return (
		<div
			className={className}
			onClick={onClick}
			style={{
				left: '-30px',
				zIndex: 1,
				width: '30px',
				height: '30px',
				backgroundColor: '#2E2E2E',
				borderRadius: '50%',
			}}
		>
			<svg
				width='28'
				height='30'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M15 18L9 12L15 6'
					stroke='#FFFFFF'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		</div>
	)
}

const FeedbackBlock = () => {
	const { t } = useTranslation()
	const [currentSlide, setCurrentSlide] = React.useState(0)
	const [maxHeight, setMaxHeight] = React.useState(0)
	const slideRefs = React.useRef<(HTMLDivElement | null)[]>([])
	const setSlideRef = React.useCallback(
		(index: number) => (el: HTMLDivElement | null) => {
			if (el) slideRefs.current[index] = el
		},
		[]
	)

	const isMobile = useMediaQuery('(max-width:480px)')

	const slides = [
		{
			name: t('Jessica'),
			feedback: t('credit line'),
		},
		{
			name: t('Jessica'),
			feedback: t('credit line2'),
		},
		{
			name: t('Jessica'),
			feedback: t('credit line3'),
		},
	]

	React.useEffect(() => {
		const updateMaxHeight = () => {
			const heights = slideRefs.current
				.filter(ref => ref !== null)
				.map(ref => ref?.clientHeight || 0)

			const newMaxHeight = Math.max(...heights)
			if (newMaxHeight > 0) {
				setMaxHeight(newMaxHeight)
			}
		}

		updateMaxHeight()
		window.addEventListener('resize', updateMaxHeight)

		return () => {
			window.removeEventListener('resize', updateMaxHeight)
		}
	}, [])

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		cssEase: 'linear',
		pauseOnHover: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		beforeChange: (current: number, next: number) => setCurrentSlide(next),

		responsive: [
			{
				breakpoint: 1281,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					nextArrow: <NextArrow />,
					prevArrow: <PrevArrow />,
				},
			},
			{
				breakpoint: 1025,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: false,
				},
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
				},
			},
			{
				breakpoint: 481,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	}

	return (
		<Box
			sx={{
				pt: '70px',
				px: isMobile ? '0px' : '50px',
				pb: isMobile ? '40px' : '105px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				position: 'relative',
				overflow: 'hidden',
				background:
					'radial-gradient(circle, #f0f0f0 0%, #f0f0f0 10%, #ffffff 50%)',
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
				<Typography
					sx={{
						fontFamily: 'Manrope',
						fontSize: isMobile ? '37px' : '42px',
						fontWeight: 700,
						lineHeight: 1,
						background: 'linear-gradient(90deg, #0044FF, #74AFFF)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
					}}
				>
					{t('feedback')}{' '}
					<span
						style={{
							fontFamily: 'Manrope',
							fontSize: isMobile ? '37px' : '42px',
							fontWeight: 700,
							lineHeight: 1,
							background: 'linear-gradient(90deg, #464646, #ACACAC)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						{t('customer')}
					</span>
				</Typography>
			</Box>
			<Box
				sx={{
					width: '100%',
					py: isMobile ? '20px' : '70px',
					'& .slick-slider': {
						display: 'flex',
						alignItems: 'center',
					},
					'& .slick-list': {
						overflow: 'hidden',
						margin: '0 auto',
						width: '100%',
					},
					'& .slick-track': {
						display: 'flex',
						alignItems: 'stretch',
						justifyContent: 'center',
					},
					'& .slick-slide': {
						padding: { xxs: '0 8px', sm: '0 12px' },
						height: 'auto',
						'& > div': {
							height: '100%',
						},
					},
					'& .slick-dots': {
						bottom: '-28px !important',
						'& li': {
							margin: '0 !important',
							'& button::before': {
								display: 'none',
							},
						},
					},
					'& .slick-arrow': {
						width: '20px',
						height: '20px',
						'&:before': {
							display: 'none',
						},
						'&:hover, &:focus': {
							opacity: 0.8,
						},
					},
					'& .slick-prev': {
						left: { xxs: '-25px', sm: '-30px', md: '-40px' },
					},
					'& .slick-next': {
						right: { xxs: '-25px', sm: '-30px', md: '-40px' },
					},
				}}
			>
				<Slider {...settings}>
					{slides.map((slide, index) => (
						<Box
							key={index}
							sx={{
								display: 'flex !important',
								justifyContent: 'center',
								height: '100%',
							}}
						>
							<Box
								component='div'
								ref={setSlideRef(index)}
								sx={{
									width: '378px',
									height: '232px',
									display: 'flex',
									flexDirection: 'column',
									borderRadius: '15px',
									bgcolor: '#FFFFFF',
									color: '#000000',
									overflow: 'hidden',
								}}
							>
								<Box
									sx={{
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Box
										sx={{
											m: '20px 30px 0px 30px',
											display: 'flex',
											alignItems: 'center',
											gap: '15px',
										}}
									>
										<Circle size={55} color='#3AA2FF' />
										<Box>
											<Typography
												sx={{
													fontFamily: 'Manrope',
													fontSize: '15px',
													fontWeight: 700,
													lineHeight: 1,
												}}
											>
												{slide.name}
											</Typography>
											<Typography
												sx={{
													mt: '2px',
													fontFamily: 'Manrope',
													fontSize: '10px',
													fontWeight: 400,
													lineHeight: 1,
												}}
											>
												Freelancer
											</Typography>
										</Box>
									</Box>
									<Typography
										sx={{
											m: '10px 30px 20px 30px',
											fontFamily: 'Manrope',
											fontSize: '13px',
											fontStyle: 'italic',
											flexGrow: 1,
											overflow: 'hidden',
										}}
									>
										{slide.feedback}
									</Typography>
								</Box>
							</Box>
						</Box>
					))}
				</Slider>
			</Box>
		</Box>
	)
}

export default FeedbackBlock
