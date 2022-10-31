import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { AiOutlineGithub, AiFillFacebook } from 'react-icons/ai';
import { FaQuestionCircle } from 'react-icons/fa';
import Header from '../components/Header';

export default function SignUp() {
	const [dpName, setDpName] = useState();
	const onChangeName = (event) => {
		setDpName(event.target.value);
		console.log(dpName);
	};

	const [email, setEmail] = useState();
	const onChangeEmail = (event) => {
		setEmail(event.target.value);
		console.log(email);
	};

	const [passWord, setPassWord] = useState();
	const onChangePassWord = (event) => {
		setPassWord(event.target.value);
		console.log(passWord);
	};

	return (
		<>
			<Header />
			<div className="lg:w-full w-full bg-gray-200 h-screen">
				<div className="flex flex-col items-center bg-gray-200">
					<div className="mt-20 mb-5 text-xl text-center">
						<div>Create your Stack Overflow account. It’s free</div>
						<div> and only takes a minute.</div>
					</div>
					<div>
						<div className=" mx-auto">
							<div className="rounded bg-white my-1 py-2 px-16  text-center text-base   hover:bg-gray-100 focus:outline-none focus:ring focus:ring-violet-300">
								<FcGoogle className="inline text-xl mr-1" />
								Sign up with Google
							</div>
							<div className="rounded  bg-grayblack-100 my-3 py-2 px-16 text-center text-white text-base  hover:bg-grayblack-200 focus:outline-none focus:ring focus:ring-violet-300">
								<AiOutlineGithub className="inline text-xl mr-1" />
								Sign up with GitHub
							</div>
							<div className="rounded bg-navy-100  my-3 py-2 px-16 text-center text-white text-base  hover:bg-navy-200 focus:outline-none focus:ring focus:ring-blue-300">
								<AiFillFacebook className="inline text-xl mr-1" /> Sign up with
								Facebook
							</div>
							<form className="lg:w-full bg-white p-5 mt-6 drop-shadow-md rounded-md">
								<div className="font-medium mb-1 text-base">Display name</div>
								<input
									type="email"
									onChange={onChangeName}
									className="rounded w-full border-solid  border-[1.5px] focus:outline-none focus:ring focus:ring-blue-200 py-1 pl-2"
								/>
								<div className="font-medium mb-1 mt-4 text-base">Email</div>
								<input
									onChange={onChangeEmail}
									type="email"
									className="rounded w-full border-solid  border-[1.5px] focus:outline-none focus:ring focus:ring-blue-200 py-1 pl-2"
								/>
								{/* 이부분 커스텀 필요!! */}
								<div className=" font-medium mb-1 mt-4 text-base">Password</div>
								<input
									type="password"
									onChange={onChangePassWord}
									className="rounded-md w-full border-solid  border-[1.5px] focus:outline-none focus:ring focus:ring-blue-200 py-1 pl-2"
								/>
								<div className="mt-2 text-xs text-gray-500">
									Passwords must contain at least eight characters,
								</div>
								<div className="mb-2 text-xs text-gray-500">
									including at least 1 letter and 1 number.
								</div>
								{/* 캅차 */}
								<div className="border py-3 bg-gray-200 rounded-sm border-solid border-gray-300">
									{/* <div className="bg-gray-100 mx-4 my-2"> */}
									<div className="py-3 text-center bg-gray-100 mx-14  border rounded-sm border-solid border-gray-300 shadow-md">
										<div>
											<div className="text-base mt-4 mb-8 flex items-center justify-center">
												<input
													type="checkbox"
													className="border w-6 h-6 border-solid border-gray-300 focus:ring focus:ring-blue-200 rounded-md mt-1 mr-3"
												/>
												<div>I&apos;m not a robot</div>
											</div>
											<div className="text-xs text-gray-500  flex items-center justify-center">
												<img
													alt="recatcha"
													src="/image/recaptcha.png"
													className="w-6 mr-1"
												/>
												<span>reCAPCHA</span>
											</div>
											<div className="text-xs text-gray-500">
												Privacy - Terms
											</div>
										</div>
									</div>
									{/* </div> */}
								</div>
								<div className="flex items-start my-4">
									<input
										type="checkbox"
										className="border-solid  border-gray-300 focus:ring focus:ring-blue-200 rounded-md mt-1"
									/>
									<div className="text-xs ml-1 text-gray-700">
										<div className="flex justify-between align-middle">
											Opt-in to receive occasional product
											<FaQuestionCircle className=" text-gray-500 text-sm" />
										</div>
										<div>updates, user research invitations, company </div>
										<div>announcements, and digests.</div>
									</div>
								</div>
								<button
									className="bg-blue-500 rounded w-full mb-8 py-2 text-white text-sm  hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
									type="submit"
								>
									Sign up
								</button>
								<div className="text-xs text-gray-500">
									By clicking “Sign up”, you agree to our terms of
								</div>
								<div className="text-xs text-gray-500">
									service, privacy policy and cookie policy
								</div>
							</form>
						</div>
					</div>
					<div className="text-sm mt-10 ">
						Already have an account?
						<Link
							to="/login"
							className="ml-1 text-sm text-blue-500 hover:text-sky-500"
						>
							Log in
						</Link>
					</div>
					<div className="mt-2 mb-7 text-sm">
						Are you an employer?
						<span className="ml-1 text-sm  text-blue-500 hover:text-sky-500">
							Sign up on Talent
							<MdOutlineOpenInNew className="inline ml-1" />
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
