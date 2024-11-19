'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { ArrowDown, ArrowUp, Loader2 } from 'lucide-react';

export function SubmitButton({ text }: { text: string }) {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<Button disabled>
					<Loader2 className="mr-2 w-4 h-4 animate-spin" />
					Please wait
				</Button>
			) : (
				<Button type="submit">{text}</Button>
			)}
		</>
	);
}

export function SaveButton() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button className="mt-2 w-full" disabled>
					<Loader2 className="mr-2 w-3 h-3 animate-spin" />
					Please wait
				</Button>
			) : (
				<Button size="sm" className="mt-2 w-full" type="submit">
					Save
				</Button>
			)}
		</>
	);
}

export function UpVoteButton() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button variant="outline" size="sm" type="submit">
					<Loader2 className="w-4 h-4 animate-spin" />
				</Button>
			) : (
				<Button variant="outline" size="sm" type="submit">
					<ArrowUp className="w-4 h-4" />
				</Button>
			)}
		</>
	);
}

export function DownVoteButton() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button variant="outline" size="sm" type="submit">
					<Loader2 className="w-4 h-4 animate-spin" />
				</Button>
			) : (
				<Button variant="outline" size="sm" type="submit">
					<ArrowDown className="w-4 h-4" />
				</Button>
			)}
		</>
	);
}
