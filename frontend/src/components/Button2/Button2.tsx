import { Button } from "primereact/button";
interface Button2Props {
  onClick?: (e: any) => void;
  label?: string;
}
const Button2 = ({ onClick, label }: Button2Props) => {
  return (
    <div>
      <Button
        severity="secondary"
        label={label || "Submit"}
        size="small"
        onClick={onClick}
      />
    </div>
  );
};

export default Button2;
