const chatbox = document.querySelector("#chat_box");
const submitBtn = document.querySelector("#submit_btn");
const chatform = document.querySelector("#chat_form");
const overlay = document.querySelector(".overlay");

function handlesubmit(event) {
  event.preventDefault();
  const prompt = chatbox.value;

  if (prompt != "") {
    chatbox.value = "";

    presentUSER(prompt);
    commenceLoading();

    const formData = new FormData();
    formData.append("prompt", prompt);

    const API_URL = "https://zalphagpt-api.vercel.app/api";

    const response = fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    response.then(async (res) => {
      if (res.ok == true) {
        console.log("successful");
        const result = await res.text();

        presentAI(result);
      } else {
        enableOrDisableBtn();
        console.log("Error!");
      }
    });

    response.catch((error) => {
      console.log("server error!");
    });
  }
}

function enableOrDisableBtn() {
  const prompt = chatbox.value;
  if (prompt != "") {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

chatform.addEventListener("submit", handlesubmit);
chatbox.addEventListener("input", enableOrDisableBtn);

function presentUSER(prompt) {
  const container = document.createElement("div");
  container.classList.add("user_prompt");
  container.textContent = prompt;

  overlay.appendChild(container);
}

function commenceLoading() {
  const container = document.createElement("div");
  container.classList.add("ai_res");

  const loadingContainer = document.createElement("div");

  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");

  loadingContainer.classList.add("loading");

  loadingContainer.appendChild(span1);
  loadingContainer.appendChild(span2);
  loadingContainer.appendChild(span3);

  container.appendChild(loadingContainer);
  overlay.appendChild(container);
}

// Present AI response in the chat
function presentAI(response) {
  const aiResponses = document.getElementsByClassName("ai_res");
  const lastAiResponse = aiResponses[aiResponses.length - 1];

  // Clear out loading animation
  lastAiResponse.innerHTML = "";
  lastAiResponse.innerHTML = response;
}
