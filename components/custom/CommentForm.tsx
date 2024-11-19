'use client';

import { createComment } from '@/app/action';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { SubmitButton } from './SubmitButton';
import { useRef } from 'react';

interface iAppProps {
	postId: string;
}

export function CommentForm({ postId }: iAppProps) {
	const ref = useRef<HTMLFormElement>(null);

	return (
		<form
			className="mt-5"
			action={async (formData) => {
				await createComment(formData);
				ref.current?.reset();
			}}
			ref={ref}
		>
			<input type="hidden" name="postId" value={postId} />
			<Label>Comment right here</Label>
			<Textarea placeholder="What are you thoughts?" className="w-full mt-1 mb-2" name="comment" />
			<SubmitButton text="Comment" />
		</form>
	);
}
