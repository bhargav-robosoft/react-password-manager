import { apiEndpoint, defaultHeaders } from "../constants";
import Site from "../models/Site";
import { getToken } from "../utils/storage";

export const getSitesApi = () => {
  return fetch(apiEndpoint + "get-sites", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    credentials: "include",
  });
};

export const addSiteApi = (site: Site) => {
  return fetch(apiEndpoint + "save-site", {
    method: "POST",
    body: JSON.stringify({
      url: site.url,
      name: site.name,
      Sector: site.category,
      Username: site.username,
      Password: site.password,
      notes: site.notes,
    }),
    headers: {
      ...defaultHeaders,
      Authorization: "Bearer " + getToken(),
    },
    credentials: "include",
  });
};

export const editSiteApi = (
  oldSite: Site,
  editedSite: {
    url: string | undefined;
    name: string | undefined;
    category: string | undefined;
    username: string | undefined;
    password: string | undefined;
    notes: string | undefined;
  }
) => {
  var siteBody: any = {
    id: oldSite.id,
  };

  if (editedSite.url !== undefined) {
    siteBody.url = editedSite.url;
  }
  if (editedSite.name !== undefined) {
    siteBody.name = editedSite.name;
  }
  if (editedSite.category !== undefined) {
    siteBody.sector = editedSite.category;
  }
  if (editedSite.username !== undefined) {
    siteBody.username = editedSite.username;
  }
  if (editedSite.password !== undefined) {
    siteBody.password = editedSite.password;
  }
  if (editedSite.notes !== undefined) {
    siteBody.notes = editedSite.notes;
  }

  return fetch(apiEndpoint + "edit-site", {
    method: "PATCH",
    body: JSON.stringify(siteBody),
    headers: {
      ...defaultHeaders,
      Authorization: "Bearer " + getToken(),
    },
    credentials: "include",
  });
};

export const deletSiteApi = (siteId: string) => {
  return fetch(apiEndpoint + "delete-site?id=" + siteId, {
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      Authorization: "Bearer " + getToken(),
    },
    credentials: "include",
  });
};

// export const checkAuthResponse = async (
//   decodedResponse: any,
//   navigate: NavigateFunction,
//   dispatch: any
// ) => {
//   if (decodedResponse["status"] !== 200) {
//     if (decodedResponse["sessionTimedOut"]) {
//       dispatch(setUiMessage("Session Timed Out", true));
//       deleteToken();
//       navigate("/auth/sign-in");
//       return true;
//     }
//   }
//   return false;
// };
