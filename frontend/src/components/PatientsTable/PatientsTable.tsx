import React, { useState, useEffect, ReactNode } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import "primeicons/primeicons.css";
/* <DataTable value={products} size={size} tableStyle={{ minWidth: '50rem' }}> */
import { useNavigate } from "react-router-dom";

interface Product {
  [x: string]: ReactNode;
  id: string;
  displayName: string;
  description?: string;
  imageUrl?: any;
  status?: any;
}

interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  dignosis: string;
  treatmentPlan: string;
  symptoms: string;
  status: string;
}
interface TableComponentProps {
  patients: Product[] | undefined;
  consultations: Consultation[] | undefined;
}

export default function PatientsTable(props: TableComponentProps) {
  const { patients, consultations } = props;
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visible, setVisible] = useState(false);
  const [editingResponse, setEditingResponse] = useState(false);

  const imageBodyTemplate = (product: Product) => {
    return (
      <img
        src={product.imageUrl}
        alt={product.imageUrl}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  // const statusBodyTemplate = (product: Product) => {
  //   return (
  //     <Tag
  //       value={product.inventoryStatus}
  //       severity={getSeverity(product)}
  //     ></Tag>
  //   );
  // };
  const consultationBodyTemplate = (patient: Product) => {
    const patientConsultations = consultations?.filter(
      (consultations) => consultations.patientId === patient.id
    );
    return (
      <ul>
        {patientConsultations?.map((consultation) => (
          <li key={consultation.id}>{consultation.status}</li>
        ))}
      </ul>
    );
  };
  const historyTemplate = (patient: Product) => {
    const handleClick = () => {
      navigate(`/doctor-view/${patient._id}`);
    };

    return (
      <Button
        icon="pi pi-ellipsis-h"
        onClick={handleClick}
        className="p-button-text"
      />
    );
  };
  const getSeverity = (patient: Product) => {
    switch (patient.status) {
      case "Validated":
        return "success";

      case "pending":
        return "warning";

      default:
        return null;
    }
  };

  const mergedData = patients?.map((patient) => {
    const matchingConsultations = consultations?.filter(
      (consultation) => consultation.patientId === patient.id
    );
    const consultationStatus =
      matchingConsultations!.length > 0 ? "Pending" : "Completed";

    return {
      ...patient,
      consultations: matchingConsultations,
      consultationStatus: consultationStatus,
    };
  });

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">My Patients</span>
      <Button icon="pi pi-refresh" rounded raised />
    </div>
  );
  const handleEditClick = () => {
    setEditingResponse(true);
  };
  const footer = (
    <div className="flex justify-content-between gap-2">
      <div>
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-text p-button-plain"
          onClick={handleEditClick}
        />
        <Button
          label="Chat"
          icon="pi pi-comment"
          className="p-button-text p-button-plain"
        />
      </div>
      <Button label="Submit" icon="pi pi-check" className="p-button-success" />
    </div>
  );
  const statusBodyTemplate = (rowData: Product) => {
    return (
      <Tag
        value={rowData.consultationStatus}
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };
  const dialogContent = (
    <div className="p-grid">
      <div className="p-col-12 p-md-6">
        <div className="card">
          <h5>Symptoms</h5>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            suscipit massa auctor lacus sodales faucibus.
          </p>
        </div>
      </div>
      {editingResponse ? (
        <div className="p-col-12 p-md-6">
          <div className="card">
            <h5>Response</h5>
            <hr />
            <textarea
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit massa auctor lacus sodales faucibus."
              onChange={(e) => {}}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
        </div>
      ) : null}
    </div>
  );
  const handleRowSelect = (event: any) => {
    const selectedPatient = event.data;
    if (selectedPatient.consultationStatus === "Pending") {
      setSelectedProduct(selectedPatient);
      setVisible(true);
    }
  };

  return (
    <div className="card">
      <DataTable
        value={mergedData}
        header={header}
        tableStyle={{ minWidth: "60rem" }}
        onRowSelect={handleRowSelect}
        selectionMode="single"
        metaKeySelection={false}
      >
        <Column
          header="Image"
          body={(rowData) => (
            <img
              src={rowData.imageUrl}
              alt={rowData.displayName}
              className="w-6rem shadow-2 border-round"
            />
          )}
        ></Column>
        <Column
          body={(rowData) => {
            const fullName = rowData.displayName.split(" ");
            return fullName[0];
          }}
          header="First Name"
        ></Column>
        <Column
          body={(rowData) => {
            const fullName = rowData.displayName.split(" ");
            return fullName[fullName.length - 1];
          }}
          header="Last name"
        ></Column>
        <Column
          header="Cosnultation Status"
          body={(rowData) => statusBodyTemplate(rowData)}
        ></Column>
        <Column header="Medical History" body={historyTemplate}></Column>
      </DataTable>
      <Dialog
        header="ChatGPT Response"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        footer={footer}
      >
        {dialogContent}
      </Dialog>
    </div>
  );
}

// const history = (rowData) => {
//   return (
//     <div className="flex align-items-center gap-2">
//       <img
//         alt="flag"
//         src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
//         className={`flag flag-${rowData.country.code}`}
//         style={{ width: "24px" }}
//       />
//       <span>{rowData.country.name}</span>
//     </div>
//   );
// };
