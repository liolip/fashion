import React, { useEffect } from 'react'

declare global {
	interface Window {
		particlesJS: any
	}
}

const ParticlesBackground = () => {
	useEffect(() => {
		if (window.particlesJS) {
			window.particlesJS('particles-js', {
				particles: {
					number: {
						value: 50,
						density: {
							enable: true,
							value_area: 800,
						},
					},
					// line_linked: {
					// 	enable: false,
					// },
					color: {
						value: '#ffffff',
					},
					shape: {
						type: 'circle',
					},
					opacity: {
						value: 0.5,
					},
					size: {
						value: 3,
					},
					move: {
						enable: true,
						speed: 2,
					},
				},

				interactivity: {
					detect_on: 'canvas',
					events: {
						onhover: {
							enable: true,
							mode: 'repulse',
						},
						onclick: {
							enable: true,
							mode: 'push',
						},
					},
					modes: {
						repulse: {
							distance: 100,
							duration: 0.4,
						},
						push: {
							quantity: 4,
						},
					},
				},
				retina_detect: true,
			})
		}
	}, [])

	return (
		<div
			id='particles-js'
			style={{
				position: 'fixed',
				width: '100%',
				height: '100%',
				zIndex: 0,
				top: 0,
				left: 0,
			}}
		/>
	)
}

export default ParticlesBackground
