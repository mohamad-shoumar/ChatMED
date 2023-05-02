import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { Column } from "primereact/column";
// import { ProductService } from './service/ProductService';
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { API } from "../../API/API";
import { base_url } from "../../API/API";
import "../../Prime-theme/theme.css";

interface Log {
  id: any;
  value: number;
  date: Date | null;
  status: string;
  [key: string]: any;
}

export default function BloodSugarTable() {
  const emptyLog = {
    id: null,
    value: 0,
    status: "",
    date: null,
  };
  const [logs, setLogs] = useState<Log[]>([]);
  const [logDialog, setLogDialog] = useState<boolean>(false);
  const [deleteLogDialog, setDeleteLogDialog] = useState<boolean>(false);
  const [deleteLogsDialog, setDeleteLogsDialog] = useState<boolean>(false);
  const [log, setLog] = useState<Log>(emptyLog);
  const [selectedLogs, setSelectedLogs] = useState<Log[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<Log[]>>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const response = API.getAPI(`${base_url}vitals/sugar`, token!);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const openNew = () => {
    setLog(emptyLog);
    setSubmitted(false);
    setLogDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setLogDialog(false);
  };

  const hideDeletelogDialog = () => {
    setDeleteLogDialog(false);
  };

  const hideDeletelogsDialog = () => {
    setDeleteLogsDialog(false);
  };

  const savelog = () => {
    setSubmitted(true);

    if (log.value) {
      let _logs = [...logs];
      let _log = { ...log };

      if (log.id) {
        const index = findIndexById(log.id);

        _logs[index] = _log;
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "log Updated",
          life: 3000,
        });
      } else {
        _log.id = createId();
        _logs.push(_log);
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "log Created",
          life: 3000,
        });
      }

      setLogs(_logs);
      setLogDialog(false);
      setLog(emptyLog);
    }
  };

  const editlog = (log: Log) => {
    setLog({ ...log });
    setLogDialog(true);
  };

  const confirmDeletelog = (log: Log) => {
    setLog(log);
    setDeleteLogDialog(true);
  };

  const deletelog = () => {
    let _logs = logs.filter((val: { id: number | null }) => val.id !== log.id);

    setLogs(_logs);
    setDeleteLogDialog(false);
    setLog(emptyLog);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "log Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id: number) => {
    let index = -1;

    for (let i = 0; i < logs.length; i++) {
      if (logs[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const createId = (): number | string => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteLogsDialog(true);
  };

  const deleteSelectedlogs = () => {
    const _logs = logs.filter((val) => !selectedLogs.includes(val));

    setLogs(_logs);
    setDeleteLogsDialog(false);
    setSelectedLogs([]);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "logs Deleted",
      life: 3000,
    });
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number | Date | string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _log = { ...log };

    _log[`${value}`] = val;

    setLog(_log);
  };

  const onInputNumberChange = (
    e: InputNumberChangeEvent,
    value: number | string
  ) => {
    const val = e.value || 0;
    let _log = { ...log };

    _log[`${value}`] = val;

    setLog(_log);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          color="primary"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedLogs || !selectedLogs.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        severity="secondary"
        onClick={exportCSV}
      />
    );
  };

  const valueBodyTemplate = (rowData: Log) => {
    return <span>{rowData.value}</span>;
  };
  const dateBodyTemplate = (rowData: Log) => {
    if (!rowData.date) return <span></span>;
    const date = new Date(rowData.date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return <span>{`${day}/${month}/${year}`}</span>;
  };

  const statusBodyTemplate = (rowData: Log) => {
    const severity = getSeverity(rowData);
    const label =
      severity === "success"
        ? "Normal"
        : severity === "warning"
        ? "Normal high"
        : "High";
    return <Tag value={`${label}`} severity={severity}></Tag>;
  };

  const actionBodyTemplate = (rowData: Log) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editlog(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeletelog(rowData)}
        />
      </React.Fragment>
    );
  };
  const getSeverity = (log: Log) => {
    if (log.value < 100) {
      return "success";
    } else if (log.value < 200) {
      return "warning";
    } else {
      return "danger";
    }
  };
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Blood Sugar Logs </h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e: any) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const logDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={savelog} />
    </React.Fragment>
  );
  const deletelogDialogFooter = (
    <React.Fragment>
      <Button label="No" outlined onClick={hideDeletelogDialog} />
      <Button label="Yes" severity="danger" onClick={deletelog} />
    </React.Fragment>
  );

  