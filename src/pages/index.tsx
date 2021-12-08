import { NextSeo } from 'next-seo';

import { portfolioContent } from 'entry/contents';
import { websiteBaseUrl } from 'entry/seo';

import { Button, CardGradient } from 'ui/atoms';
import { CustomLayout } from 'ui/templates';
import type { CustomLayoutProps } from 'ui/templates';

import {
	findMeSectionClassName,
	headerSectionClassName,
	jobsSectionClassName,
} from 'pages.styles';

import type { NextPageWithLayout } from 'next';

const IndexPage: NextPageWithLayout<
	Record<string, never>,
	CustomLayoutProps
> = () => (
	<>
		<NextSeo canonical={`${websiteBaseUrl}/`} />

		<header className={headerSectionClassName}>
			<h1>
				<span className='intro'>{`${portfolioContent.jumbotron.intro} `}</span>
				<span className='name'>{portfolioContent.jumbotron.name}</span>
				<span className='info'>{portfolioContent.jumbotron.infoList[0]}</span>
				<span className='outro'>{portfolioContent.jumbotron.infoList[1]}</span>
			</h1>
			<p>{portfolioContent.jumbotron.description}</p>
			<div>
				<Button size='large'>
					{portfolioContent.jumbotron.actionButtons.knowMe}
				</Button>
				<Button size='large' variant='outline'>
					{portfolioContent.jumbotron.actionButtons.downloadCv}
				</Button>
			</div>
		</header>

		<section className={findMeSectionClassName}>
			<h2>{portfolioContent.findMe.title}</h2>
			<ol>
				{portfolioContent.findMe.list.map((item) => (
					<li key={item.type}>
						<i>
							<svg>
								<path d={item.icon} fill='currentColor' />
							</svg>
						</i>
						<span>{item.label}</span>
					</li>
				))}
			</ol>
		</section>

		{!!portfolioContent.worked.list.length && (
			<section className={jobsSectionClassName}>
				<h2>{portfolioContent.worked.title}</h2>
				<ul>
					{portfolioContent.worked.list.map((job, index) => {
						const variant = index % 2 === 0 ? 'yellow' : 'blue';

						return (
							<CardGradient
								as='li'
								innerAs='section'
								key={index}
								variant={variant}
							>
								<h3>{job.title}</h3>
								<span>({job.type})</span>
								<h4>{job.company}</h4>
								<span>{job.duration}</span>
								<span>{job.location}</span>
								<p>{job.description}</p>
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
