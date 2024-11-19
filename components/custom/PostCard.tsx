import { MessageCircle } from 'lucide-react';
import { Card } from '../ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { CopyLink } from './CopyLink';
import { handleVote } from '@/app/action';
import { DownVoteButton, UpVoteButton } from './SubmitButton';
import { RenderToJson } from './RenderToJson';

interface iAppProps {
	title: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	jsonContent: any;
	id: string;
	subusName: string;
	username: string;
	imageString: string | null;
	voteCount: number;
	commentAmount: number;
}

export function PostCard({ id, title, jsonContent, subusName, username, imageString, voteCount, commentAmount }: iAppProps) {
	return (
		<Card className="flex relative overflow-hidden">
			<div className="flex flex-col items-center gap-y-2 bg-muted p-2">
				<form action={handleVote}>
					<input type="hidden" name="voteDirection" value="UP" />
					<input type="hidden" name="postId" value={id} />
					<UpVoteButton />
				</form>
				{voteCount}
				<form action={handleVote}>
					<input type="hidden" name="voteDirection" value="DOWN" />
					<input type="hidden" name="postId" value={id} />

					<DownVoteButton />
				</form>
			</div>
			<div>
				<div className="flex items-center gap-x-2 p-2">
					<Link href={`/r/${subusName}`} className="font-semibold text-xs ">
						r/{subusName}
					</Link>
					<p className="text-xs text-muted-foreground">
						Posted by: <span className="hover:text-primary">u/{username}</span>
					</p>
				</div>
				<div className="px-2">
					<Link href={`/post/${id}`}>
						<h1 className="font-medium mt-1 text-lg">{title}</h1>
					</Link>
				</div>
				<div className="max-h-[300px] overflow-hidden">{imageString ? <Image src={imageString} alt="Post Image" width={600} height={300} className="w-full h-full" /> : <RenderToJson data={jsonContent} />}</div>
				<div className="m-3 flex items-center gap-x-5">
					<div className="flex items-center gap-x-1">
						<MessageCircle className="h-4 w-4 text-muted-foreground" />
						<p className="text-muted-foreground font-medium text-xs">{commentAmount} Comments</p>
					</div>
					<CopyLink id={id} />
				</div>
			</div>
		</Card>
	);
}
