import ReactDOM from "react-dom";
import classes from "./StatsModal.module.scss";
import { ModalTypes } from "../../types/types";

const Backdrop = (props: { onClose: () => void }) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: ModalTypes) => {
  return (
    <div className={classes.modal}>
      <span className="close-button" onClick={props.onClose}>
        X
      </span>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("stats-modal") as HTMLElement;

export const StatsModal = (props: ModalTypes) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};
