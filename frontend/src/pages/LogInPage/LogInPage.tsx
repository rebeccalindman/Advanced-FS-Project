import { useSelector } from "react-redux";
import LogInForm from "./LogInForm";

const LogInPage = () => {
  const signedIn = useSelector((state: any) => state.auth.signedIn);

  return (
    <main>
      {signedIn ? <p>You are already signed in</p> : <LogInForm />}
    </main>
  );
};

export default LogInPage;
