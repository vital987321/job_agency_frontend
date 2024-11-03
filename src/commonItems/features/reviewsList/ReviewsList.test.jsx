import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ReviewsList } from "./ReviewsList";
import {
  it,
  expect,
  describe,
  beforeAll,
  afterAll,
  vi,
  afterEach,
} from "vitest";
import { db } from "../../../test/mocks/db";
import { LIST_REVIEWS_REQUEST_URL } from "../../../data/constants";
import { delay, http, HttpResponse } from "msw";
import { AuthProvider } from "../../../context/AuthProvider";
import { useAuth } from "../../../hooks/useAuth";
import userEvent from "@testing-library/user-event";
import { server } from "../../../test/mocks/server";

describe("ReviewsList", () => {
  let allRevies = [];
  const allUsers = [];
  let userDb;
  beforeAll(() => {
    userDb = db.user.create();
    allUsers.push(userDb);
    const review = db.review.create({
      user: userDb.id,
      first_name: userDb.first_name,
      last_name: userDb.last_name,
    });
    allRevies.push(review);
  });
  afterEach(vi.resetAllMocks);
  afterAll(() => {
    const reviewIds = allRevies.map((review) => review.id);
    db.review.deleteMany({ where: { id: { in: reviewIds } } });
    const userIds = allUsers.map((user) => user.id);
    db.user.deleteMany({ where: { id: { in: userIds } } });
  });

  vi.mock("../../../hooks/useAuth");

  const setReviewsResponseData = vi.fn();
  const validProps = {
    listReviewsRequestUrl: LIST_REVIEWS_REQUEST_URL,
    setReviewsResponseData,
    updateDataState: undefined,
  };

  const renderComponent = (props, authData) => {
    if (!authData) {
      // default user
      authData = {
        auth: {
          user_id: userDb.id,
          role: userDb.role,
          username: userDb.userName,
          userAvatarUrl: userDb.avatar,
        },
      };
    }

    vi.mocked(useAuth).mockReturnValue(authData);
    render(
      <AuthProvider>
        <ReviewsList {...props} />
      </AuthProvider>
    );
  };

  it("should render review from DB", async () => {
    renderComponent(validProps);
    const userName = await screen.findByText(allRevies[0].first_name);
    expect(userName).toBeInTheDocument();
    const reviewComment = screen.getByText(allRevies[0].comment);
    expect(reviewComment).toBeInTheDocument();
  });
  it("should call setReviewsResponseData ", async () => {
    renderComponent(validProps);
    await screen.findByText(allRevies[0].first_name);
    expect(setReviewsResponseData).toHaveBeenCalledOnce();
  });
  it("should render 'delete' button on user's comment", async () => {
    renderComponent(validProps);
    const deleteButton = await screen.findByTitle(/delete/i);
    expect(deleteButton).toBeInTheDocument();
  });
  it("should not render 'delete' button if user is not authorized", async () => {
    const notAuthenticatedUser = { auth: {} };
    renderComponent(validProps, notAuthenticatedUser);
    await screen.findByText(allRevies[0].first_name);
    const deleteButton = screen.queryByTitle(/delete/i);
    expect(deleteButton).not.toBeInTheDocument();
  });
  it("should not render 'delete' button if authorized user is not an author", async () => {
    const notAuthor = {
      auth: {
        user_id: userDb.id + 1,
        role: userDb.role,
        username: userDb.userName,
        userAvatarUrl: userDb.avatar,
      },
    };
    renderComponent(validProps, notAuthor);
    await screen.findByText(allRevies[0].first_name);
    const deleteButton = screen.queryByTitle(/delete/i);
    expect(deleteButton).not.toBeInTheDocument();
  });
  it("should render 'delete' button if user is 'staff'", async () => {
    const notAuthorStaff = {
      auth: {
        user_id: userDb.id + 1,
        role: "2250",
        username: userDb.userName,
        userAvatarUrl: userDb.avatar,
      },
    };
    renderComponent(validProps, notAuthorStaff);
    await screen.findByText(allRevies[0].first_name);
    const deleteButton = screen.queryByTitle(/delete/i);
    expect(deleteButton).toBeInTheDocument();
  });
  it('should send delete request on "delete" button click', async () => {
    server.use(
      http.delete(LIST_REVIEWS_REQUEST_URL + ":id", ({ params }) => {
        const { id } = params;
        db.review.deleteMany({ where: { id: { equals: parseInt(id) } } });
        allRevies = allRevies.filter((review) => review.id !== parseInt(id));
        const data = {
          data: "",
          status: 204,
        };
        return HttpResponse.json(data);
      })
    );
    renderComponent(validProps);
    const deleteButton = await screen.findByTitle(/delete/i);
    expect(deleteButton).toBeInTheDocument();
    const user = userEvent.setup();
    user.click(deleteButton);
    await waitForElementToBeRemoved(deleteButton);
  });
});
