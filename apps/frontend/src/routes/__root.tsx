import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { HeadContent, Outlet, Scripts, createRootRoute, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { tuyau } from '@/config/tuyau'
import { Header } from '@packages/design-system/header'
import 'virtual:uno.css'

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
	const { data } = useQuery({
		queryKey: ['isConnected'],
		queryFn: () => tuyau.isConnected.$get(),
	})

	const isConnected = data?.data?.isConnected

	return (
		<html lang="fr">
			<head>
				<HeadContent />
			</head>
			<body className="flex flex-col min-h-screen w-full">
				<Header isConnected={isConnected ?? false} pathname={location.pathname} />
				<main className="mt-22 mx-auto px-5">
					<Outlet />
				</main>
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
	)
}
