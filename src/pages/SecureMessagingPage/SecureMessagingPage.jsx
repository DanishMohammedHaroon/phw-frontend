import React from "react";
import { useAuth } from "../../context/AuthContext";
import PhysioMessaging from "../../components/PhysioMessaging/PhysioMessaging";
import ClientMessaging from "../../components/ClientMessaging/ClientMessaging";

const SecureMessagingPage = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return user.role === "physio_therapist" ? (
    <PhysioMessaging />
  ) : (
    <ClientMessaging />
  );
};

export default SecureMessagingPage;
