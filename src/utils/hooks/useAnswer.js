/* eslint-disable */
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import authAtom from '../../_state/auth';

// 프록시 서버 우회하는 성웅님 서버 URL
const BASE_URL =
	'http://cors-anywhere.herokuapp.com/http://ec2-43-201-80-20.ap-northeast-2.compute.amazonaws.com:8080';

export const addAnswerToQuestion = (questionId) => {
	const addAnswer = useMutation((newAnswer) => {
		return axios.post(`${BASE_URL}/answers/${questionId}/add`, newAnswer);
	});

	return addAnswer;
};

export const deleteAnswerById = (answerId) => {
	const deleteAnswer = useMutation((accessToken) => {
		return axios.delete(`${BASE_URL}/answers/${answerId}/delete`, {
			data: accessToken,
		});
	});

	return deleteAnswer;
};

export const editAnswerById = (answerId) => {
	const editAnswer = useMutation((editedAnswer) => {
		return axios.patch(`${BASE_URL}/answers/${answerId}/edit`, editedAnswer);
	});

	return editAnswer;
};

export const upAnswerVoteById = (answerId) => {
	const upAnswerVote = useMutation(() => {
		return axios.post(`${BASE_URL}/answers/${answerId}/upvote`, {});
	});

	return upAnswerVote;
};

export const downAnswerVoteById = (answerId) => {
	const downAnswerVote = useMutation(() => {
		return axios.post(`${BASE_URL}/answers/${answerId}/downvote`);
	});

	return downAnswerVote;
};

export const acceptAnswerById = (answerId) => {
	const acceptAnswer = useMutation(() => {
		return axios.patch(`${BASE_URL}/answers/${answerId}/accept`);
	});

	return acceptAnswer;
};

export const undoAcceptAnswerById = (answerId) => {
	const undoAcceptAnswer = useMutation(() => {
		return axios.patch(`${BASE_URL}/answers/${answerId}/accept/undo`);
	});

	return undoAcceptAnswer;
};

export const getCurrentUser = () => {
	const currentUser = useQuery(['user'], () => {
		const auth = useRecoilValue(authAtom);
		return axios.get(`${BASE_URL}/users/myPage`, {
			headers: {
				accessToken: auth,
			},
		});
	});

	return currentUser.data;
};
