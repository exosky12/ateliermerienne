import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
	return (
		<h2 font="mono bold" text="2xl">
			Fait main, par une seule paire de mains, en France.{' '}
		</h2>
	)
}
