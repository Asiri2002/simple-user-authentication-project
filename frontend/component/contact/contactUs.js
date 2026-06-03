import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_846ljfd",
        "template_ln36rba",
        form.current,
        { publicKey: "gUVHz6xndGkCa5Aq6" }
      )
      .then(
        () => {
          alert("Message Sent Successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Sending Failed!");
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h1>Contact Us</h1>

      <form
        ref={form}
        onSubmit={sendEmail}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {/* Name */}
        <label>
          Name:
          <input
            type="text"
            name="user_name"
            placeholder="Enter your name"
            required
            style={{
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        {/* Email */}
        <label>
          Email:
          <input
            type="email"
            name="user_email"
            placeholder="Enter your email"
            required
            style={{
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        {/* Message */}
        <label>
          Message:
          <textarea
            name="message"
            placeholder="Write your message"
            required
            style={{
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              minHeight: "80px",
            }}
          />
        </label>

        {/* Send Button */}
        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactUs;