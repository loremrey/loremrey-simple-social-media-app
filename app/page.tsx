import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Banner from '../public/banner.jpeg';
import HeroImage from '../public/hero-image.png';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CreatePostCard } from '@/components/custom/CreatePostCard';
import prisma from '@/lib/db';
import { PostCard } from '@/components/custom/PostCard';
import { Suspense } from 'react';
import { SuspenseCard } from '@/components/custom/SuspenseCard';
import Pagination from '@/components/custom/Pagination';
import { unstable_noStore as noStore } from 'next/cache';

async function getData(searchParam: string) {
	noStore();
	const [count, data] = await prisma.$transaction([
		prisma.post.count(),
		prisma.post.findMany({
			take: 5,
			skip: searchParam ? (Number(searchParam) - 1) * 5 : 0,
			select: {
				id: true,
				title: true,
				textContent: true,
				imageString: true,
				createdAt: true,
				subusName: true,
				Comment: {
					select: {
						id: true,
					},
				},
				User: {
					select: {
						username: true,
					},
				},
				Vote: {
					select: {
						voteType: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		}),
	]);
	return { data, count };
}

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
	return (
		<div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
			<div className="w-[65%] flex flex-col gap-y-5">
				<CreatePostCard />
				<Suspense fallback={<SuspenseCard />} key={searchParams.page}>
					<ShowItems searchParams={searchParams} />
				</Suspense>
			</div>
			<div className="w-[35%]">
				<Card>
					<Image src={Banner} alt="Banner" className="rounded-t-lg max-h-24 object-cover" />
					<div className="p-2">
						<div className="flex items-center">
							<Image src={HeroImage} alt="Hero Image" className="w-16 h-16 -mt-5" />
							<h1 className="font-medium pl-3">Home</h1>
						</div>
						<p className="text-muted-foreground pt-2">Your Home Subus frontpage. Come here to check in with your favorites communities!</p>
						<Separator className="my-5" />
						<div className="flex flex-col gap-y-3">
							<Button variant="secondary" asChild>
								<Link href="/r/admin/create">Create Post</Link>
							</Button>
							<Button asChild>
								<Link href="/r/create">Create Community</Link>
							</Button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
	const { count, data } = await getData(searchParams.page);

	return (
		<>
			{data.map((post) => (
				<PostCard
					key={post.id}
					id={post.id}
					imageString={post.imageString}
					title={post.title}
					jsonContent={post.textContent}
					subusName={post.subusName as string}
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
	);
}
