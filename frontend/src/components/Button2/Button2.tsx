import { Button } from "primereact/button";
interface Button2Props {
  onClick?: (e: any) => Promise<void>;
}
const Button2 = ({ onClick }: Button2Props) => {
  return (
    <div>
      <Button
        severity="secondary"
        label="Submit"
        size="small"
        onClick={onClick}
      />
    </div>
  );
};

export default Button2;
