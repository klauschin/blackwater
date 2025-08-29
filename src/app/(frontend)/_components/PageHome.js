import PageModules from '@/components/PageModules';

export default function PageHome({ data }) {
	const { pageModules } = data || {};

	return (
		<div className="p-home flex h-screen flex-col justify-center">
			{pageModules?.map((module, i) => (
				<PageModules key={`page-module-${i}`} module={module} />
			))}
		</div>
	);
}
