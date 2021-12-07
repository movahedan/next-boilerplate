import { NextSeo } from 'next-seo';

import { portfolioContent } from 'entry/contents';
import { websiteBaseUrl } from 'entry/seo';

import { Button, CardGradient } from 'ui/atoms';
import { CustomLayout } from 'ui/templates';
import type { CustomLayoutProps } from 'ui/templates';

import type { NextPageWithLayout } from 'next';

const IndexPage: NextPageWithLayout<
	Record<string, never>,
	CustomLayoutProps
> = () => (
	<>
		<NextSeo canonical={`${websiteBaseUrl}/`} />

		<header className='flex flex-col justify-center h-screen m-auto w-960px'>
			<h1 className='mt-2 prose-hero-xl'>{name}</h1>
			<p className='my-80px text-gray prose-xl'>
				{portfolioContent.jumbotron.description}
			</p>
			<div className='mx-auto'>
				<Button size='large' className='mr-10'>
					{portfolioContent.jumbotron.actionButtons.knowMe}
				</Button>
				<Button size='large' variant='outline'>
					{portfolioContent.jumbotron.actionButtons.downloadCv}
				</Button>
			</div>
		</header>

		<section className='flex flex-col items-center my-80px'>
			<h2 className='inline-block text-center prose-wow-xl prose-hyper-type'>
				{portfolioContent.findMe.title}
			</h2>
			<ol className='flex flex-wrap justify-center text-center list-none mt-40px'>
				{portfolioContent.findMe.list.map((item) => (
					<li key={item.type} className='w-480px mt-40px'>
						<div className='flex items-center justify-center mx-auto mb-6 w-72px h-72px bg-white-opacity-10 rounded-6px'>
							<svg className='w-12 h-12 text-white'>
								<path d={item.icon} fill='currentColor' />
							</svg>
						</div>
						<span className='prose-xl text-gray'>{item.label}</span>
					</li>
				))}
			</ol>
		</section>

		{/* {!!portfolioContent.stack.list.length && (
			<section className='flex flex-col items-center my-80px'>
				<h2 className='inline-block text-center prose-wow-xl prose-hyper-type'>
					{portfolioContent.stack.title}
				</h2>
				<ul>
					{portfolioContent.stack.list.map((item, index) => (
						<li key={index}>{index}</li>
					))}
				</ul>
			</section>
		)} */}

		{!!portfolioContent.worked.list.length && (
			<section className='px-10 my-80px'>
				<h2 className='text-center prose-wow-xl prose-hyper-type'>
					{portfolioContent.worked.title}
				</h2>
				<ul className='flex flex-wrap items-stretch justify-center gap-6 mt-80px'>
					{portfolioContent.worked.list.map((job, index) => {
						const variant = index % 2 === 0 ? 'yellow' : 'blue';
						const companyNameClassName = [
							'prose-heading-2xl mb-6',
							variant === 'blue' ? 'text-blue' : 'text-yellow',
						].join(' ');

						return (
							<CardGradient
								as='li'
								innerAs='section'
								key={index}
								variant={variant}
								className={variant == 'yellow' ? 'max-w-xl' : 'max-w-4xl'}
								innerClassName='p-10'
							>
								<h3 className='prose-2xl'>{job.title}</h3>
								<span className='inline-block mb-6 prose-2xl'>
									({job.type})
								</span>
								<h4 className={companyNameClassName}>{job.company}</h4>
								<span className='block mb-2 prose-lg'>{job.duration}</span>
								<span className='block mb-6 prose-lg'>{job.location}</span>
								<p className='prose-lg'>{job.description}</p>
							</CardGradient>
						);
					})}
				</ul>
			</section>
		)}

		{/* {!!portfolioContent.tips.list.length && (
			<section className='flex flex-col items-center my-80px'>
				<h2 className='inline-block text-center prose-wow-xl prose-hyper-type'>
					{portfolioContent.tips.title}
				</h2>
				<ul>
					{portfolioContent.tips.list.map((item, index) => (
						<li key={index}>{index}</li>
					))}
				</ul>
			</section>
		)} */}
	</>
);

IndexPage.Layout = {
	Component: CustomLayout,
	props: {
		className: 'bg-dark',
	},
};

const name = (
	<>
		<span className='text-yellow'>*</span>
		{`${portfolioContent.jumbotron.intro} `}
		<span className='text-blue'>{`<`}</span>
		<span className='name text-yellow'>{portfolioContent.jumbotron.name}</span>
		<span className='text-blue'>{`>`}</span>
		<span className='block'>
			{portfolioContent.jumbotron.infoList[0]}
			{` `}
			<span className='text-blue'>{`&&`}</span>
		</span>
		<span className='block text-mellow'>
			{portfolioContent.jumbotron.infoList[1]}
		</span>
	</>
);

export default IndexPage;
