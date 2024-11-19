import LogoName from '../../public/logo-name.svg';
import LogoIcon from '../../public/logo-icon.svg';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggler } from './ThemeToggler';
import { Button } from '../ui/button';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { UserDropdown } from './UserDropdown';

export async function Navbar() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	return (
		<nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
			<Link href="/" className="flex items-center gap-x-3 ">
				<Image src={LogoIcon} alt="logo mobile" className="h-14 w-fit" />
				<Image src={LogoName} alt="logo name" className="h-16 w-fit hidden lg:block" />
			</Link>
			<div className="flex items-center gap-x-4">
				<ThemeToggler />
				{user ? (
					<UserDropdown userImage={user.picture} />
				) : (
					<div className="flex items-center gap-x-4">
						<Button variant="secondary" asChild>
							<RegisterLink>Sign up</RegisterLink>
						</Button>
						<Button asChild>
							<LoginLink>Log in</LoginLink>
						</Button>
					</div>
				)}
			</div>
		</nav>
	);
}
