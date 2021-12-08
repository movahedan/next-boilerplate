import { css, keyframes } from '@emotion/css';
import xw from 'xwind';

const headerClassNames = {
	base: xw`flex flex-col justify-center h-screen m-auto w-960px`,
	h1: {
		base: xw`mt-2 prose-hero-xl`,
		yellow: xw`text-yellow`,
		blue: xw`text-blue`,
		block: xw`block`,
		mellow: xw`text-mellow`,
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
	description: xw`my-80px text-gray prose-xl`,
	buttonsWrapper: xw`mx-auto`,
	firstButton: xw`mr-10`,
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
	base: xw`flex flex-col items-center my-80px`,
	h2: xw`inline-block text-center prose-wow-xl prose-hyper-type`,
	ol: {
		base: xw`flex flex-wrap justify-center text-center list-none mt-40px`,
		li: {
			base: xw`w-480px mt-40px`,
			icon: xw`flex items-center justify-center mx-auto mb-6 w-72px h-72px bg-white-opacity-10 rounded-6px`,
			iconSvg: xw`w-12 h-12 text-white`,
			iconLabel: xw`prose-xl text-gray`,
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
	base: xw`px-10 my-80px`,
	h2: xw`text-center prose-wow-xl prose-hyper-type`,
	ul: {
		base: xw`flex flex-wrap items-stretch justify-center gap-6 mt-80px`,
		li: {
			base: xw`max-w-4xl`,
			yellowVariant: xw`lg:w-480px`,
			blueVariant: xw`lg:max-w-4xl`,
			section: {
				base: xw`p-10`,

				h3: xw`prose-2xl`,
				h4: {
					base: xw`prose-heading-2xl mb-6`,
					blue: xw`text-blue`,
					yellow: xw`text-yellow`,
				},
				span: {
					base: xw`block mb-2 prose-lg`,
					firstChild: xw`inline-block mb-6 prose-2xl`,
					lastChild: xw`block mb-6`,
				},
				p: xw`prose-lg`,
			},
		},
	},
	icon: xw`flex items-center justify-center mx-auto mb-6 w-72px h-72px bg-white-opacity-10 rounded-6px`,
	iconPath: xw`w-12 h-12 text-white`,
	iconLabel: xw`prose-xl text-gray`,
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
