import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import LogIn from "../../components/LogIn/LogIn";

describe("Login component", () => {
  test("renders email and password input fields", () => {
    const { getByPlaceholderText } = render(<LogIn />);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("submits the LogIn form with valid email and password", async () => {
    const { getByPlaceholderText, getByText } = render(<LogIn />);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByText("Sign In");
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeTruthy();
      expect(true).toBeTruthy();
    });
  });
});
