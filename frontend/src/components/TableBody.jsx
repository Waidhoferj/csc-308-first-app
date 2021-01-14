import TableForm from "./TableForm";
import TableRow from "./TableRow";

export default function TableBody({ contents }) {
  return (
    <tbody>
      {contents.map((row) => (
        <TableRow entry={row} key={row.id} />
      ))}
      <TableForm />
    </tbody>
  );
}
