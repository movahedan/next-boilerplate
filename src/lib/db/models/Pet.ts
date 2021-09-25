import { model, models, Schema } from 'mongoose';

import type { Model } from 'mongoose';

export interface PetType {
	_id: string;
	name: string;
	owner_name: string;
	species: string;
	age: number;
	poddy_trained: boolean;
	diet?: string[];
	image_url: string;
	likes?: string[];
	dislikes?: string[];
}

const PetSchema = new Schema<PetType, Model<PetType>, PetType>({
	name: {
		type: String,
		required: [true, 'Please provide a name for this pet.'],
		maxlength: [20, 'Name cannot be more than 60 characters'],
	},
	owner_name: {
		type: String,
		required: [true, "Please provide the pet owner's name"],
		maxlength: [20, "Owner's Name cannot be more than 60 characters"],
	},
	species: {
		type: String,
		required: [true, 'Please specify the species of your pet.'],
		maxlength: [30, 'Species specified cannot be more than 40 characters'],
	},
	age: {
		type: Number,
	},
	poddy_trained: {
		type: Boolean,
	},
	diet: {
		type: Array,
	},
	image_url: {
		required: [true, 'Please provide an image url for this pet.'],
		type: String,
	},
	likes: {
		type: Array,
	},
	dislikes: {
		type: Array,
	},
});

export const PetModel =
	(models.Pet as Model<PetType>) || model<PetType>('Pet', PetSchema);
