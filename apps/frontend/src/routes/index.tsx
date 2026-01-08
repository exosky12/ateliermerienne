import { LandingCard } from '@packages/design-system/landing_card'
import { createFileRoute } from '@tanstack/react-router'
import { Image } from '@unpic/react'
import cardImage1 from '../../public/landing_card1.png'
import cardImage2 from '../../public/landing_card2.png'

export const Route = createFileRoute('/')({ component: App })

function App() {
	console.log(cardImage1)
	return (
		<>
			<Image
				width={1920}
				height={1080}
				className="h-full w-full"
				alt=""
				src="landing_page_image.png"
			/>
			<div className="flex w-full">
				<LandingCard text="Nouveautés" link="#" position="bottomleft" imagePath={cardImage1} />
				<LandingCard text="Sur-Mesure" position="bottomright" imagePath={cardImage2} />
			</div>
		</>
	)
}
