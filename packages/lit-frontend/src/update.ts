import { Profile } from "./models/profile";
import {APIRequest } from "./rest"
import * as App from "./app"

const dispatch = App.createDispatch();

export default dispatch.update;

dispatch.addMessage("ProfileSelected", (msg: App.Message) => {
  const { userid } = msg as App.ProfileSelected;

  return new APIRequest()
    .get(`/profiles/${userid}`)
    .then((response: Response) => {
      if (response.status === 200) return response.json();
    })
    .then((json: unknown) => {
      if (json) return json as Profile;
    })
    .then((profile: Profile | undefined) =>
      profile ? App.updateProps({ profile }) : App.noUpdate
    );
});
