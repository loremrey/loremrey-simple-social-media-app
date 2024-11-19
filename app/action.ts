'use server';

import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Prisma, TypeOfVote } from '@prisma/client';
import { redirect } from 'next/navigation';
import { JSONContent } from '@tiptap/react';
import { revalidatePath } from 'next/cache';

export async function updateUsername(prevState: unknown, formData: FormData) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) return redirect('/api/auth/login');

	const username = formData.get('username') as string;

	try {
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				username: username,
			},
		});

		return {
			message: 'Username updated successfully',
			status: 'green',
		};
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return {
					message: 'Username already exists',
					status: 'error',
				};
			}
		}
		throw e;
	}
}

export async function createSubusCommunity(prevState: unknown, formData: FormData) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) return redirect('/api/auth/login');

	try {
		const name = formData.get('name') as string;

		const data = await prisma.subus.create({
			data: {
				name: name,
				userId: user.id,
			},
		});

		return redirect(`/r/${data.name}`);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return {
					message: 'Subus Community already exists',
					status: 'error',
				};
			}
		}
		throw e;
	}
}

export async function updateSubusCommunityDescription(prevState: unknown, formData: FormData) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) return redirect('/api/auth/login');

	try {
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		await prisma.subus.update({
			where: {
				name: name,
			},
			data: {
				description: description,
			},
		});

		return {
			status: 'green',
			message: 'Successfully update subus community description!',
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return {
			status: 'error',
			message: 'Failed to update subus community description',
		};
	}
}

export async function createPost({ jsonContent }: { jsonContent: JSONContent | null }, formData: FormData) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) return redirect('/api/auth/login');

	const title = formData.get('title') as string;
	const imageUrl = formData.get('imageUrl') as string | null;
	const subusName = formData.get('subusName') as string;

	const data = await prisma.post.create({
		data: {
			title: title,
			imageString: imageUrl ?? undefined,
			textContent: jsonContent ?? undefined,
			subusName: subusName,
			userId: user.id,
		},
	});
	return redirect(`/post/${data.id}`);
}

export async function handleVote(formData: FormData): Promise<void> {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) redirect('/api/auth/login');

	const postId = formData.get('postId') as string;
	const voteDirection = formData.get('voteDirection') as TypeOfVote;

	const vote = await prisma.vote.findFirst({
		where: {
			postId: postId,
			userId: user.id,
		},
	});

	if (vote) {
		if (vote.voteType === voteDirection) {
			await prisma.vote.delete({
				where: {
					id: vote.id,
				},
			});
			return revalidatePath('/');
		} else {
			await prisma.vote.update({
				where: {
					id: vote.id,
				},
				data: {
					voteType: voteDirection,
				},
			});
			return revalidatePath('/');
		}
	} else {
		await prisma.vote.create({
			data: {
				postId: postId,
				userId: user.id,
				voteType: voteDirection,
			},
		});
		return revalidatePath('/');
	}
}

export async function createComment(formData: FormData) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) return redirect('/api/auth/login');

	const comment = formData.get('comment') as string;
	const postId = formData.get('postId') as string;

	await prisma.comment.create({
		data: {
			text: comment,
			userId: user.id,
			postId: postId,
		},
	});
	return revalidatePath(`/post/${postId}`);
}
