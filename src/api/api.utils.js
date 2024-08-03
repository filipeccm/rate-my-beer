const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/v1"
    : "https://rate-my-beer-backend.onrender.com/v1";

//beers
export const fetchBeers = async () => {
  try {
    const res = await fetch(url + "/beers");
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchOneBeer = async (beerId) => {
  try {
    const res = await fetch(url + "/beers/" + beerId);
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
};

export const createBeer = async (data, currentUser) => {
  if (!currentUser) return alert("You need to login");
  const { access_token } = currentUser;
  try {
    const res = await fetch(url + `/beers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
};

// favorite actions
export const fetchFavoriteBeers = async (currentUser) => {
  if (!currentUser) return alert("You need to login");
  const { access_token, id } = currentUser;
  try {
    const res = await fetch(url + `/users/${id}/liked-beers`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return res.json();
  } catch (err) {
    throw new Error(err);
  }
};

export const favoriteBeer = async (beerId, currentUser) => {
  if (!currentUser) return alert("You need to login");
  const { access_token, id } = currentUser;
  try {
    const body = {
      beerId: +beerId,
    };
    const res = await fetch(url + `/users/${id}/liked-beers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(body),
    });

    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteFavoriteBeer = async (beerId, currentUser) => {
  if (!currentUser) return alert("You need to login");
  const { access_token, id } = currentUser;
  try {
    const body = {
      beerId: +beerId,
    };
    const res = await fetch(url + `/users/${id}/liked-beers/${beerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(body),
    });

    return res;
  } catch (err) {
    throw new Error(err);
  }
};

// rating actions
export const fetchOneBeerRating = async (beerId) => {
  try {
    const res = await fetch(url + "/beers/" + beerId + "/ratings");
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
};

export const rateBeer = async (beerId, currentUser, value) => {
  if (!currentUser) return alert("You need to login");
  const { access_token, id } = currentUser;
  try {
    const body = {
      rating: value,
    };
    const res = await fetch(url + `/users/${id}/rated-beers/${beerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(body),
    });

    return res.json();
  } catch (err) {
    throw new Error(err);
  }
};

// user actions
export const signin = async (email, password) => {
  const body = { email, password };
  try {
    const res = await fetch(url + "/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 403) {
      throw new Error("Credentials incorrect");
    }

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    if (res.status === 200) return res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const signup = async (name, email, password) => {
  const body = { name, email, password };
  try {
    const res = await fetch(url + "/auth/signup", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (res.status === 400) {
      throw new Error("Bad request");
    }

    if (res.status === 403) {
      throw new Error("There is already an account with this email");
    }

    return res.json();
  } catch (err) {
    throw new Error(err);
  }
};
