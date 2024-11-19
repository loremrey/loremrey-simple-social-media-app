import { MenuIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

interface iAppProps {
	userImage: string | null;
}

export function UserDropdown({ userImage }: iAppProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
					<MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
					<Image
						src={userImage ?? 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
						alt="avatar of user"
						className="rounded-full h-8 w-8 hidden lg:block"
						width={32}
						height={32}
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[200px]">
				<DropdownMenuItem>
					<Link href="/r/create" className="w-full">
						Create Community
					</Link>
				</DropdownMenuItem>{' '}
				<DropdownMenuItem>
					<Link href="/create" className="w-full">
						Create Post
					</Link>
				</DropdownMenuItem>{' '}
				<DropdownMenuItem>
					<Link href="/settings" className="w-full">
						Settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogoutLink>Logout</LogoutLink>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
