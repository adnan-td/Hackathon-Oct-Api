import axios from "axios";
import { useState, createContext } from "react";
import { hostname } from "../../config/hostname";

export const RequestContext = createContext({ method: null, link: null });

export const RequestSetContext = ({ children }) => {
  const [method, setMethod] = useState("GET");
  const [link, setLink] = useState(hostname);
  const [data, setData] = useState("");
  const [result, setResult] = useState("");
  const [showAv, setShowAv] = useState(true);

  const handleSubmit = async () => {
    const res = await axios({
      url: link,
      method: method,
      data: data ? data : null,
    });
    setShowAv(false);
    setResult(res.data);
  };

  const value = {
    method,
    setMethod,
    link,
    setLink,
    data,
    setData,
    result,
    handleSubmit,
    showAv,
    setShowAv,
  };
  return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>;
};
