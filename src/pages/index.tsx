import { NextSeo } from 'next-seo';
import tw from 'twin.macro';

import { portfolioContent } from 'entry/contents';
import { websiteBaseUrl } from 'entry/seo';

import { Button, CardGradient } from 'ui/atoms';
import { CustomLayout } from 'ui/templates';
import type { CustomLayoutProps } from 'ui/templates';

import { headerSectionClassName, jobsSectionClassName } from 'pages.styles';

import type { NextPageWithLayout } from 'next';

const IndexPage: NextPageWithLayout<
	Record<string, never>,
	CustomLayoutProps
> = () => (
	<>
		<NextSeo canonical={`${websiteBaseUrl}/`} />

		<header css={tw`flex flex-col justify-center h-screen m-auto w-960px`}>
			<h1 css={tw`mt-2 prose-hero-xl`} className={headerSectionClassName}>
				<span className='intro'>{`${portfolioContent.jumbotron.intro} `}</span>
				<span className='name'>{portfolioContent.jumbotron.name}</span>
				<span className='info'>{portfolioContent.jumbotron.infoList[0]}</span>
				<span className='outro'>{portfolioContent.jumbotron.infoList[1]}</span>
			</h1>
			<p css={tw`my-80px text-gray prose-xl`}>
				{portfolioContent.jumbotron.description}
			</p>
			<div css={tw`mx-auto`}>
				<Button size='large' css={tw`mr-10`}>
					{portfolioContent.jumbotron.actionButtons.knowMe}
				</Button>
				<Button size='large' variant='outline'>
					{portfolioContent.jumbotron.actionButtons.downloadCv}
				</Button>
			</div>
		</header>

		<section css={tw`flex flex-col items-center my-80px`}>
			<h2 css={tw`inline-block text-center prose-wow-xl prose-hyper-type`}>
				{portfolioContent.findMe.title}
			</h2>
			<ol css={tw`flex flex-wrap justify-center text-center list-none mt-40px`}>
				{portfolioContent.findMe.list.map((item) => (
					<li key={item.type} css={tw`w-480px mt-40px`}>
						<i
							css={tw`flex items-center justify-center mx-auto mb-6 w-72px h-72px bg-white-opacity-10 rounded-6px`}
						>
							<svg css={tw`w-12 h-12 text-white`}>
								<path
									d={item.icon}
									fill='currentColor'
									css={tw`prose-xl text-gray`}
								/>
							</svg>
						</i>
						<span>{item.label}</span>
					</li>
				))}
			</ol>
		</section>

		{!!portfolioContent.worked.list.length && (
			<section css={tw`px-10 my-80px`}>
				<h2 css={tw`text-center prose-wow-xl prose-hyper-type`}>
					{portfolioContent.worked.title}
				</h2>
				<ul
					css={tw`flex flex-wrap items-stretch justify-center gap-6 mt-80px`}
					className={jobsSectionClassName}
				>
					{portfolioContent.worked.list.map((job, index) => {
						const variant = index % 2 === 0 ? 'yellow' : 'blue';

						return (
							<CardGradient
								as='li'
								innerAs='section'
								key={index}
								variant={variant}
							>
								<h3 css={tw`prose-2xl`}>{job.title}</h3>
								<span
									css={[
										tw`block mb-2 prose-lg`,
										tw`inline-block mb-6 prose-2xl`,
									]}
								>
									({job.type})
								</span>
								<h4 css={tw`prose-heading-2xl mb-6`}>{job.company}</h4>
								<span css={tw`block mb-2 prose-lg`}>{job.duration}</span>
								<span css={tw`block mb-6`}>{job.location}</span>
								<p css={tw`prose-lg`}>{job.description}</p>
							</CardGradient>
						);
					})}
				</ul>
			</section>
		)}
	</>
);

IndexPage.Layout = {
	Component: CustomLayout,
	props: {
		className: 'bg-dark',
	},
};

export default IndexPage;
