import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { safeJSONStringify } from "../../../shared/formatting";

const Home = (props: any) => {
  const { userData } = props;
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    setFormData(userData[0]);
  }, [userData]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    router.push({ pathname: '/', query: { body: safeJSONStringify(formData) } }, '/');
  };

  const handleChange = (event: any) => {
    const { target: { name, value } } = event;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const { firstName, lastName } = formData;
  return (
    <div className='main'>
      <span>Home</span>
      <form onSubmit={handleSubmit} id="form">
        <label htmlFor="first">First name:</label>
        <input type="text" id="firstName" name="firstName" value={firstName} onChange={handleChange} />
        <label htmlFor="last">Last name:</label>
        <input type="text" id="lastName" name="lastName" value={lastName} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Home;
