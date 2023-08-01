import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  getSummaryRequest,
  storeSummarry,
  storeTopicName,
} from "../../../redux/slicers/general";
import { Images } from "../../../theme";
import "./styles.scss";

const Summarize = () => {
  const [summarizeForm] = Form.useForm();
  const [selectedLang, setSelectedlang] = useState("eng_summary");
  const [isLoading, setLoading] = useState(false);
  const summarizedData = useSelector((state) => state.general.data);
  const topicName = useSelector((state) => state.general.topicName);
  const dispatch = useDispatch();
  const [quizQuestions, setQuizQuestions] = useState([]);

  const handleSubmit = () => {
    setLoading(true);
    const values = summarizeForm.getFieldsValue();
    var FinalURL = `http://127.0.0.1:5000/api/?video_url=${values.url}`;
    fetch(FinalURL)
      .then((res) => res.json())
      .then((result) => {
        dispatch(storeSummarry(result?.data?.result));
        setLoading(false);
      });
  };

  const handleGenerateQuiz = () => {
    setLoading(true);
    const values = summarizeForm.getFieldsValue();
    var FinalURL = `http://127.0.0.1:5000/api/?video_url=${values.url}`;
    fetch(FinalURL)
      .then((res) => res.json())
      .then((result) => {
        dispatch(storeSummarry(result?.data?.result));
        setQuizQuestions(result?.data?.quiz_questions || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(summarizedData);
  }, [summarizedData]);

  const handleChange = (value) => {
    setSelectedlang(value);
  };

  return (
    <section
      className="summarize-wrapper"
      style={{ backgroundImage: `url(${Images.HomeBG}) ` }}
    >
      <span className="summarize-content">
        <h3>Summarize Your Video</h3>
        <Form
          form={summarizeForm}
          className="summarize-form"
          onFinish={handleSubmit}
        >
          <Form.Item name={"url"} className="summarize-input">
            <Input placeholder="Enter Video URL" autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="summarize-btn">
              Summarize
            </Button>
            <Button
              type="primary"
              onClick={handleGenerateQuiz}
              className="quiz-btn"
            >
              Generate Quiz
            </Button>
          </Form.Item>
        </Form>
        {isLoading ? (
          <BeatLoader size={20} color="#fff" />
        ) : (
          summarizedData && (
            <div className="summarized-data">
              <div className="topic-wrapper">
                <p
                  className="topic-name"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  <b>Topic:</b>{" "}
                  {selectedLang === "eng_summary"
                    ? summarizedData?.topic
                    : summarizedData?.urdu_topic}
                </p>
                <Select
                  options={[
                    {
                      value: "eng_summary",
                      label: "English",
                    },
                    { value: "urdu_summary", label: "Urdu" },
                  ]}
                  defaultValue="eng_summary"
                  onChange={handleChange}
                />
              </div>

              <p className="summary">
                {selectedLang === "eng_summary"
                  ? summarizedData?.eng_summary
                  : summarizedData?.urdu_summary}
              </p>
              <a
                href={`https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${summarizedData?.topic}`}
                target={"_blank"}
              >
                References
              </a>
            </div>
          )
        )}
        {quizQuestions.length > 0 && (
          <div className="quiz-questions">
            <h3>Quiz Questions</h3>
            {quizQuestions.map((question, index) => (
              <div key={index}>
                <p>{question.statement}</p>
                <p>Answer: {question.answer ? "True" : "False"}</p>
              </div>
            ))}
          </div>
        )}
      </span>
    </section>
  );
};

export default Summarize;
