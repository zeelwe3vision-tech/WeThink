import { Toaster } from "react-hot-toast";
import { toastConfig } from "./toastConfig";

function ToastProvider() {
  return (
    <Toaster
      position={toastConfig.position}
      toastOptions={{
        duration: toastConfig.duration,
        style: toastConfig.style,
        success: toastConfig.success,
        error: toastConfig.error,
      }}
    />
  );
}

export default ToastProvider;