/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'static.vecteezy.com',
				protocol: 'https',
				port: '',
			},
			{
				hostname: 'lh3.googleusercontent.com',
				protocol: 'https',
				port: '',
			},
			{
				hostname: 'platform-lookaside.fbsbx.com',
				protocol: 'https',
				port: '',
			},
			{
				hostname: 'avatars.githubusercontent.com',
				protocol: 'https',
				port: '',
			},
			{
				hostname: 'avatar.vercel.sh',
				protocol: 'https',
				port: '',
			},
			{
				hostname: 'utfs.io',
				protocol: 'https',
				port: '',
			},
		],
	},
};

export default nextConfig;
