import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import "./FormContent.css";
import InformationForm from "./components/information-form/InformatioForm";
import SettlementForm from "./components/settlement-form/SettlementForm";
import PaidForm from "./components/paid-form/PaidForm";
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import Swal from "sweetalert2";

export default function FormContent() {
  const form = useRef();
  const informationFormRef = useRef();
  const settlementFormRef = useRef();
  const paidFormRef = useRef();

  const [infoNumber, setInfoNumber] = useState("1");
  const [settlementNumber, setSettlementNumber] = useState("2");
  const [paidNumber, setPaidNumber] = useState("3");

  const [isSfContentVisible, setSfContentVisible] = useState(false);
  const [isPfContentVisible, setPfContentVisible] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    "&:hover": {
      backgroundColor: red[800],
    },
    marginLeft: 20,
  }));

  const BorderButton = styled(Button)(({ theme }) => ({
    color: red[700],
    borderColor: red[700],
    "&:hover": {
      borderColor: red[800],
    },
  }));

  function search() {
    setInfoNumber("");
    setSfContentVisible(true);
  }

  function continueToPaid() {
    setSettlementNumber("");
    setPfContentVisible(true);
    setIsValidForm(true);
  }

  function generate() {
    setPaidNumber("");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Liquidación generada con éxito"
    });
    clearAll();
  }

  function handleCancel() {
    Swal.fire({
      title: "Estás seguro?",
      text: "Se perderá la información registrada!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar!",
      cancelButtonText: "No, continuar con el formulario",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAll();
      }
    });
  }

  function clearAll(){
    setInfoNumber("1");
        setSettlementNumber("2");
        setPaidNumber("3");
        setSfContentVisible(false);
        setPfContentVisible(false);
        setIsValidForm(false);
        form.current.reset();
        informationFormRef.current.resetForm();
        settlementFormRef.current.resetForm();
        paidFormRef.current.resetForm();
  }

  return (
    <form className="form-content" ref={form}>
      <h3 className="form-content-title">Liquidaciones de pines</h3>
      <hr />
      <div className="fc-div">
        <div className="info">
          <InformationForm
            search={search}
            number={infoNumber}
            ref={informationFormRef}
            onReset={() => {}}
          ></InformationForm>
          <SettlementForm
            continueToPaid={continueToPaid}
            number={settlementNumber}
            isVisible={isSfContentVisible}
            ref={settlementFormRef}
            onReset={() => {}}
          ></SettlementForm>
          <PaidForm
            number={paidNumber}
            isVisible={isPfContentVisible}
            ref={paidFormRef}
            onReset={() => {}}
          ></PaidForm>
          <div className="fc-btn">
            <BorderButton
              variant="outlined"
              className="btn-cancel"
              onClick={handleCancel}
            >
              Cancelar
            </BorderButton>
            <ColorButton
              variant="contained"
              className="btn-generate"
              disabled={!isValidForm}
              onClick={generate}
            >
              Generar
            </ColorButton>
          </div>
        </div>
      </div>
    </form>
  );
}
