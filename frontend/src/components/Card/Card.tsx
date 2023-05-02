import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";

interface DoctorCardProps {
  doctor: {
    name: string;
    avatar: string;
    price: number;
    specialty: string;
  };
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button size="small" label="Book" icon="pi pi-check" />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title="Title"
        subTitle="Subtitle"
        footer={footer}
        header={header}
        className="md:w-10rem "
      ></Card>
    </div>
  );
}
