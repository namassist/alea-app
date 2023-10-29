"use client";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const ButtonSignOut = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/`,
        })
      }
    >
      logout
    </Button>
  );
};

export default ButtonSignOut;
