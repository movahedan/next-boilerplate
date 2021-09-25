import { dbConnect } from 'lib/db';
import { PetModel } from 'lib/db/models/Pet';
import { globalApiHanlder } from 'lib/server';

import type { NextApiRequest, NextApiResponse } from 'next';

export default globalApiHanlder(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const pets = await PetModel.find({});
				res.status(200).json({ success: true, data: pets });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const pet = await PetModel.create(req.body);
				res.status(201).json({ success: true, data: pet });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
});
