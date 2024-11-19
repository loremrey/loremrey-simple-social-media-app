import { CreatePostCard } from '@/components/custom/CreatePostCard';
import Pagination from '@/components/custom/Pagination';
import { PostCard } from '@/components/custom/PostCard';
import { SubsusDescriptionForm } from '@/components/custom/SubusDescriptionForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Cake, FileQuestion } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

async function getData(name: string, searchParam: string) {
	noStore();
	const [count, data] = await prisma.$transaction([
		prisma.post.count({
			where: {
				subusName: name,
			},
		}),
		prisma.subus.findUnique({
			where: {
				name: name,
			},
			select: {
				name: true,
				createdAt: true,
				description: true,
				userId: true,
				posts: {
					take: 5,
					skip: searchParam ? (Number(searchParam) - 1) * 5 : 0,
					select: {
						title: true,
						imageString: true,
						id: true,
						textContent: true,
						Comment: {
							select: {
								id: true,
							},
						},
						Vote: {
							select: {
								userId: true,
								voteType: true,
							},
						},
						User: {
							select: {
								username: true,
							},
						},
					},
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		}),
	]);

	return { data, count };
}

export default async function SubusRoute({ params, searchParams }: { params: { id: string }; searchParams: { page: string } }) {
	const { data, count } = await getData(params.id, searchParams.page);
	console.log(data);
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	return (
		<div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
			<div className="w-[65%] flex flex-col gap-y-5">
				<CreatePostCard />
				{data?.posts.length === 0 ? (
					<div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed text-center p-8">
						<div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
							<FileQuestion className="h-10 w-10 text-primary" />
						</div>
						<h2 className="mt-6 text-xl font-semibold">No post have been created</h2>
					</div>
				) : (
					<>
						{data?.posts.map((post) => (
							<PostCard
								key={post.id}
								id={post.id}
								imageString={post.imageString}
								subusName={data.name}
								title={post.title}
								jsonContent={post.textContent}
								username={post.User?.username as string}
								commentAmount={post.Comment.length}
								voteCount={post.Vote.reduce((acc, vote) => {
									if (vote.voteType === 'UP') return acc + 1;
									if (vote.voteType === 'DOWN') return acc - 1;
									return acc;
								}, 0)}
							/>
						))}
						<Pagination totalPages={Math.ceil(count / 5)} />
					</>
				)}
			</div>
			<div className="w-[35%]">
				<Card>
					<div className="bg-muted p-4 font-semibold">About Subus Community</div>
					<div className="p-4">
						<div className="flex items-center gap-x-3">
							<Image src={`https://avatar.vercel.sh/${data?.name}`} alt="Image of subus community" width={60} height={60} className="rounded-full h-16 w-16" />
							<Link href={`/r/${data?.name}`} className="font-medium">
								r/{data?.name}
							</Link>
						</div>
						{user?.id === data?.userId ? <SubsusDescriptionForm name={params?.id} description={data?.description} /> : <p className="text-sm font-normal text-secondary-foreground mt-2">{data?.description}</p>}
						<div className="flex items-center gap-x-2 mt-4">
							<Cake className="h-5 w-5 text-muted-foreground" />
							<p className="text-muted-foreground font-medium text-sm">Created: {new Date(data?.createdAt as Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', weekday: 'long' })}</p>
						</div>
						<Separator className="my-5" />
						<Button asChild className="rounded-full w-full">
							<Link href={user?.id ? `/r/${data?.name}/create` : '/api/auth/login'}>Create Post</Link>
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}
