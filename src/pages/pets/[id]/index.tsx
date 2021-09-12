/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { dbConnect } from 'lib/mongodb';
import { PetModel } from 'models';

import type { PetType } from 'models';
import type { GetServerSideProps, NextPageWithLayout } from 'next';

const PetPage: NextPageWithLayout<{ pet: PetType }> = ({ pet }) => {
	const router = useRouter();
	const [message, setMessage] = useState('');
	const handleDelete = async () => {
		try {
			await fetch(`/api/pets/${pet._id}`, {
				method: 'Delete',
			});
			router.push('/pets');
		} catch (error) {
			setMessage('Failed to delete the pet.');
		}
	};

	return (
		<>
			<div key={pet._id} className='flex flex-col w-64  align-center'>
				<img alt={pet.name} src={pet.image_url} className='mt-auto' />
				<div className='p-4 mt-auto bg-gray-100'>
					<h1>{pet.name}</h1>
					<h3>Owner: {pet.owner_name}</h3>

					{(!!pet.likes?.length || !!pet.dislikes?.length) && (
						<>
							{!!pet.likes?.length && (
								<div className='flex'>
									<p className='mr-2'>Likes</p>
									<ul>
										{pet.likes.map((data, index) => (
											<li key={index}>{data} </li>
										))}
									</ul>
								</div>
							)}
							{!!pet.dislikes?.length && (
								<div className='flex'>
									<p className='mr-2'>Dislikes:</p>
									<ul>
										{pet.dislikes.map((data, index) => (
											<li key={index}>{data} </li>
										))}
									</ul>
								</div>
							)}
						</>
					)}
				</div>
				<div className='flex justify-between'>
					<button className='px-4 py-2 bg-red-500' onClick={handleDelete}>
						Delete
					</button>
					<Link passHref href={`/pets/${pet._id}/edit`}>
						<button className='flex-1 px-6 py-2 bg-gray-300'>Edit</button>
					</Link>
				</div>
			</div>
			{message && <p>{message}</p>}
		</>
	);
};

export const getServerSideProps: GetServerSideProps<
	{ pet: PetType },
	{ id: string }
> = async ({ params }) => {
	await dbConnect();

	const pet = params?.id ? await PetModel.findById(params?.id).lean() : null;
	if (pet) {
		pet._id = pet._id.toString();
	} else {
		return {
			redirect: {
				statusCode: 404,
				permanent: false,
				destination: '/pets',
			},
		};
	}

	return { props: { pet } };
};

export default PetPage;
