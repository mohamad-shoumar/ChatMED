import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import "primeicons/primeicons.css";
import { ProductService } from "../service/PatientList";
/* <DataTable value={products} size={size} tableStyle={{ minWidth: '50rem' }}> */

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image?: any;
  inventoryStatus?: any;
}

export default function TemplateDemo() {
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visible, setVisible] = useState(false);
  const [editingResponse, setEditingResponse] = useState(false);

  useEffect(() => {
    ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  const imageBodyTemplate = (product: Product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
        alt={product.image}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const statusBodyTemplate = (product: Product) => {
    return (
      <Tag
        value={product.inventoryStatus}
        severity={getSeverity(product)}
      ></Tag>
    );
  };
  const historyTemplate = (product: Product) => {
    const handleClick = () => {
      // add action here
      console.log("Medical history clicked for:", product.name);
    };

    return (
      <Button
        icon="pi pi-ellipsis-h"
        onClick={handleClick}
        className="p-button-text"
      />
    );
  };
  const getSeverity = (product: Product) => {
    switch (product.inventoryStatus) {
      case "Validated":
        return "success";

      case "pending":
        return "warning";

      default:
        return null;
    }
  };

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
    const selectedProduct = event.data;
    if (selectedProduct && selectedProduct.inventoryStatus === "pending") {
      setSelectedProduct(selectedProduct);
      setVisible(true);
    }
  };
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

  return (
    <div className="card">
      <DataTable
        value={products}
        header={header}
        tableStyle={{ minWidth: "60rem" }}
        onRowSelect={handleRowSelect}
        selectionMode="single"
        metaKeySelection={false}
      >
        <Column header="Image" body={(rowData) => rowData.image}></Column>
        <Column field="First Name" header="First Name"></Column>
        <Column field="Last Name" header="Last name"></Column>
        <Column header="Status" body={statusBodyTemplate}></Column>
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
