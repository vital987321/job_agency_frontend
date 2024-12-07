import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider } from "./AuthProvider";
import { it, expect, describe, beforeAll, afterAll } from "vitest";
import { db } from "../test/mocks/db";
import { useAuth } from "../hooks/useAuth";

describe("AuthProvider", () => {
  var userDb;
  beforeAll(() => {
    userDb = db.user.create();
    localStorage.clear();
    localStorage.setItem("user_id", userDb.id);
  });
  afterAll(() => {
    db.user.delete(userDb);
    localStorage.clear();
  });

  it("should render username", async () => {
    const MockedComponent = () => {
      const { auth } = useAuth();
      return <p>{auth.username}</p>;
    };

    render(
      <AuthProvider>
        <MockedComponent />
      </AuthProvider>
    );

    const userName = await screen.findByText(userDb.username);
    waitFor(() => expect(userName).toBeInTheDocument());
  });
});
