import React, { useState, useEffect, forwardRef } from "react";
import "./SettlementForm.css";
import FormHeader from "../utils/FormHeader/FormHeader";
import {
  Select,
  TextField,
  MenuItem,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
} from "@mui/material";

const documentTypes = [
  "Cédula de ciudadanía",
  "Cédula de extranjería",
  "Pasaporte",
  "Licencia de conducción",
];

const data = {
  ANSV: 7000,
  Recaudo: 1.0591,
  SICOV: 99936,
  RUNT: 15900,
  "Valor servicio": 221943,
  "IVA Servicio": 42169.17,
};

const total = Object.values(data).reduce((a, b) => a + b);

function formatNumber(number) {
  return parseFloat(number).toLocaleString("es-ES", {
    maximumFractionDigits: 4,
  });
}

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SettlementForm = forwardRef(
  ({ continueToPaid, number, isVisible, onReset }, ref) => {
    const [selectedDocument, setSelectedDocument] = useState(documentTypes[0]);
    const [documentNumber, setDocumentNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
      validateForm();
    }, [
      selectedDocument,
      documentNumber,
      firstName,
      lastName,
      address,
      phone,
      email,
    ]);

    const validateForm = () => {
      const isEmailValid = isValidEmail(email);
      const isPhoneNumberValid = isValidPhoneNumber(phone);
      if (
        selectedDocument &&
        documentNumber &&
        firstName &&
        lastName &&
        address &&
        phone &&
        email &&
        isEmailValid &&
        isPhoneNumberValid
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    const resetForm = () => {
      setSelectedDocument(documentTypes[0]);
      setDocumentNumber("");
      setFirstName("");
      setLastName("");
      setAddress("");
      setPhone("");
      setEmail("");
      setIsFormValid(false);
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
      <div className="sf" id="sf-form">
        <FormHeader title="Liquidación" name={number} />
        {isVisible && (
          <div className="sf-content">
            <div className="sf-client-info">
              <p>Información del cliente</p>
              <FormControl variant="filled">
                <InputLabel>Tipo de documento</InputLabel>
                <Select
                  value={selectedDocument}
                  onChange={(e) => setSelectedDocument(e.target.value)}
                >
                  {documentTypes.map((document) => (
                    <MenuItem key={document} value={document}>
                      {document}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                variant="filled"
                label="Número de documento"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
              />
              <TextField
                variant="filled"
                label="Nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                variant="filled"
                label="Apellidos"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                variant="filled"
                label="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                variant="filled"
                label="Teléfono"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!isValidPhoneNumber(phone)}
                helperText={
                  !isValidPhoneNumber(phone)
                    ? "Número de teléfono inválido"
                    : ""
                }
              />
              <TextField
                variant="filled"
                label="Correo"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!isValidEmail(email)}
                helperText={
                  !isValidEmail(email) ? "Correo electrónico inválido" : ""
                }
              />
            </div>
            <div>
              <Card>
                <CardHeader
                  title="Valor de liquidación"
                  className="sf-card-title"
                ></CardHeader>
                <CardContent>
                  <div className="sf-card-info">
                    <div className="sf-info-keys">
                      {Object.keys(data).map((key) => (
                        <p key={key}>{key}</p>
                      ))}
                    </div>
                    <div className="sf-info-values">
                      {Object.values(data).map((value) => (
                        <p key={value}> ${formatNumber(value)}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardActions className="sf-card-action">
                  <span className="sf-total">Total</span>
                  <span className="sf-total-value">${formatNumber(total)}</span>
                </CardActions>
              </Card>
            </div>
            <div></div>
            <div style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                disabled={!isFormValid}
                className="sf-button"
                onClick={continueToPaid}
              >
                Continuar
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default SettlementForm;
