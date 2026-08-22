const openButton = document.getElementById("openRsvpButton");

const closeButton = document.getElementById("closeRsvpButton");

const modal = document.getElementById("rsvpModal");

const form = document.getElementById("rsvpForm");

const messageBox = document.getElementById("responseMessage");

const submitButton = document.getElementById("submitRsvpButton");

 

function resetMessage() {

  messageBox.className = "response-message";

  messageBox.textContent = "";

}

 

function showMessage(message, type) {

  messageBox.textContent = message;

  messageBox.className = `response-message show response-${type}`;

}

 

openButton?.addEventListener("click", () => {

  resetMessage();

  modal.classList.add("show");

  document.getElementById("guestName")?.focus();

});

 

closeButton?.addEventListener("click", () => modal.classList.remove("show"));

modal?.addEventListener("click", event => {

  if (event.target === modal) modal.classList.remove("show");

});

document.addEventListener("keydown", event => {

  if (event.key === "Escape") modal?.classList.remove("show");

});

 

form?.addEventListener("submit", async event => {

  event.preventDefault();

  const attendance = form.querySelector('input[name="Attending"]:checked')?.value;

  if (!attendance) {

    showMessage("Please select Yes or No.", "error");

    return;

  }

 

  submitButton.disabled = true;

  submitButton.textContent = "Submitting...";

 

  const endpointConfigured = !form.action.includes("YOUR_FORM_ID");

 

  try {

    if (endpointConfigured) {

      const response = await fetch(form.action, {

        method: "POST",

        body: new FormData(form),

        headers: { Accept: "application/json" }

      });

      if (!response.ok) throw new Error("Submission failed");

    }

 

    if (attendance === "Yes") {

      showMessage(

        endpointConfigured

          ? "❤️ We are excited to see you on our wedding day!"

          : "❤️ We are excited to see you on our wedding day! Add your Formspree ID to receive this response by email.",

        "success"

      );

    } else {

      showMessage(

        endpointConfigured

          ? "😔 We wish you could attend our wedding. Your blessings mean a lot to us."

          : "😔 We wish you could attend our wedding. Add your Formspree ID to receive this response by email.",

        "decline"

      );

    }

    form.reset();

  } catch (error) {

    showMessage("Unable to submit your response. Please check the form endpoint and internet connection.", "error");

  } finally {

    submitButton.disabled = false;

    submitButton.textContent = "Final Submit";

  }

});