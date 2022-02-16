import { useSession } from "next-auth/react";
import React from "react";
import { Loading, SignIn } from "../components";

function withAuth<IProps>(WrappedComponent: React.FC<IProps>): React.FC<IProps>{
  return (props) => {
    const session = useSession();

    if (session.status === "loading") {
      return <Loading />
    }

    if (session.status === "unauthenticated") {
      return <SignIn />
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth;