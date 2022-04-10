import { useFiles } from 'Providers';

export function Files() {
  const files = useFiles();

  return (<div>
    {files.map((file: any) =>
      <div>
        {file.name}
        <a href={file.link} target="_blank">Download</a>
      </div>
    )}
  </div>)
}