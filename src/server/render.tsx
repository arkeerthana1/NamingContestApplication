import ReactDOMServer from "react-dom/server";

import { fetchContest, fetchContests } from "../api-client";

import App from "../components/app";

const serverRender = async (req) => {
  const {contestId}=req.params;
  
  const initalData=contestId?{
    currentContest:await fetchContest(contestId),

  }:{
    contests:await fetchContests(),
  }
  const initialMarkup = ReactDOMServer.renderToString(
    <App initialData={{ initalData }} />,
  );

  return { initialMarkup, initialData:{initalData} };
};

export default serverRender;
