import { LandingCard } from '@packages/design-system/landing_card'
import { createFileRoute } from '@tanstack/react-router'
import { Image } from '@unpic/react'
import cardImage1 from '../../public/landing_card1.png'
import cardImage2 from '../../public/landing_card2.png'

export const Route = createFileRoute('/')({ component: App })

function App() {
	return (
		<div className="h-full w-full -mt-22">
			<Image
				width={1920}
				height={1080}
				className="h-full w-full"
				alt=""
				src="landing_page_image.png"
			/>
			<div className="mt-2 flex gap-2 w-full">
				<LandingCard text="Nouveautés" link="#" position="bottomleft" imagePath={cardImage1} />
				<LandingCard text="Sur-Mesure" position="bottomright" imagePath={cardImage2} />
			</div>
		</div>
	)
}
