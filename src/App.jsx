import "./App.css";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillLike } from "react-icons/ai";

const App = () => {
  const [details, setDetails] = useState([]);
  const [person, setPerson] = useState({
    firstName: "",
    email: "",
  });
  const [delMessage, setDelMessage] = useState({
    showMessage: false,
    data: null,
  });

  const handleChange = (e) => {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    setDetails((previous) => [...previous, person]);
    setPerson({ firstName: "", email: "" });
  };

  const handleDelete = (index) => {
    const deletedPerson = details[index];
    const newData = [...details];
    newData.splice(index, 1);
    setDetails(newData);
    setDelMessage({
      showMessage: true,
      data: deletedPerson,
    });
  };

  useEffect(() => {
    if (delMessage.showMessage) {
      const timeout = setTimeout(() => {
        setDelMessage({
          showMessage: false,
          data: null,
        });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [delMessage.showMessage]);

  return (
    <>
      <div className="mt-24 p-10 flex flex-col gap-5">
        {delMessage && (
          <div
            className={`py-14 fixed top-0 ${
              delMessage.showMessage ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="items-center flex gap-2">
              <span className="text-indigo-500 inline-block">
                <AiFillLike />
              </span>
              Deleted successfully
              {delMessage.data && <span>{delMessage.data.firstName}</span>}
            </p>
          </div>
        )}
        <div>
          <label htmlFor="firstName">
            Name
            <input
              name="firstName"
              type="text"
              id="firstName"
              className="border border-gray-500 rounded p-1 ms-3"
              value={person.firstName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email
            <input
              name="email"
              type="email"
              id="email"
              className="border border-gray-500 rounded p-1 ms-3"
              placeholder="Enter your email"
              value={person.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          className="p-2 disabled:bg-gray-400 bg-indigo-500
           text-white inline-block w-20 rounded-md ms-16"
          onClick={handleClick}
          disabled={!person.firstName && !person.email}
        >
          Add
        </button>

        <div className="mt-20">
          <h1>Details</h1>
          {details.map((person, index) => (
            <div className="flex flex-col max-w-sm" key={index}>
              <h3 className="mb-2">
                <span>=&gt;</span> {person.firstName}
              </h3>
              <h4 className="mb-2">{person.email}</h4>
              <button
                className="text-4xl ms-auto text-red-300 hover:text-red-600 "
                onClick={handleDelete}
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
