import 'virtual:uno.css'
import { Header } from '@packages/design-system/header'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

const queryClient = new QueryClient()

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'TanStack Start Starter',
			},
		],
	}),

	shellComponent: RootDocument,
	notFoundComponent: () => (
		<div className="flex flex-col h-[50vh] items-center justify-center">
			<h1 className="text-2xl font-bold">404 - Page Not Found</h1>
			<p>Désolé, cette page n'existe pas.</p>
		</div>
	),
})
  
function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<html lang="en">
				<head>
					<HeadContent />
				</head>
				<body className="flex flex-col min-h-screen w-full">
					<Header />
					<main>{children}</main>
					<TanStackDevtools
						config={{
							position: 'bottom-right',
						}}
						plugins={[
							{
								name: 'Tanstack Router',
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
					<Scripts />
				</body>
			</html>
		</QueryClientProvider>
	)
}
