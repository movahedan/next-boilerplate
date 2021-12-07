import { css, keyframes } from '@emotion/css';
import tw from 'twin.macro';

const headerClassNames = {
	base: tw`flex flex-col justify-center h-screen m-auto w-960px`,
	h1: {
		base: tw`mt-2 prose-hero-xl`,
		yellow: tw`text-yellow`,
		blue: tw`text-blue`,
		block: tw`block`,
		mellow: tw`text-mellow`,
		blinkKeyframe: keyframes`
		0% {
			opacity: 0;
		}
		49% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 1;
		}
	`,
	},
	description: tw`my-80px text-gray prose-xl`,
	buttonsWrapper: tw`mx-auto`,
	firstButton: tw`mr-10`,
};
export const headerSectionClassName = css`
	${headerClassNames.base};

	& > h1 {
		${headerClassNames.h1.base};
		.block {
			${headerClassNames.h1.block};
		}
		.yellow {
			${headerClassNames.h1.yellow};
		}
		.blue {
			${headerClassNames.h1.blue};
		}
		.mellow {
			${headerClassNames.h1.mellow};
		}
		.intro {
			&::before {
				content: '*';
				${headerClassNames.h1.yellow};
			}
		}
		.info {
			${headerClassNames.h1.block};
			&::after {
				content: ' &&';
				${headerClassNames.h1.blue};
			}
		}
		.outro {
			${headerClassNames.h1.block};
			${headerClassNames.h1.mellow};
			&::after {
				content: ';';
				${headerClassNames.h1.yellow};
				animation-duration: 1.2s;
				animation-name: ${headerClassNames.h1.blinkKeyframe};
				animation-iteration-count: infinite;
			}
		}
		.name {
			&::before {
				content: '<';
				${headerClassNames.h1.blue};
			}
			&::after {
				content: '>';
				${headerClassNames.h1.blue};
			}
		}
	}
	& > p {
		${headerClassNames.description};
	}
	& > div {
		${headerClassNames.buttonsWrapper};
		button:first-child {
			${headerClassNames.firstButton};
		}
	}
`;

const findMeSectionClassNames = {
	base: tw`flex flex-col items-center my-80px`,
	h2: tw`inline-block text-center prose-wow-xl prose-hyper-type`,
	ol: {
		base: tw`flex flex-wrap justify-center text-center list-none mt-40px`,
		li: {
			base: tw`w-480px mt-40px`,
			icon: tw`flex items-center justify-center mx-auto mb-6 w-72px h-72px bg-white-opacity-10 rounded-6px`,
			iconSvg: tw`w-12 h-12 text-white`,
			iconLabel: tw`prose-xl text-gray`,
		},
	},
};
export const findMeSectionClassName = css`
	${findMeSectionClassNames.base};
	& > h2 {
		${findMeSectionClassNames.h2};
	}
	& > ol {
		${findMeSectionClassNames.ol.base};
		& > li {
			${findMeSectionClassNames.ol.li.base};
			i {
				${findMeSectionClassNames.ol.li.icon};
				svg {
					${findMeSectionClassNames.ol.li.iconSvg};
				}
				span {
					${findMeSectionClassNames.ol.li.iconLabel};
				}
			}
		}
	}
`;

const jobsSectionClassNames = {
	base: tw`px-10 my-80px`,
	h2: tw`text-center prose-wow-xl prose-hyper-type`,
	ul: {
		base: tw`flex flex-wrap items-stretch justify-center gap-6 mt-80px`,
		li: {
			base: tw`max-w-4xl`,
			yellowVariant: tw`lg:w-480px`,
			blueVariant: tw`lg:max-w-4xl`,
			section: {
				base: tw`p-10`,

				h3: tw`prose-2xl`,
				h4: {
					base: tw`prose-heading-2xl mb-6`,
					blue: tw`text-blue`,
					yellow: tw`text-yellow`,
				},
				span: {
					base: tw`block mb-2 prose-lg`,
					firstChild: tw`inline-block mb-6 prose-2xl`,
					lastChild: tw`block mb-6`,
				},
				p: tw`prose-lg`,
			},
		},
	},
	icon: tw`flex items-center justify-center mx-auto mb-6 w-72px h-72px bg-white-opacity-10 rounded-6px`,
	iconPath: tw`w-12 h-12 text-white`,
	iconLabel: tw`prose-xl text-gray`,
};
export const jobsSectionClassName = css`
	${jobsSectionClassNames.base};
	& > h2 {
		${jobsSectionClassNames.h2};
	}
	& > ul {
		${jobsSectionClassNames.ul.base};
		& > li {
			${jobsSectionClassNames.ul.li.base};
			&.blue {
				${jobsSectionClassNames.ul.li.blueVariant};
			}
			&.yellow {
				${jobsSectionClassNames.ul.li.yellowVariant};
			}

			section {
				${jobsSectionClassNames.ul.li.section.base};

				h3 {
					${jobsSectionClassNames.ul.li.section.h3};
				}
				h4 {
					${jobsSectionClassNames.ul.li.section.h4};
				}
				p {
					${jobsSectionClassNames.ul.li.section.p};
				}
				span {
					${jobsSectionClassNames.ul.li.section.span.base};

					&:first-child {
						${jobsSectionClassNames.ul.li.section.span.firstChild};
					}
					&:last-child {
						${jobsSectionClassNames.ul.li.section.span.lastChild};
					}
				}
			}
		}
	}
`;
