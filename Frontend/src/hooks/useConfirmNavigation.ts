import { useNavigate } from "react-router";

const useConfirmNavigation = (hasUnsavedChanges: boolean) => {
    const navigate = useNavigate();
  
    const handleNavigate = (path: string) => {
      if (hasUnsavedChanges) {
        const confirmNavigation = window.confirm(
          "You have unsaved changes. Are you sure you want to navigate away?"
        );
  
        if (!confirmNavigation) {
          return;
        }
      }
  
      navigate(path);
    };
  
    return handleNavigate;
  };
  
  export default useConfirmNavigation;  