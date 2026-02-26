import { Image } from '@unpic/react'
import { createFileRoute } from '@tanstack/react-router'
import { LandingCard } from '@packages/design-system/landing_card'

import { useUserSuspense } from '@/lib/use_user.ts'
import cardImage1 from '../../public/landing_card1.png'
import cardImage2 from '../../public/landing_card2.png'

export const Route = createFileRoute('/')({ component: App })

function App() {
	const { data: user } = useUserSuspense()

	if (!user) {
		console.log('User is not connected')
	} else {
		console.log('User is connected')
	}

	console.log({ user })
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
