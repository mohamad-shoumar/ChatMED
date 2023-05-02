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


}
