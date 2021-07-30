import { useState, useRef } from "react";

function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  function submitForm(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;

    const reqBody = {
      email: email,
      text: feedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbacks() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data.feedbacks));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea
            type="text"
            id="feedback"
            rows="5"
            ref={feedbackRef}
          ></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbacks}>Load feedbacks</button>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>{feedback.feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
