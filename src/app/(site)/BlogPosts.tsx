'use client';

import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import {
	ArrowRightIcon,
	CircleIcon,
	PencilSwooshIcon,
	TagIcon
} from '~/assets';
import Image from 'next/image';
import Link from 'next/link';
export function BlogPosts({ posts }: { posts: Post[] }) {
	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 25 }}
			className="mx-auto mt-24 sm:mt-32"
		>
			<h2 className="mb-10 flex items-center justify-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
				<PencilSwooshIcon className="h-5 w-5 flex-none" />
				<span className="ml-2">近期文章</span>
			</h2>
			{posts && posts.length > 0 ? (
				<div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-50rem))]">
					<div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block"></div>
					<div className="space-y-16">
						{posts.map((post) => (
							<BlogPostCard key={post.slug} post={post} />
						))}
					</div>
				</div>
			) : (
				<p className="mb-2  text-muted-foreground">暂无博客...</p>
			)}
		</motion.div>
	);
}

export function BlogPostCard({ post }: { post: Post }) {
	return (
		<motion.article
			variants={{
				initial: { opacity: 0, y: 40 },
				animate: {
					opacity: 1,
					y: 0,
					transition: {
						type: 'spring'
					}
				}
			}}
			className="relative group"
		>
			<div className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-amber-50/70 dark:group-hover:bg-amber-800/50  opacity-0 scale-95 transition group-hover:scale-100 group-hover:opacity-100"></div>
			<CircleIcon className="hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block" />
			<div className="relative grid grid-cols-1 sm:grid-cols-3">
				<div className="sm:col-span-2">
					<h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100  pt-8 lg:pt-0">
						{post.title}
					</h3>
					<dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)] text-slate-500 dark:text-slate-400">
						<dt className="sr-only">Date</dt>
						<dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
							<time dateTime={post.publishedAt}>
								{dayjs(post.publishedAt).format('DD/MM/YYYY')}
							</time>
						</dd>
					</dl>
					<div className="mt-2 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
						<p>{post.summary}</p>
						<p className="relative mt-2 flex items-center opacity-85">
							<TagIcon />
							<span>{post.tags.map((v) => v.title).join('、')}</span>
						</p>
					</div>
				</div>
				<Image
					src={post.coverImage.asset.url}
					alt={post.coverImage.alt}
					placeholder="blur"
					blurDataURL={post.coverImage.asset.lqip}
					width={2880}
					height={1550}
					className="hidden sm:block sm:col-span-1 ml-3 object-contain"
				/>
			</div>
			<Link
				href={{ pathname: `/blog/${post.slug}` }}
				className="text-sm flex items-center text-amber-600 group-hover:text-amber-700 transition-colors"
			>
				<span className="relative">
					阅读博客<span className="sr-only">, {post.title}</span>
				</span>
				<span className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl"></span>
				<ArrowRightIcon className="w-5 h-4 ml-2 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-85 transition-all ease-in-out duration-150" />
			</Link>
		</motion.article>
	);
}
