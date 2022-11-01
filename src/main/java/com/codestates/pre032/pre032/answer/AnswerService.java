package com.codestates.pre032.pre032.answer;

import com.codestates.pre032.pre032.exception.DataNotFoundException;
import com.codestates.pre032.pre032.question.Question;
import com.codestates.pre032.pre032.question.QuestionService;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    private final QuestionService questionService;

    public AnswerService(AnswerRepository answerRepository, QuestionService questionService) {
        this.answerRepository = answerRepository;
        this.questionService = questionService;
    }

    public Answer create(Long id, Answer answer){
        Question question = questionService.find(id);
        question.setAnswerCount(question.getAnswerCount()+1);
        question.setAnswered(true);
        answer.setQuestion(question);
        answer.setAccepted(false);
        answer.setScore(0);

        return answerRepository.save(answer);
    }

    public Answer update(Long answerId, Answer answer){
        Answer findAnswer = findVerifiedAnswer(answerId);
        findAnswer.setAnswerContent(answer.getAnswerContent());
        findAnswer.setModifiedAt(LocalDateTime.now());
        return answerRepository.save(findAnswer);
    }

    public Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        if(optionalAnswer.isPresent()){
            return optionalAnswer.get();
        } else{
            throw new DataNotFoundException("question not found");
        }

    }

    public void delete(Long answerId){
        Answer answer = findVerifiedAnswer(answerId);
        Question question = answer.getQuestion();
        question.setAnswerCount(answer.getQuestion().getAnswerCount()-1);
        if (question.getAnswerCount()==0){
            question.setAnswered(false);
        }
        answerRepository.delete(answer);
    }

    //답변 채택
    public Answer get(long answerId) {
        Answer answer = findVerifiedAnswer(answerId);
        if(answer.isAccepted() == false){
            answer.setAccepted(true);
        }
        else{
            answer.setAccepted(false);
        }
        return answerRepository.save(answer);
    }
}
