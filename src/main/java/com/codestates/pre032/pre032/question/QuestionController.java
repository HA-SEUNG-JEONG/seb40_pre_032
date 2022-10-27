package com.codestates.pre032.pre032.question;

import com.codestates.pre032.pre032.answer.AnswerController;
import com.codestates.pre032.pre032.answer.AnswerDto;
import com.codestates.pre032.pre032.dto.MainResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    private final QuestionMapper questionMapper;

    private final AnswerController answerController;

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper, AnswerController answerController) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
        this.answerController = answerController;
    }

    // 작성 기능
    @PostMapping("/add")
    public ResponseEntity addQuestion(@Validated @RequestBody QuestionDto.Post requestBody) {
        Question question = questionService.create(questionMapper.questionPostDtoToQuestion(requestBody),
                requestBody.getTags());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 수정 기능
    @PatchMapping("/{questionId}/edit")
    public ResponseEntity updateQuestion(@PathVariable("questionId") Long id,
                                         @RequestBody QuestionDto.Patch requestBody) {
        Question question = questionService.update(id, requestBody);

        return new ResponseEntity(HttpStatus.OK);
    }

    // 질문 상세 페이지
    @GetMapping("/{questionId}")
    public ResponseEntity questionDetail(@PathVariable("questionId") Long id) {
        Question question = questionService.getDetail(id);
        QuestionDto.questionContentResponse response = questionMapper.questionToQuestionContentResponseDto(question);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 전체 질문 조회하기
    @GetMapping("/")
    public ResponseEntity allQuestion() {
        List<Question> questions = this.questionService.getQuestions();

        return new ResponseEntity<>(
                new MainResponseDto(questionMapper.questionToQuestionResponseDto(questions)), HttpStatus.OK);
    }

    // Tag 검색 기능
    @GetMapping("/find")
    public ResponseEntity tagQuestion(@RequestParam(value = "tag") String tag) {
        List<Question> questions = questionService.getQuestionsByTag(tag);
        List<QuestionDto.questionResponse> response = this.questionMapper.questionToQuestionResponseDto(questions);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // todo: 검색기능
    // 검색 기능
    @GetMapping("/search")
    public ResponseEntity searchQuestion(@RequestParam(value = "q") String q) {
        List<Question> questions = questionService.search(q);

        List<QuestionDto.questionContentResponse> response = this.questionMapper.questionsToQuestionContentResponsesDto(questions);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 질문 삭제 기능
    // todo: accessToken
    @DeleteMapping("/{id}/delete")
    public ResponseEntity deleteQuestion(@PathVariable Long id,
                                         String accessToken) {
        this.questionService.delete(id, accessToken);

        return new ResponseEntity(HttpStatus.OK);
    }

    // 질문 - 답변기능으로 연동
    @PostMapping("/{id}/answer/add")
    public ResponseEntity addAnswer(@PathVariable Long id,
                          @RequestBody AnswerDto.PostDto requestBody) {
        answerController.postAnswer(id, requestBody);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    // 테스트용 메서드 모든 질문 삭제
    @PostMapping("/deleteAll")
    public ResponseEntity deleteAll() {
        questionService.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
