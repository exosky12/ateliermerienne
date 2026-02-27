import 'virtual:uno.css'

import { Header } from '@packages/design-system/header'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { HeadContent, Outlet, Scripts, createRootRoute, useLocation } from '@tanstack/react-router'

import { useUserSuspense } from '@/lib/use_user.ts'

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

	component: Root,
	notFoundComponent: () => (
		<div className="flex flex-col h-[50vh] items-center justify-center">
			<h1 className="text-2xl font-bold">404 - Page Not Found</h1>
			<p>Désolé, cette page n'existe pas.</p>
		</div>
	),
})

function Root() {
	return (
		<QueryClientProvider client={queryClient}>
			<RootContent />
		</QueryClientProvider>
	)
}

function RootContent() {
	const location = useLocation()
	const { data } = useUserSuspense()

	if (!data.user) {
		console.log('User is not connected')
	} else {
		console.log('User is connected')
	}

	console.log(data.user)

	return (
		<html lang="fr">
			<head>
				<HeadContent />
				<title>Test</title>
			</head>
			<body className="flex flex-col min-h-screen w-screen">
				<Header isConnected={data.user !== null} pathname={location.pathname} />
				<main className="mx-auto mt-22 flex flex-col w-full items-center">
					<Outlet />
				</main>
				<TanStackDevtools
					eventBusConfig={{
						port: 8098,
					}}
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
	)
}
