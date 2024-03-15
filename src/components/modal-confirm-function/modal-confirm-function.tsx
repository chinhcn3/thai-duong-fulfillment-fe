import { Button, ButtonProps, Modal, ModalFuncProps } from "antd";

export const ModalConfirmFunc = (
  props: {
    titleBtn: string;
    onOkAction?: () => void;
    onCancelAction?: () => void;
    disabled?: boolean;
    btnProps?: ButtonProps;
  } & ModalFuncProps
) => {
  const {
    title,
    content,
    okType,
    okText,
    cancelText,
    onOkAction,
    onCancelAction,
    titleBtn,
  } = props;
  const showConfirm = () => {
    Modal.confirm({
      title: title,
      content: content,
      okText: okText,
      okType: okType,
      cancelText: cancelText,
      onOk() {
        onOkAction && onOkAction();
      },
      onCancel() {
        onCancelAction && onCancelAction();
      },
    });
  };

  return (
    <Button {...props.btnProps} onClick={showConfirm} disabled={props.disabled}>
      {titleBtn}
    </Button>
  );
};
