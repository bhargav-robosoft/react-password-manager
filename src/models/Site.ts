type Site = {
  id?: string;
  url: string;
  name: string;
  category: string;
  username: string;
  password: string;
  notes: string;
  imageUrl?: string;
};

export const toSite = (json: any): Site => {
  return {
    id: json["id"],
    url: json["url"],
    name: json["name"],
    category: json["sector"],
    username: json["username"],
    password: json["password"],
    notes: json["notes"],
    imageUrl: json["image"],
  };
};

export const toSites = (json: any): Site[] => {
  var sites: Site[] = [];
  for (var i = 0; i < json.length; i++) {
    sites.push(toSite(json[i]));
  }
  return sites;
};

export default Site;
