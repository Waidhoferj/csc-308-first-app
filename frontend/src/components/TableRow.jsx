/**@jsxImportSource @emotion/react*/
import { css } from "@emotion/react";
import { useContext } from "react";
import { TableContext } from "./Table";

const rowCss = css`
  &:first-child {
    border-top: none;
  }

  &:nth-child(odd) {
    background: #2d2e4a;
  }
  border-top: 1px solid #6f7092;
  padding: 20px;
`;

const colCss = css`
  padding: 10px 10px;
  text-align: left;
`;

const deleteButtonCss = css`
  background: red;
`;

export default function TableRow({ entry }) {
  const { onDelete, fields } = useContext(TableContext);
  return (
    <tr css={rowCss}>
      {fields.map((field) => (
        <td key={field} css={colCss}>
          {entry[field.toLowerCase()]}
        </td>
      ))}
      <td>
        <button css={deleteButtonCss} onClick={() => onDelete(entry.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
