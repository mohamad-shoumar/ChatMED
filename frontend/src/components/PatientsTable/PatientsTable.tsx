import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { ProductService } from "../service/PatientList";
/* <DataTable value={products} size={size} tableStyle={{ minWidth: '50rem' }}> */

// export pdf
// const exportPdf = () => {
//   import('jspdf').then((jsPDF) => {
//       import('jspdf-autotable').then(() => {
//           const doc = new jsPDF.default(0, 0);

//           doc.autoTable(exportColumns, products);
//           doc.save('products.pdf');
//       });
//   });
// };
interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: any;
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

  const getSeverity = (product: Product) => {
    switch (product.inventoryStatus) {
      case "Validated":
        return "success";

      case "Inprogress":
        return "warning";

      case "pending":
        return "danger";

      default:
        return null;
    }
  };
}
