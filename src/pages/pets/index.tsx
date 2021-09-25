/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { dbConnect } from 'lib/db';
import { PetModel } from 'lib/db/models';

import { BaseLayout } from 'ui';

import type { PetType } from 'lib/db/models';
import type { NextPageWithLayout, GetServerSideProps } from 'next';

interface Props {
	data: {
		pets: PetType[];
	};
}

const IndexPage: NextPageWithLayout<Props> = ({ data: { pets } }) => (
	<>
		<header>
			<Link href='/pets/new'>
				<a className='inline-block p-4 bg-green-500'>Share your pet!</a>
			</Link>
		</header>
		<ul className='flex flex-wrap mt-4 gap-4'>
			{pets.map((pet) => (
				<li key={pet._id} className='flex flex-col w-64 lign-center'>
					<img alt={pet.name} src={pet.image_url} className='mt-auto' />
					<header className='p-4 mt-auto text-center bg-gray-100'>
						<h1>
							{pet.name} (Owner: {pet.owner_name})
						</h1>
					</header>
					<footer className='flex justify-between'>
						<Link passHref href={`/pets/${pet._id}/edit`}>
							<button className='px-4 py-2 bg-red-500'>Edit</button>
						</Link>
						<Link passHref href={`/pets/${pet._id}`}>
							<button className='flex-1 px-6 py-2 bg-gray-300'>View</button>
						</Link>
					</footer>
				</li>
			))}
		</ul>
	</>
);

IndexPage.Layout = {
	Component: BaseLayout,
	props: { className: 'p-4' },
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	await dbConnect();

	const result = await PetModel.find({});
	const pets = result.map((doc) => {
		const pet = doc.toObject();
		pet._id = String(pet._id.toString());

		return pet;
	});

	return {
		props: {
			data: {
				pets,
			},
		},
	};
};

export default IndexPage;
