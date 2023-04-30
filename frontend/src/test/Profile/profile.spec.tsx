import React from "react";
import { render, screen } from "@testing-library/react";
import DoctorProfile from "../../pages/DoctorPages/DoctorProfile/DoctorProfile";

describe("DoctorProfile", () => {
  it("displays the doctor's name and email", () => {
    render(<DoctorProfile />);
    expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
    expect(screen.getByText("Dr.JohnDoe22@gmail.com")).toBeInTheDocument();
  });

  it("displays a profile picture of the doctor", () => {
    const { container } = render(<DoctorProfile />);
    const imgElement = container.querySelector("img");
    const handleImageError = (
      e: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
      const target = e.currentTarget;
      target.src = "/default-image.png";
    };
    const imgElement = screen.getByAltText("docpic");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toContain("docpic.png");
  });
});
