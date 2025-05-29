type SafeWindowType<T extends Window = Window> = {
  [K in keyof T]?: T[K];
} & {
  numbatWallet?: any; 
  dharitriWallet?: any;
};

export const getIsExtensionAvailable = () => {
  const safeWindow: SafeWindowType =
    typeof window !== 'undefined' ? window : {};

  return (
    Boolean(safeWindow?.numbatWallet) || Boolean(safeWindow?.dharitriWallet)
  );
};
