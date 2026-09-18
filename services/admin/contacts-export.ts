export function contactsCsv(rows: {firstName:string;lastName:string;email:string}[]) {
  const cell = (value:string) => {
    // Spreadsheet applications can execute formulas even inside quoted CSV cells.
    const safe = /^[\s\u0000-\u001f]*[=+@-]/.test(value) ? "'"+value : value;
    return '"'+safe.replaceAll('"','""')+'"';
  };
  return '\uFEFF'+[['First name','Last name','Email'],...rows.map(row=>[row.firstName,row.lastName,row.email])].map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
}
export function downloadContactsCsv(kind:string,rows: {firstName:string;lastName:string;email:string}[]) {
  const url=URL.createObjectURL(new Blob([contactsCsv(rows)],{type:'text/csv;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download=`sagi-${kind}-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
