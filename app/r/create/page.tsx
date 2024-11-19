'use client';

import { createSubusCommunity } from '@/app/action';
import { SubmitButton } from '@/components/custom/SubmitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

const initialState = {
	message: '',
	status: '',
};

export default function SubusPage() {
	const [state, formAction] = useFormState(createSubusCommunity, initialState);
	const { toast } = useToast();

	useEffect(() => {
		if (state?.status === 'error') {
			toast({
				title: 'Error',
				description: state.message,
				variant: 'destructive',
			});
		}
	}, [state, toast]);

	return (
		<div className="max-w-[1000px] mx-auto flex flex-col mt-4">
			<form action={formAction}>
				<h1 className="text-3xl font-extrabold tracking-tight">Create Subus Community</h1>
				<Separator className="my-4" />
				<Label className="text-lg">Name</Label>
				<p className="text-muted-foreground">Subus Community including capitalization cannot be change!</p>
				<div className="relative mt-3">
					<p className="absolute left-0 w-8 flex items-center justify-center h-full text-muted-foreground">r/</p>
					<Input name="name" required className="pl-6" minLength={2} maxLength={21} />
				</div>
				<p className="mt-1 text-destructive">{state.message}</p>
				<div className="w-full flex mt-5 gap-x-5 justify-end">
					<Button asChild variant="secondary">
						<Link href="/">Cancel</Link>
					</Button>
					<SubmitButton text="Create Subus Community" />
				</div>
			</form>
		</div>
	);
}
