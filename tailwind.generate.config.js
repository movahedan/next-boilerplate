#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const resolveConfig = require('tailwindcss/resolveConfig');

const tailwindConfig = require('./tailwind.config.js');

const config = resolveConfig(tailwindConfig);
const configStr = JSON.stringify(config);
const js = `export const tailwindTheme = ${configStr};`;

try {
	fs.writeFileSync(
		path.resolve(process.cwd(), './src/lib/utils/css/tailwind-theme.ts'),
		prettier.format(js, { parser: 'babel' }),
		'utf-8'
	);
} catch (err) {
	console.log(err.message);
}
