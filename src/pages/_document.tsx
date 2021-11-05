import { cache } from '@emotion/css';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import type { DocumentContext } from 'next/document';

export default class AppDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const page = await ctx.renderPage();

		const { extractCritical } = createEmotionServer(cache);
		const { ids, css } = extractCritical(page.html);
		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					<style
						data-emotion={`css ${ids.join(' ')}`}
						dangerouslySetInnerHTML={{ __html: css }}
					/>
				</>
			),
		};
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
