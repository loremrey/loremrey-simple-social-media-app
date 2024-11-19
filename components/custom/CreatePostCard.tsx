import pfp from '../../public/pfp.png';
import Image from 'next/image';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import Link from 'next/link';
import { ImageDown, Link2 } from 'lucide-react';
import { Button } from '../ui/button';

export function CreatePostCard() {
	return (
		<Card className="px-4 py-2 flex items-center gap-x-4">
			<Image src={pfp} alt="pfp" className="h-12 w-fit" />
			<Link href="/r/admin/create" className="w-full">
				<Input placeholder="Create your post" />
			</Link>
			<div className="flex gap-x-4 items-center">
				<Button variant="outline" size="icon" asChild>
					<Link href="/r/admin/create">
						<ImageDown className="w-4 h-4" />
					</Link>
				</Button>
				<Button asChild variant="outline" size="icon">
					<Link href="/r/admin/create">
						<Link2 className="w-4 h-4" />
					</Link>
				</Button>
			</div>
		</Card>
	);
}
