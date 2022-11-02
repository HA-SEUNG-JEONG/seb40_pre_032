import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import authAtom from '../_state/auth';

export default function useUserActions() {
	// const auth = useRecoilValue(authAtom);
	const navigate = useNavigate();
	// const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
	const baseUrl = `http://localhost:8080`;
	const setAuth = useSetRecoilState(authAtom); // set함수 반환

	function login(email, password) {
		alert(email);
		return axios
			.post(
				`${baseUrl}/authenticate`,
				{ email, password },
				{ withCredentials: true },
			)
			.then((response) => {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem('user', JSON.stringify(response.data));
				setAuth(response.data);
				// get return url from location state or default to home page
				navigate('/');
			});
	}

	function naverLogin() {
		const params = new URLSearchParams(window.location.search);
		const location = useLocation();

		useEffect(() => {
			const code = params.get('code');
			console.log(code);
			console.log(location);

			if (code != null) {
				console.log('로그인 후');
				axios
					.get(`${baseUrl}/api/auth/naver/login/token?code=${code}`)
					.then((user) => {
						localStorage.setItem('user', JSON.stringify(user));
						setAuth(user);
						navigate('/');
					})
					.catch((error) => {
						if (error.response.data.email != null) {
							navigate('/signup', {
								state: {
									email: error.response.data.email,
									oauthProvider: 'naver',
								},
							});
						}
					});
			}
		}, []);
	}

	function githubLogin() {
		// const clientID = process.env.GITHUB_CLIENT_ID;
		// const clientSecret = process.env.GITHUB_CLIENT_SECRET;
		const params = new URLSearchParams(window.location.search);
		const location = useLocation();
		// const url = new URL(window.location.href)
		// const authorizationCode = url.searchParams.get('code')
		useEffect(() => {
			const authorizationCode = params.get('code');
			console.log(authorizationCode);
			console.log(location);

			if (authorizationCode != null) {
				console.log('로그인 후');
				const callbackURL = `http://localhost:8080/callback`;
				// const callbackURL = `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`;
				axios
					.post(callbackURL, { authorizationCode })
					// .post(callBackURL)
					// .then((response) => {
					// 	window.sessionStorage.setItem('token', response.data.token);
					// 	navigate('/');
					// })
					.then((response) => {
						localStorage.setItem('user', JSON.stringify(response.data));
						setAuth(response.data);
						navigate('/');
					})
					.catch((error) => {
						alert(error);
						if (error.response.data.email != null) {
							navigate('/signup', {
								state: {
									email: error.response.data.email,
									oauthProvider: 'github',
								},
							});
						}
					});
			}
		}, []);
	}

	function googleLogin() {
		// 사용자는 구글에 로그인 후에 애플리케이션에서 요청하는 권한을 확인 후
		// 서버는 redirect_uri로 access token을 보내줍니다.
		// access token 값은 redirect_uri의 hash 부분에 포함되어 있기 때문에
		// DOM의 Location API를 통해 여럽지 않게 읽을 수 있습니다.
		// 구글 인가 서버의 URL을 만들어야 하는데요. 여러 개의 쿼리 파라미터가 있지만,
		// 필수 파라미터인 client_id, redirect_uri, response_type, scope은 반드시 지정해줘야 합니다.
		const params = new URLSearchParams(window.location.search);
		const location = useLocation();

		useEffect(() => {
			const code = params.get('code');
			console.log(code);
			console.log(location);

			if (code != null) {
				console.log('로그인 후');
				axios
					.get(`${baseUrl}/api/auth/naver/login/token?code=${code}`)
					.then((user) => {
						localStorage.setItem('user', JSON.stringify(user));
						setAuth(user);
						navigate('/');
					})
					.catch((error) => {
						if (error.response.data.email != null) {
							navigate('/signup', {
								state: {
									email: error.response.data.email,
									oauthProvider: 'google',
								},
							});
						}
					});
			}
		}, []);
	}

	return {
		login,
		naverLogin,
		githubLogin,
		googleLogin,
	};
}
