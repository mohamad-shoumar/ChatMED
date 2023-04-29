import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import styles from "../../styles/Vitals/Vitals.module.scss";
import { Button } from "primereact/button";
import "../../Prime-theme/theme.css";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { API } from "../../API/API";
import { base_url } from "../../API/API";

interface log {
  id: string | null;
  value?: number;
  systolic?: number;
  diastolic?: number;
  Date: Date | string;
}

const Vitals = () => {
  let emptylog = {
    id: null,
    value: 0,
    systolic: 0,
    diastolic: 0,
    Date: "",
  };

  const [logs, setlogs] = useState<log[] | null>(null);
  const [logDialog, setlogDialog] = useState<boolean>(false);
  const [deletelogDialog, setDeletelogDialog] = useState<boolean>(false);
  const [deletelogsDialog, setDeletelogsDialog] = useState<boolean>(false);
  const [log, setlog] = useState<log>(emptylog);
  const [selectedlogs, setSelectedlogs] = useState<log[] | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const toast = useRef<Toast>(null);
  const [sys, setSys] = useState<number | null | undefined>(20);
  const [dais, setDais] = useState<number | null | undefined>(20);
  const [sugar, setSugar] = useState<number | null | undefined>(20);
  // left toolbar template
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          // onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          // onClick={confirmDeleteSelected}
          // disabled={!selectedProducts || !selectedProducts.length}
        />
      </div>
    );
  };
  // export csv

  // right toolbar template
  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  return (
    <>
      <div className={styles.global}>
        <NavBar />
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.sideBar}>
          <SideNavBar />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.headerContainer}>
            <h2>Vitals</h2>
            <div className={styles.headerButtons}>
              <Button label="Submit" size="small" />
            </div>
          </div>
          <div className={styles.mainContent}>
            <div className={styles.inputsContainer}>
              <div className={styles.pressureInput}>
                <div className={styles.pressureVertical}>
                  <h6>Enter BloodPressure</h6>
                  <div className={styles.pressureHorizantal}>
                    <div>
                      <label htmlFor="mmHg" className="font-bold block mb-2">
                        Systolic Pressure
                      </label>
                      <InputNumber
                        inputId="mmHg"
                        value={sys}
                        onValueChange={(e: InputNumberValueChangeEvent) =>
                          setSys(e.value)
                        }
                        suffix=" mmHg"
                      />
                    </div>
                    <div>
                      <label htmlFor="mmHg" className="font-bold block mb-2">
                        Daistolic Pressure
                      </label>
                      <InputNumber
                        inputId="mmHg"
                        value={dais}
                        onValueChange={(e: InputNumberValueChangeEvent) =>
                          setDais(e.value)
                        }
                        suffix=" mmHg"
                      />
                    </div>
                    <Button
                      label="Submit"
                      size="small"
                      className="mt-5 mb-4 "
                    />
                  </div>
                </div>
              </div>
              <div className={styles.pressureInput}>
                <div className={styles.pressureVertical}>
                  <h6>Enter Blood Glucose</h6>
                  <div className={styles.pressureHorizantal}>
                    <div>
                      <label htmlFor="mg/dL" className="font-bold block mb-2 ">
                        Glucose Level
                      </label>
                      <InputNumber
                        inputId="mg/dL"
                        value={sugar}
                        onValueChange={(e: InputNumberValueChangeEvent) =>
                          setSugar(e.value)
                        }
                        suffix=" mg/dL"
                      />
                    </div>
                    <Button
                      label="Submit"
                      size="small"
                      className="mt-5 mb-4 "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.logsContainer}>
              <div className={styles.sugarLogs}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Expedita, fugit. Earum dolorem dignissimos sint inventore fuga
                quo, ipsum iste cum vitae debitis. Quaerat amet, tempora
                voluptas quos ad sequi corrupti!
              </div>
              <div className={styles.pressureLogs}>
                <Toast ref={toast} />
                <div className="card">
                  <Toolbar
                    className="mb-4"
                    left={leftToolbarTemplate}
                    right={rightToolbarTemplate}
                  ></Toolbar>

                  <DataTable
                    ref={dt}
                    value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter}
                    header={header}
                  >
                    <Column
                      selectionMode="multiple"
                      exportable={false}
                    ></Column>
                    <Column
                      field="code"
                      header="Code"
                      sortable
                      style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                      field="name"
                      header="Name"
                      sortable
                      style={{ minWidth: "16rem" }}
                    ></Column>
                    <Column
                      field="image"
                      header="Image"
                      body={imageBodyTemplate}
                    ></Column>
                    <Column
                      field="price"
                      header="Price"
                      body={priceBodyTemplate}
                      sortable
                      style={{ minWidth: "8rem" }}
                    ></Column>
                    <Column
                      field="category"
                      header="Category"
                      sortable
                      style={{ minWidth: "10rem" }}
                    ></Column>
                    <Column
                      field="rating"
                      header="Reviews"
                      body={ratingBodyTemplate}
                      sortable
                      style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                      field="inventoryStatus"
                      header="Status"
                      body={statusBodyTemplate}
                      sortable
                      style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                      body={actionBodyTemplate}
                      exportable={false}
                      style={{ minWidth: "12rem" }}
                    ></Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vitals;
