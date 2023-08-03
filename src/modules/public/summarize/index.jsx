import { Button, Form, Input, Radio, Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { ButtonComponent } from "../../../components";
import {
  getSummaryRequest,
  storeSummarry,
  storeTopicName,
} from "../../../redux/slicers/general";
import { Images } from "../../../theme";
import "./styles.scss";
import { toastAlert } from "../../../services/utils";
import { ALERT_TYPES } from "../../../constants";

const Summarize = () => {
  const [summarizeForm] = Form.useForm();
  const [selectedLang, setSelectedlang] = useState("eng_summary");
  const [isLoading, setLoading] = useState(false);
  const [isQuizView, setQuizView] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const summarizedData = useSelector((state) => state.general.data);
  const topicName = useSelector((state) => state.general.topicName);
  const dispatch = useDispatch();
  const { form } = Form.useForm();

  const handleSubmit = () => {
    setLoading(true);
    const values = summarizeForm.getFieldsValue();
    var FinalURL = `http://127.0.0.1:5000/api/?video_url=${values.url}`;
    fetch(FinalURL)
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "res");
        dispatch(storeSummarry(result?.data?.result));
        setQuizData(result?.data?.quiz_questions);
        setLoading(false);
      });
  };

  function intersection(arr1, arr2) {
    const result = [];

    const minLength = Math.min(arr1.length, arr2.length);
    for (let i = 0; i < minLength; i++) {
      if (arr1[i] === arr2[i]) {
        result.push(arr1[i]);
      }
    }

    return result;
  }

  const handleQuizSubmit = (values) => {
    console.log(values);
    let score = 0;
    const valuesArray = Object.values(values);
    const answers = quizData?.map((item) => item?.answer);

    const correct = intersection(valuesArray, answers);

    toastAlert(`Your score was ${correct?.length}/5`, ALERT_TYPES.success);
    setQuizView(false);
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
              <div className="ref-wrapper">
                <a
                  href={`https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${summarizedData?.topic}`}
                  target={"_blank"}
                >
                  References
                </a>
                <ButtonComponent
                  text="Generate Quiz"
                  onClick={() => setQuizView(true)}
                />
              </div>
            </div>
          )
        )}
        {isQuizView && (
          <Form form={form} className="quiz-form" onFinish={handleQuizSubmit}>
            <h1>Quiz</h1>
            {quizData?.map((item, index) => (
              <div className="quiz-item">
                <h3>
                  Q{item?.id} {item?.question}
                </h3>
                <Form.Item
                  name={`${item?.id}`}
                  rules={[
                    {
                      required: true,
                      message: "Please select an answer.",
                    },
                  ]}
                >
                  <Radio.Group value={null}>
                    <Radio value={"A"}>True</Radio>
                    <Radio value={"B"}>False</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            ))}
            <Form.Item>
              <ButtonComponent text="Submit" />
            </Form.Item>
          </Form>
        )}
      </span>
    </section>
  );
};

export default Summarize;
