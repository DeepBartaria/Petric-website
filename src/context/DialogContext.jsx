import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export function useDialog() {
  return useContext(DialogContext);
}

export function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);

  const showDialog = () => setOpen(true);
  const hideDialog = () => setOpen(false);

  return (
    <DialogContext.Provider value={{ open, showDialog, hideDialog }}>
      {children}
    </DialogContext.Provider>
  );
}