'use client';

import { updateSubusCommunityDescription } from '@/app/action';
import { Textarea } from '../ui/textarea';
import { SaveButton } from './SubmitButton';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface iAppProps {
	name: string;
	description: string | null | undefined;
}

const initialState = {
	message: '',
	status: '',
};

export function SubsusDescriptionForm({ name, description }: iAppProps) {
	const [state, formAction] = useFormState(updateSubusCommunityDescription, initialState);
	const { toast } = useToast();

	useEffect(() => {
		if (state.status === 'green') {
			toast({
				title: 'Success',
				description: state.message,
			});
		} else if (state.status === 'error') {
			toast({
				title: 'Error',
				description: state.message,
				variant: 'destructive',
			});
		}
	}, [state, toast]);

	return (
		<form className="mt-3" action={formAction}>
			<input type="hidden" name="name" value={name} />
			<Textarea placeholder="Create your description for your subus community" maxLength={100} name="description" defaultValue={description ?? undefined} />
			<SaveButton />
		</form>
	);
}
