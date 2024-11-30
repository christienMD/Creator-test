/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AuthLocationState {
  showWelcome?: boolean;
  userName?: string;
  registrationSuccess?: boolean;
  loggedOut?: boolean;
}

export const useAuthToast = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const clearAuthState = useCallback(() => {
    const currentState = location.state as AuthLocationState;
    if (currentState) {
      const {
        showWelcome,
        registrationSuccess,
        loggedOut,
        userName,
        ...restState
      } = currentState;

      navigate(location.pathname + location.search, {
        replace: true,
        state: restState,
      });
    }
  }, [location, navigate]);

  const handleAuthToasts = useCallback(() => {
    const state = location.state as AuthLocationState;

    if (state?.showWelcome && state?.userName) {
      toast.success(`Welcome back, ${state.userName}!`);
    }

    if (state?.registrationSuccess) {
      toast.success("Account created successfully! Please log in.");
    }

    if (state?.loggedOut) {
      toast.success("You have been logged out successfully. See you later!");
    }

    // Clear the state after showing toasts
    if (state?.showWelcome || state?.registrationSuccess || state?.loggedOut) {
      clearAuthState();
    }
  }, [location.state, clearAuthState]);

  useEffect(() => {
    handleAuthToasts();
  }, [handleAuthToasts]);
};
