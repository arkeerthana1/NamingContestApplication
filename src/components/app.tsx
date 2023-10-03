import Contest from "./contest";
import ContestList from "./contest-list";
import {useState,useEffect} from "react";

const App = ({ initialData }) => {

  const [page,setPage]=useState<"contest"|"contestList">(initialData.currentContest ? "contest" :"contestList",);
  const [currentContestId,setCurrentContestId] = useState<string | undefined>(initialData.currentContest?.id);

  useEffect(()=>{
      window.onpopstate=(event)=>{
        const newPage=event.state?.contestId?"contest":"contestList";
        setPage(newPage);
    
        setCurrentContestId(event.state?.contestId);
      }
  },[]);

  const navigateToContest=(contestId)=>{
    window.history.pushState({contestId},"",`/contest/${contestId}`)
    setPage("contest");
    console.log({contestId});
    setCurrentContestId(contestId)
  };

  const pageContent=()=>{
    switch(page){
        case "contestList":
          return <ContestList initialContests={initialData.contests} onContestClick={navigateToContest}/>;
        case "contest":
          return <Contest id={currentContestId}/>;

    }
  };
  return (
    <div className="container">
     

      {pageContent()}
    </div>
  );
};

export default App;


