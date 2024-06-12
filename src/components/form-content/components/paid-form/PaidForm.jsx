import React, { useState, forwardRef, useEffect } from "react";
import RadioButtonCard from "../utils/RadioButtonCard/RadioButtonCard";
import {
  PaymentsOutlined,
  PaidOutlined,
  StoreOutlined,
  BackupTableOutlined,
} from "@mui/icons-material/";
import "./PaidForm.css";
import FormHeader from "../utils/FormHeader/FormHeader";

const PaidForm = forwardRef(({ number, isVisible, onReset }, ref) => {
  const [selectedValue, setSelectedValue] = useState("Efectivo");

  const handleRadioChange = (title) => {
    setSelectedValue(title);
  };

  const resetForm = () => {
    setSelectedValue("Efectivo")
    onReset();
  };

  useEffect(() => {
    if (ref) {
      ref.current = {
        resetForm: resetForm,
      };
    }
  }, [ref, resetForm]);

  return (
    <div className="paid-form" id="pd-form">
      <FormHeader title="Pago" name={number} />
      {isVisible && (
        <div className="radio-group">
          <RadioButtonCard
            title="Efectivo"
            value="Efectivo"
            checked={selectedValue === "Efectivo"}
            onChange={handleRadioChange}
          >
            <PaymentsOutlined className="form-check" />
          </RadioButtonCard>

          <RadioButtonCard
            title="PSE"
            value="PSE"
            checked={selectedValue === "PSE"}
            onChange={handleRadioChange}
          >
            <PaidOutlined className="form-check" />
          </RadioButtonCard>
          <RadioButtonCard
            title="Corresponsal bancario"
            value="Corresponsal bancario"
            checked={selectedValue === "Corresponsal bancario"}
            onChange={handleRadioChange}
          >
            <StoreOutlined className="form-check" />
          </RadioButtonCard>
          <RadioButtonCard
            title="Datáfono"
            value="Datáfono"
            checked={selectedValue === "Datáfono"}
            onChange={handleRadioChange}
          >
            <BackupTableOutlined className="form-check" />
          </RadioButtonCard>
        </div>
      )}
    </div>
  );
})

export default PaidForm;
