import React from 'react';
// import { Link } from 'react-router-dom';

function Sidebar() {
	return (
		<div className="h-screen p-2">
			{/* <Link className="group" to="/questions"> */}
			<div className="group-hover:text-black text-lg font-normal text-gray-500 mb-4 group-visited:text-black">
				Home
			</div>
			{/* </Link> */}
			<div className="text-sm font-normal text-gray-500 mb-1.5">PUBLIC</div>
			<ul>
				{/* <Link className="group" to="/questions"> */}
				<li className="flex flex-row text-gray-500 mb-1.5">
					{' '}
					<div>
						<svg
							aria-hidden="true"
							className="mr-1.5"
							width="18"
							height="18"
							viewBox="0 0 18 18"
						>
							<path
								className="fill-gray-500 group-hover:fill-black"
								d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8ZM8 15.32a6.46 6.46 0 0 1-4.3-2.74 6.46 6.46 0 0 1-.93-5.01L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52Zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.45 6.45 0 0 1 3.83 4.51 6.45 6.45 0 0 1-1.51 5.73v.01Z"
							/>
						</svg>
					</div>
					<span className="text-sm font-normal text-gray-500 group-hover:text-black">
						Questions
					</span>
				</li>
				{/* </Link> */}
				{/* <Link className="group" to="/questions"> */}
				<li className="mb-1.5">
					<span className="text-sm font-normal text-gray-500 ml-6 hover:text-black">
						Tags
					</span>
				</li>
				{/* </Link> */}
				{/* <Link className="group" to="/questions"> */}
				<li className="mb-4">
					<span className="text-sm font-normal text-gray-500 ml-6 hover:text-black">
						Users
					</span>
				</li>
				{/* </Link> */}
			</ul>
			<div className="flex flex-row">
				<span className="text-sm font-normal text-gray-500 mb-1.5">
					COLLECTIVES
				</span>
				<svg
					aria-hidden="true"
					className="ml-1.5"
					width="14"
					height="14"
					viewBox="0 0 14 14"
				>
					<path
						className="fill-gray-500 hover:fill-black"
						d="M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1Zm1 10V6H6v5h2Zm0-6V3H6v2h2Z"
					/>
				</svg>
			</div>
			<ul>
				{/* <Link className="group" to="/questions"> */}
				<li className="flex flex-row">
					<div>
						<svg
							aria-hidden="true"
							className="mt-auto mr-1"
							width="18"
							height="18"
							viewBox="0 0 18 18"
						>
							<path
								className="fill-orange-500"
								d="M9.86.89a1.14 1.14 0 0 0-1.72 0l-.5.58c-.3.35-.79.48-1.23.33l-.72-.25a1.14 1.14 0 0 0-1.49.85l-.14.76c-.1.45-.45.8-.9.9l-.76.14c-.67.14-1.08.83-.85 1.49l.25.72c.15.44.02.92-.33 1.23l-.58.5a1.14 1.14 0 0 0 0 1.72l.58.5c.35.3.48.79.33 1.23l-.25.72c-.23.66.18 1.35.85 1.49l.76.14c.45.1.8.45.9.9l.14.76c.14.67.83 1.08 1.49.85l.72-.25c.44-.15.92-.02 1.23.33l.5.58c.46.52 1.26.52 1.72 0l.5-.58c.3-.35.79-.48 1.23-.33l.72.25c.66.23 1.35-.18 1.49-.85l.14-.76c.1-.45.45-.8.9-.9l.76-.14c.67-.14 1.08-.83.85-1.49l-.25-.72c-.15-.44-.02-.92.33-1.23l.58-.5c.52-.46.52-1.26 0-1.72l-.58-.5c-.35-.3-.48-.79-.33-1.23l.25-.72a1.14 1.14 0 0 0-.85-1.49l-.76-.14c-.45-.1-.8-.45-.9-.9l-.14-.76a1.14 1.14 0 0 0-1.49-.85l-.72.25c-.44.15-.92.02-1.23-.33l-.5-.58Zm-.49 2.67L10.6 6.6c.05.15.19.24.34.25l3.26.22c.36.03.5.48.23.71l-2.5 2.1a.4.4 0 0 0-.14.4l.8 3.16a.4.4 0 0 1-.6.44L9.2 12.13a.4.4 0 0 0-.42 0l-2.77 1.74a.4.4 0 0 1-.6-.44l.8-3.16a.4.4 0 0 0-.13-.4l-2.5-2.1a.4.4 0 0 1 .22-.7l3.26-.23a.4.4 0 0 0 .34-.25l1.22-3.03a.4.4 0 0 1 .74 0Z"
							/>
						</svg>
					</div>
					<span className="text-sm font-normal text-gray-500 mb-4 hover:text-black">
						Explore Collectives
					</span>
				</li>
				{/* </Link> */}
			</ul>
			<div className="flex flex-row">
				<span className="text-sm font-normal text-gray-500 mb-1.5">TEAMS</span>
				<div className="flex flex-row">
					<svg
						aria-hidden="true"
						className="ml-1.5"
						width="14"
						height="14"
						viewBox="0 0 14 14"
					>
						<path
							className="fill-gray-500 hover:fill-black"
							d="M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1Zm1 10V6H6v5h2Zm0-6V3H6v2h2Z"
						/>
					</svg>
				</div>
			</div>
			<ul>
				{/* <Link className="group" to="/questions"> */}
				<li className="flex flex-row">
					<div className="flex flex-row">
						<svg
							aria-hidden="true"
							className="mr-1"
							width="18"
							height="18"
							viewBox="0 0 14 14"
						>
							<path
								className="fill-orange-500"
								d="M4 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h.5c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5h-7A1.5 1.5 0 0 1 2 10.5v-5C2 4.67 2.67 4 3.5 4H4V3Zm5 1V3H5v1h4Z"
							/>
						</svg>
						<span className="text-sm font-normal text-gray-500 hover:text-black">
							Explore Collectives
						</span>
					</div>
				</li>
				{/* </Link> */}
			</ul>
		</div>
	);
}

export default Sidebar;
