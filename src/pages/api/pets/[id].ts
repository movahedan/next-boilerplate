import { PetModel } from 'lib/db/models';
import { globalApiHanlder } from 'lib/server';

import type { NextApiRequest, NextApiResponse } from 'next';

export default globalApiHanlder(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		query: { id },
		method,
	} = req;

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const pet = await PetModel.findById(id);
				if (!pet) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: pet });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'PUT' /* Edit a model by its ID */:
			try {
				const pet = await PetModel.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!pet) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: pet });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'DELETE' /* Delete a model by its ID */:
			try {
				const deletedPet = await PetModel.deleteOne({ _id: String(id) });
				if (!deletedPet) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
});
