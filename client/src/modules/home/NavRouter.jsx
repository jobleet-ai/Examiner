import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import HomePage from "./HomePage";
import AuthPage from "../auth/AuthPage";

import ExampApp from "@/features/exam/ExamApp";
import TermsPage from "@/features/termsNcondition/TermsPage";
import PrivacyPage from "@/features/termsNcondition/PrivacyPage";


export const SetPopupContext = createContext();

function NavRouter(props) {

  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });


  return (
    <SetPopupContext.Provider value={setPopup}>
      <Routes >
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/admin/feedback" element={<AdminFeedback />} /> */}

        <Route exact path="/login" element={<AuthPage />} />

        {/* <Route exact path="/jobs" element={<JobSearch />} />


        <Route path="/jobs/:slugWithId" element={<JobPage />} />

        <Route path="/book-demo"  element={<BookDemoPage/>} />
        <Route path="/admin/manage-demo"  element={<DemoManagementPage/>} />

        <Route exact path="/profile/settings"  element={<UserProfile/>} />
        <Route exact path="/my-applications"  element={<MyApplications/>} /> */}


  
        <Route exact path="/exam-prep"  element={<ExampApp/>} />

        {/* <Route exact path="/recruiters/me"  element={<RecruiterProfile/>} />
        <Route exact path="/recruiter/posting"  element={<PostJobForm/>} />
        <Route exact path="/recruiter/dashboard"  element={<RecruiterDashboard/>} />
        <Route exact path="/recruiter/tracking"  element={<ApplicantTracking/>} />
        <Route exact path="/recruiter/managequiz"  element={<QuizManagementPage/>} />

        <Route exact path="/recruiter/reports"  element={<RecruitmentReports/>} />

        <Route exact path="/admin/verify-jobs"  element={<AdminVerificationDashboard/>} />

    
        <Route exact path="/skills-prep/dsa"  element={<DSACatalog/>} />

        <Route exact path="/skills-prep/system-design"  element={<SystemDesignCatalog/>} />
        <Route exact path="/prep/courses"  element={<CourseCatalog/>} />
        <Route exact path="/courses/*" element={<CourseTemplate/>} />

        <Route exact path="/prep/practice"  element={<CodePracticeWindow/>} />
        <Route exact path="/prep/interviews"  element={<InterviewPlanDashboard/>} />

        <Route exact path="/prep/dsa/*"  element={<MDViewer parent='prep/dsa'/>} />
        <Route exact path="/design/system-design/*"  element={<MarkDownViewer route='prep/system-design'/>} />
        
        <Route exact path="prep/interviews" element={<InterviewPlanDashboard/>} />

        <Route exact path="/prep/interviews/sde/" element={<SDEInterviewCatalog/>} />
        
        <Route exact path="/interview-prep/:source" element={<InterviewRoundPrepView/>} />



        <Route exact path="/skills-prep/system-design/*"  element={<MarkDownViewer route='skills-prep/system-design'/>} />
        <Route exact path="/skills-prep/dsa/*"  element={<MDViewer parent='skills-prep/dsa'/>} />

        


        <Route exact path="/terms"  element={<TermsPage/>} />
        <Route exact path="/privacy"  element={<PrivacyPage/>} /> */}
        {/* <Route exact path="/contact">
          <ContactUs/>
        </Route>
        <Route exact path="/aboutus">
          <AboutUs/>
        </Route>
        <Route exact path="/privacypolicy">
          <PrivacyPolicy/>
        </Route> 
        <Route exact path="/termsservice">
          <TermsService/>
        </Route> 
        <Route exact path="/careers">
          <Careers/>
        </Route>    */}
      </Routes>
      {/* <MessagePopup
        open={popup.open}
        setOpen={(status) =>
          setPopup({
            ...popup,
            open: status,
          })
        }
        severity={popup.severity}
        message={popup.message}
      /> */}
    </SetPopupContext.Provider>
  );
}

export default NavRouter;
