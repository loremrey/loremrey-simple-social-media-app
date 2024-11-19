'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { updateUsername } from '@/app/action';
import { SubmitButton } from './SubmitButton';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
	message: '',
	status: '',
};

export function SettingsForm({ username }: { username: string | null | undefined }) {
	const [state, formAction] = useFormState(updateUsername, initialState);
	const { toast } = useToast();

	useEffect(() => {
		if (state?.status === 'green') {
			toast({
				title: 'Successfull',
				description: state.message,
			});
		} else if (state?.status === 'error') {
			toast({
				title: 'Error',
				description: state.message,
				variant: 'destructive',
			});
		}
	}, [state, toast]);

	return (
		<form action={formAction}>
			<h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
			<Separator className="my-4" />
			<Label className="text-lg">Username</Label>
			<p className="text-muted-foreground">In this Settings page you can change your username</p>
			<Input name="username" required className="mt-2" min={2} max={21} defaultValue={username ?? undefined} />

			{state?.status === 'error' && <p className="text-destructive mt-1">{state.message}</p>}

			<div className="w-full flex mt-5 gap-x-5 justify-end">
				<Button variant="secondary" asChild type="button">
					<Link href="/">Cancel</Link>
				</Button>
				<SubmitButton text="Change Username" />
			</div>
		</form>
	);
}
