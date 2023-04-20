import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Navbar from "../../components//NavBar/NavBar";

describe("Navbar component", () => {
  it("should render the logo and title", () => {
    const { getByAltText, getByText } = render(<Navbar />);
    const logo = getByAltText("logo");
    const title = getByText("ChatMED");
    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it("should navigate to the notifications page when the bell icon is clicked", () => {
    const { getByAltText } = render(<Navbar />);
    const bellIcon = getByAltText("bell-icon");
    fireEvent.click(bellIcon);
    expect(window.location.pathname).toBe("/notifications");
  });

  it("should navigate to the profile page when the profile icon is clicked", () => {
    const { getByAltText } = render(<Navbar />);
    const profileIcon = getByAltText("profile");
    fireEvent.click(profileIcon);
    expect(window.location.pathname).toBe("/profile");
  });
});
