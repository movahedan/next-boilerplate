import { useRouter } from 'next/router';
import { useState } from 'react';
import { mutate } from 'swr';

import type { PetType } from 'lib/db/models';
import type { FormEventHandler, ChangeEventHandler, FC } from 'react';

interface PetFormInterface {
	petForm: Omit<PetType, '_id'>;
	className?: string;
}

const contentType = 'application/json';
export const PetForm: FC<PetFormInterface> = ({ petForm, className }) => {
	const {
		push,
		query: { id },
	} = useRouter();
	const formId = `${id ? `edit` : `create`}-pet-form`;

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [message, setMessage] = useState('');
	const [form, setForm] = useState<Omit<PetType, '_id'>>({
		name: petForm.name,
		owner_name: petForm.owner_name,
		species: petForm.species,
		age: petForm.age,
		poddy_trained: petForm.poddy_trained,
		diet: petForm.diet,
		image_url: petForm.image_url,
		likes: petForm.likes,
		dislikes: petForm.dislikes,
	});

	const putData = async (form: Omit<PetType, '_id'>) => {
		try {
			const res = await fetch(`/api/pets/${id}`, {
				method: 'PUT',
				headers: {
					Accept: contentType,
					'Content-Type': contentType,
				},
				body: JSON.stringify(form),
			});

			if (!res.ok) {
				throw new Error(res.status.toString());
			}

			const { data } = await res.json();

			mutate(`/api/pets/${id}`, data, false); // Update the local data without a revalidation
			push('/pets');
		} catch (error) {
			setMessage('Failed to update pet');
		}
	};

	const postData = async (form: Omit<PetType, '_id'>) => {
		try {
			const res = await fetch('/api/pets', {
				method: 'POST',
				headers: {
					Accept: contentType,
					'Content-Type': contentType,
				},
				body: JSON.stringify(form),
			});

			// Throw error with status code in case Fetch API req failed
			if (!res.ok) {
				throw new Error(res.status.toString());
			}

			push('/pets');
		} catch (error) {
			setMessage('Failed to add pet');
		}
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const target = e.target;
		const value =
			target.name === 'poddy_trained' ? target.checked : target.value;
		const name = target.name;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const errors = formValidate();

		if (Object.values(errors).find(Boolean)) {
			setErrors(errors);
		} else {
			if (id) {
				putData(form);
			} else {
				postData(form);
			}
		}
	};

	const formValidate = () => {
		const errors: { [P in keyof PetType]?: string } = {};

		if (!form.name) errors.name = 'Name is required';
		if (!form.owner_name) errors.owner_name = 'Owner is required';
		if (!form.species) errors.species = 'Species is required';
		if (!form.image_url) errors.image_url = 'Image URL is required';

		return errors;
	};

	return (
		<form
			id={formId}
			onSubmit={handleSubmit}
			className={['flex flex-col p-4 bg-gray-50 gap-3', className].join(' ')}
		>
			<label htmlFor='name'>Name</label>
			<input
				type='text'
				maxLength={20}
				name='name'
				value={form.name}
				onChange={handleChange}
				required
			/>

			<label htmlFor='owner_name'>Owner</label>
			<input
				type='text'
				maxLength={20}
				name='owner_name'
				value={form.owner_name}
				onChange={handleChange}
				required
			/>

			<label htmlFor='species'>Species</label>
			<input
				type='text'
				maxLength={30}
				name='species'
				value={form.species}
				onChange={handleChange}
				required
			/>

			<label htmlFor='age'>Age</label>
			<input
				type='number'
				name='age'
				value={form.age}
				onChange={handleChange}
			/>

			<label htmlFor='poddy_trained'>Potty Trained</label>
			<input
				type='checkbox'
				name='poddy_trained'
				checked={form.poddy_trained}
				onChange={handleChange}
			/>

			<label htmlFor='diet'>Diet</label>
			<textarea
				name='diet'
				maxLength={60}
				value={form.diet}
				onChange={handleChange as never}
			/>

			<label htmlFor='image_url'>Image URL</label>
			<input
				type='url'
				name='image_url'
				value={form.image_url}
				onChange={handleChange}
				required
			/>

			<label htmlFor='likes'>Likes</label>
			<textarea
				name='likes'
				maxLength={60}
				value={form.likes}
				onChange={handleChange as never}
			/>

			<label htmlFor='dislikes'>Dislikes</label>
			<textarea
				name='dislikes'
				maxLength={60}
				value={form.dislikes}
				onChange={handleChange as never}
			/>

			<button type='submit' className='p-4 text-white bg-green-600'>
				Submit
			</button>

			<p>{message}</p>
			<div>
				{Object.values(errors).map((error, index) => (
					<li key={index}>{String(error)}</li>
				))}
			</div>
		</form>
	);
};
