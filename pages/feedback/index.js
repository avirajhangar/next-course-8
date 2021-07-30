import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { Fragment, useState } from "react";
function FeedbackPage(props) {
  const [fb, setfb] = useState();
  const { feedbacks } = props;

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`).then((response) =>
      response.json().then((data) => {
        setfb(data.feedback);
      })
    );
  }

  return (
    <Fragment>
      {fb && <p>{fb.email}</p>}
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            {feedback.feedback}
            <button onClick={loadFeedbackHandler.bind(null, feedback.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return { props: { feedbacks: data } };
}

export default FeedbackPage;
