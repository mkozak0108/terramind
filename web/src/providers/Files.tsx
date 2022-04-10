import { createContext, useContext, useEffect, useState } from 'react';

import { FilesService } from 'Services';
import { useAuth } from "./Auth";

export const FilesContext = createContext({} as any);

export function FilesProvider({ children }: any) {
  const [files, setFiles] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    async function fetchFiles() {
      setFiles(await FilesService.getAll());
    }

    if (isLoggedIn) {
      fetchFiles();
    } else {
      setFiles([]);
    }
  }, [isLoggedIn])

  return (
    <FilesContext.Provider
      value={files}
    >
      {children}
    </FilesContext.Provider>
  );
}

export const useFiles = () => useContext(FilesContext);
