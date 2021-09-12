import { PetForm } from 'ui/organisms';

import type { PetType } from 'models';
import type { NextPageWithLayout } from 'next';

const petForm: Omit<PetType, '_id'> = {
	name: '',
	owner_name: '',
	species: '',
	age: 0,
	poddy_trained: false,
	diet: [],
	image_url: '',
	likes: [],
	dislikes: [],
};

const NewPet: NextPageWithLayout = () => <PetForm petForm={petForm} />;

export default NewPet;
