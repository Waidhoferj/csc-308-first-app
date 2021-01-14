/**@jsxImportSource @emotion/react*/

import Table from "./components/Table";
import axios from "axios";

import { css } from "@emotion/react";
import { useState, useEffect } from "react";

axios.defaults.baseURL = "http://127.0.0.1:5000/";

const fields = ["Name", "Job", "Id"];

const tableWrapperCss = css`
  padding: 50px;
  border: 2px solid #32324a;
  border-radius: 20px;
  margin: 10px;
  width: min-content;
  text-align: center;
  margin: auto;
  background: #1a1a2b;
`;

const titleCss = css`
  text-align: left;
  margin-bottom: 5px;
  font-weight: 600;
`;

const dividerCss = css`
  border-color: #7c7ea5;
`;

function App() {
  const [people, setPeople] = useState([]);

  function getPeople() {
    axios
      .get("/users")
      .then(({ data }) => setPeople(data.users))
      .catch((err) => console.error(err));
  }

  function addPerson(personData) {
    let payload = {};
    for (let key in personData) {
      payload[key.toLowerCase()] = personData[key];
    }
    axios.post("/users", payload).then((res) => {
      if (res.status !== 201) return;
      const person = res.data;
      const updatedPeople = [...people, person];
      setPeople(updatedPeople);
    });
  }

  function deletePerson(identifier) {
    axios
      .delete(`/user/${identifier}`)
      .then(() => setPeople((p) => p.filter(({ id }) => id !== identifier)));
  }

  useEffect(getPeople, []);

  return (
    <div css={tableWrapperCss}>
      <h1 css={titleCss}>Work Contacts</h1>
      <hr css={dividerCss} />
      <Table
        onAdd={addPerson}
        onDelete={deletePerson}
        fields={fields}
        contents={people}
      />
    </div>
  );
}

export default App;
