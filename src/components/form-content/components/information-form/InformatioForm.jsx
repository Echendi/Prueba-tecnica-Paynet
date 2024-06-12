import React, { useState, useEffect, forwardRef } from "react";
import "./InformationForm.css";
import FormHeader from "../utils/FormHeader/FormHeader";
import {
  Select,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";

const models = [];

for (let index = 2025; index >= 1980; index--) {
  models.push(index);
}

const carTypes = ["Particular", "Servicio Público"];
const serviceTypes = ["A1", "B1", "C1"];

const InformationForm = forwardRef(({ search, number, onReset }, ref) => {
  const [plate, setPlate] = useState("");
  const [confirmPlate, setConfirmPlate] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedCarType, setSelectedCarType] = useState(carTypes[0]);
  const [selectedServiceType, setSelectedServiceType] = useState(
    serviceTypes[0]
  );
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPlateValid, setIsPlateValid] = useState(false);

  const validatePlate = (plate) => {
    const platePattern = /^[A-Za-z]{3}[0-9]{3}$/;
    return platePattern.test(plate);
  };

  const validateForm = () => {
    const isPlateMatch = plate === confirmPlate;
    const isValidPlate = validatePlate(plate);
    setIsPlateValid(isValidPlate);
    if (
      plate &&
      confirmPlate &&
      isPlateMatch &&
      isValidPlate &&
      selectedModel &&
      selectedCarType &&
      selectedServiceType &&
      paymentMethod
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [
    plate,
    confirmPlate,
    selectedModel,
    selectedCarType,
    selectedServiceType,
    paymentMethod,
  ]);

  const handlePlateChange = (e) => {
    setPlate(e.target.value.toUpperCase());
  };

  const handleConfirmPlateChange = (e) => {
    setConfirmPlate(e.target.value.toUpperCase());
  };

  const resetForm = () => {
    setPlate("");
    setConfirmPlate("");
    setSelectedModel(models[0]);
    setSelectedCarType(carTypes[0]);
    setSelectedServiceType(serviceTypes[0]);
    setPaymentMethod("");
    setIsFormValid(false);
    setIsPlateValid(false);
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
    <div className="if" id="if-form">
      <FormHeader title="Información general" name={number} />

      <div action="" className="form">
        <TextField
          label="Placa"
          variant="filled"
          className="if-cols-span-2"
          value={plate}
          onChange={handlePlateChange}
          error={!isPlateValid}
          helperText={!isPlateValid ? "Formato de placa inválido (AAA123)" : ""}
        />
        <TextField
          label="Confirmación de placa"
          variant="filled"
          className="if-cols-span-2"
          value={confirmPlate}
          onChange={handleConfirmPlateChange}
          error={!!confirmPlate && plate !== confirmPlate}
          helperText={
            !!confirmPlate && plate !== confirmPlate
              ? "Las placas no coinciden"
              : ""
          }
        />

        <FormControl variant="filled" className="if-cols-span-2">
          <InputLabel>Modelo</InputLabel>
          <Select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {models.map((model) => (
              <MenuItem key={model} value={model}>
                Modelo {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" className="if-cols-span-3">
          <InputLabel>Tipo de Carro</InputLabel>
          <Select
            value={selectedCarType}
            onChange={(e) => setSelectedCarType(e.target.value)}
          >
            {carTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" className="if-cols-span-3">
          <InputLabel>Tipo de Servicio</InputLabel>
          <Select
            value={selectedServiceType}
            onChange={(e) => setSelectedServiceType(e.target.value)}
          >
            {serviceTypes.map((service) => (
              <MenuItem key={service} value={service}>
                {service}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="if-cols-span-6">
          <p>Forma de pago</p>
          <RadioGroup
            row
            className="if-radio-group"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="Contado"
              control={<Radio />}
              label="Contado"
            />
            <FormControlLabel
              value="Tío Paco"
              control={<Radio />}
              label="Tío Paco"
            />
          </RadioGroup>
          <Button
            variant="contained"
            disabled={!isFormValid}
            className="if-button"
            onClick={search}
          >
            Consultar
          </Button>
        </div>
      </div>
    </div>
  );
});

export default InformationForm;
