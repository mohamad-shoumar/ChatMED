import React, { useState, useEffect, ReactNode } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { API } from "../../API/API";

import { base_url } from "../../API/API";

import "primeicons/primeicons.css";
/* <DataTable value={products} size={size} tableStyle={{ minWidth: '50rem' }}> */
import { useNavigate } from "react-router-dom";

interface Consultation {
  id: string;
  patient: string;
  doctor: string;
  date: string;
  diagnosis: string;
  treatmentPlan: string;
  symptoms: string;
  status: string;
}
interface Product {
  [x: string]: ReactNode;
  id: string;
  displayName: string;
  description?: string;
  imageUrl?: any;
  status?: any;
  role: any | undefined;
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
  const [consultation, setConsultations] = useState<Consultation[]>([]);
  const token = localStorage.getItem("token");

  console.log("Patients", patients);
  console.log("Consultation", consultations);

  const imageBodyTemplate = (product: Product) => {
    return (
      <img
        src={product.imageUrl}
        alt={product.imageUrl}
        className="w-6rem shadow-2 border-rounded-half"
      />
    );
  };
  const handleRowSelect = (event: any) => {
    const selectedPatient = event.data;
    console.log("selectedPatient", selectedPatient);

    const selectedPatientConsultations = consultations?.filter(
      (consultation) => consultation.patient === selectedPatient._id
    );

    if (
      selectedPatientConsultations &&
      selectedPatientConsultations.length > 0 &&
      selectedPatientConsultations[0].status === "pending"
    ) {
      setSelectedProduct(selectedPatient);
      setVisible(true);
    }
  };

  const consultationBodyTemplate = (patient: Product) => {
    const patientConsultations = consultations?.filter(
      (consultations) => consultations.patient === patient._id
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
      navigate(`/doctorview`);
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
      (consultation) => consultation.patient === patient._id
    );
    console.log("Matching Consultations", matchingConsultations);

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
  // const statusBodyTemplate = (product: Product) => {
  //   console.log("PRoduct", product);
  //   return <Tag value={product.status} severity={getSeverity(product)}></Tag>;
  // };
  const statusBodyTemplate = (rowData: Product) => {
    return (
      <Tag
        value={rowData.consultationStatus}
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };

  console.log("Selected Product", selectedProduct);
  const dialogContent = selectedProduct && (
    <div className="p-grid">
      <div className="p-col-12 p-md-6">
        <div className="card">
          <h5>Symptoms</h5>
          <hr />
          {/* <p>{selectedProduct?.role.consultations[0].symptoms}</p> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque
            expedita beatae a sint minus id odio rerum. Odio tempora quae
            tempore cumque minus libero reprehenderit, nesciunt veritatis eos
            debitis.
          </p>
        </div>
      </div>
      <div className="p-col-12 p-md-6">
        <div className="card">
          <h5>Diagnosis</h5>
          <hr />
          {/* <p>{selectedProduct?.diagnosis}</p> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque
            expedita beatae a sint minus id odio rerum. Odio tempora quae
            tempore cumque minus libero reprehenderit, nesciunt veritatis eos
            debitis.
          </p>
        </div>
      </div>
      <div className="p-col-12 p-md-6">
        <div className="card">
          <h5>Treatment Plan</h5>
          <hr />
          {/* <p>{selectedProduct.treatmentPlan}</p> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque
            expedita beatae a sint minus id odio rerum. Odio tempora quae
            tempore cumque minus libero reprehenderit, nesciunt veritatis eos
            debitis.
          </p>
        </div>
      </div>
    </div>
  );

  console.log("Comeplete Consultation", consultation);
  console.log(mergedData);
  console.log(mergedData?.[0].displayName);
  console.log(mergedData?.[1].displayName);
  console.log("Merged Data", mergedData?.[0]);

  return (
    <div className="card">
      <style>
        {`
        .custom-datatable tbody tr:hover {
          background-color: rgba(1, 184, 226, 0.15)  !important;; 
        }
      `}
      </style>
      <DataTable
        value={mergedData}
        header={header}
        tableStyle={{ minWidth: "60rem" }}
        onRowSelect={handleRowSelect}
        selectionMode="single"
        metaKeySelection={false}
        className="custom-datatable"
      >
        <Column
          header="Image"
          body={(rowData) => (
            <img
              src={rowData.imageUrl}
              alt={rowData.displayName}
              className="w-6rem shadow-2 border-round border-rounded-half"
            />
          )}
        ></Column>

        <Column
          body={(rowData) => {
            console.log("rowwwwjhsdf", rowData);
            const fullName = rowData.displayName.split(" ");
            return fullName;
          }}
          header="First Name"
        ></Column>
        <Column
          body={(rowData) => {
            console.log(rowData);
            const fullName = rowData[0].displayName.split(" ");
            return fullName[fullName.length - 1];
          }}
          header="Last name"
        ></Column>
        <Column
          header="Consultation Status"
          body={(rowData) => statusBodyTemplate(rowData.consultationStatus)}
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

// const dialogContent = (
//   <div className="p-grid">
//     <div className="p-col-12 p-md-6">
//       <div className="card">
//         <h5>Symptoms</h5>
//         <hr />
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
//           suscipit massa auctor lacus sodales faucibus.
//         </p>
//       </div>
//     </div>
//     {editingResponse ? (
//       <div className="p-col-12 p-md-6">
//         <div className="card">
//           <h5>Response</h5>
//           <hr />
//           <textarea
//             value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit massa auctor lacus sodales faucibus."
//             onChange={(e) => {}}
//             className="w-full p-2 border rounded"
//           ></textarea>
//         </div>
//       </div>
//     ) : null}
//   </div>
// );

// const handleRowSelect = async (event: any) => {
//   const selectedPatient = event.data;
//   if (selectedPatient.consultationStatus === "Pending") {
//     try {
//       const responseConsultation = await API.getAPI(
//         `${base_url}response`,
//         token!
//       );
//       console.log("Response consultation", responseConsultation);
//       setConsultation(responseConsultation.response);
//     } catch (error) {
//       console.log(error);
//     }
//     setSelectedProduct(selectedPatient);
//     setVisible(true);
//   }
// };

// const consultationBodyTemplate = (patient: Product) => {
//   const patientConsultations = consultations?.filter(
//     (consultations) => consultations.patient === patient._id
//   );
//   if (patientConsultations && patientConsultations.length > 0) {
//     const latestConsultation = patientConsultations[0];
//     const handleClick = () => {
//       if (latestConsultation.status === "pending") {
//         setSelectedProduct(patient);
//         setVisible(true);
//       }
//     };
//     return (
//       <div onClick={handleClick} style={{ cursor: "pointer" }}>
//         {latestConsultation.status === "pending" ? (
//           <span>Pending</span>
//         ) : (
//           <span>Completed</span>
//         )}
//       </div>
//     );
//   }
//   return null;
// };

// const history = (rowData: {
//   country: {
//     code: any;
//     name:
//       | string
//       | number
//       | boolean
//       | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//       | React.ReactFragment
//       | React.ReactPortal
//       | null
//       | undefined;
//   };
// }) => {
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
