import React , {useEffect , useContext} from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import AdminAddingPage from './components/adminDashboard/index'
import Login from './components/signin/index'
import adminManageHeader from './components/adminDashboard2/index'
import ShowManageAdviceModel from './components/manageAdviceModel/index'
import ShowManageNewsModel from './components/manageNewsModel/index'
import ShowManageAdminModel from './components/manageAdminsModel/index'
import ShowManageUserModel from './components/manageUsersModel/index'
import EditAdvice from './components/editAdviceModel/index'
import EditNews from './components/editNewsModel/index'
import EditAdmin from './components/editAdminModel/index'
import EditUser from './components/editUserModel/index'
import MessengerAdmin from './components/user/messengeradmin/messenger'
import Sidebar from './components/sidebar/index'
import AdminProfile from './components/user/adminprofile/index'
import EditAdminprofile from './components/user/admineditprofile'

/*         user            */
import Homepage from './components/user/homepage'
import UserSidebar from './components/user/usersidebar/index'
import Mainstatistics from './components/user/statistics/main/index'
import MainSortingStatistics from './components/user/sortstatistics/main/index'
import Diagnose from './components/user/diagnose'
import News from './components/user/posts'
import Advices from './components/user/advices'
import ClientLogin from './components/user/clientlogin'
import Signup from './components/user/signup'
import Messenger from './components/user/messenger/messenger'
import SendEmail from './components/user/forgetpassword/sendemail'
import SendVerification from './components/user/forgetpassword/sendvertification'
import ChangePassword from './components/user/forgetpassword/confirmpassword'
import SendEmailAdmin from './components/user/forgetpasswordadmin/sendemail'
import SendVerificationAdmin from './components/user/forgetpasswordadmin/sendvertification'
import ChangePasswordAdmin from './components/user/forgetpasswordadmin/confirmpassword'
import UserProfile from './components/user/userprofile'
import EditUserprofile from './components/user/usereditprofile'
import Addnotificationprocess from './components/user/notification'

/*         protect routes           */
import {  UserContext } from './ContextAPI/User'


const App = () => {

  const { isUser , userType, user } = useContext(UserContext)
  return (
    <div className="App">
    <BrowserRouter>

    {(isUser && userType.admin) && (
    <Sidebar />

    )}

{(isUser && userType.client) && (
    <UserSidebar />

  )}
      <Route exact path="/login/admin" component={Login} />
      <Route exact path="/admin/add" component={AdminAddingPage} />
      <Route exact path="/admin/manage" component={adminManageHeader} />
      <Route exact path="/admin/manage/manageadvices" component={ShowManageAdviceModel} />
      <Route exact path="/admin/manage/managenews" component={ShowManageNewsModel} />
      <Route exact path="/admin/manage/manageadmins" component={ShowManageAdminModel} />
      <Route exact path="/admin/manage/manageusers" component={ShowManageUserModel} />
      <Route exact path="/admin/manage/editadvice/:adviceId" component={EditAdvice} />
      <Route exact path="/admin/manage/editnews/:newsId" component={EditNews} />
      <Route exact path="/admin/manage/editadmin/:adminId" component={EditAdmin} />
      <Route exact path="/admin/manage/edituser/:userId" component={EditUser} />
      <Route exact path="/admin/messenger" component={MessengerAdmin} />
      <Route exact path="/admin/profile/:adminId" component={AdminProfile} />
      <Route exact path="/admin/editprofile/:adminId" component={EditAdminprofile} />

      <Route exact path="/" component={Homepage} />
      <Route exact path="/user/statistics" component={Mainstatistics} />
      <Route exact path="/user/sortstatistics" component={MainSortingStatistics} />
      <Route exact path="/user/diagnose" component={Diagnose} />
      <Route exact path="/user/messenger" component={Messenger} />
      <Route exact path="/user/news" component={News} />
      <Route exact path="/user/advices" component={Advices} />
      <Route exact path="/login/client" component={ClientLogin} />
      <Route exact path="/signup/client" component={Signup} />
      <Route exact path="/forgetpassword/sendemail" component={SendEmail} />
      <Route exact path="/forgetpassword/sendvertification" component={SendVerification} />
      <Route exact path="/forgetpassword/changepassword" component={ChangePassword} />
      <Route exact path="/forgetpassword/admin/sendemail" component={SendEmailAdmin} />
      <Route exact path="/forgetpassword/admin/sendvertification" component={SendVerificationAdmin} />
      <Route exact path="/forgetpassword/admin/changepassword" component={ChangePasswordAdmin} />
      <Route exact path="/user/profile/:userId" component={UserProfile} />
      <Route exact path="/user/editprofile/:userId" component={EditUserprofile} />
      <Route exact path="/not" component={Addnotificationprocess} />
    </BrowserRouter>
    </div>
  );
}

export default App;
