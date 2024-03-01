import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Profile } from "./models/profile.js";
import * as App from "./app"

@customElement("view-profile")
export class ViewProfileElement extends App.View {
  @property({ attribute: false })
    using?: Profile;

    get profile() {
      return this.using || ({} as Profile);
  }

    render() {
        return html`
            <section class="info-section"> <!--profile section-->
                <ul>
                    <li class="player-name">${this.profile?.name}
                        <img class="instructor-pic" src="/images/swing1.jpg" alt="profile picture">
                    </li>
                    <li class="personal-info">Email: ${this.profile?.email}</li>
                    <li class="personal-info">DOB: ${this.profile?.birthday}</li>
                    <li class="personal-info">Handicap: ${this.profile?.handicap}</li>
                </ul>
            </section>
            `;
    }

  static styles = [css`
    .info-section {
    margin: 20px;
    padding: 20px;
    margin-left: 40px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: inline-block;
    box-sizing: border-box;
    
}
ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: inline-block;
    color: var(--color-dark-font);
}

li {
    margin: 10px;
    margin-left: 0px;
    font-weight: 600;
    color: var(--color-dark-font);
}
.personal-info{
    display: block;
}
.player-name{
    font-size: 20px;
    text-decoration: underline;
    padding-bottom: 10px;
    margin: 0px;
    display: flex;
    align-items: center;
}
.instructor-pic {
    width: 40px;
    height: 40px;
    padding: 0px 20px;
    border-radius: 50%;
    margin-right: -10px;
    }`];
}

@customElement("edit-profile")
export class UserProfileEditElement extends ViewProfileElement {
  render() {
    return html`<form @submit=${this._handleSubmit} class="edit-form">
        <h1>Edit Profile</h1>
        <label for="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="New name..." >

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="New email..." >

          <label for="birthday">Birthday:</label>
          <input type="date" id="birthday" name="birthday" placeholder="New birthday..." >

          <label for="handicap">Handicap:</label>
          <input type="number" id="handicap" name="handicap" placeholder="New handicap..." >

        <button type="submit" onclick="location.reload()">Save</button>
    </form> `;
  }

  static styles = [...ViewProfileElement.styles,
    css`
  .edit-form{
    margin: 20px;
    padding: 20px;
    margin-left: 40px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: inline-block;
    box-sizing: border-box;
  }
  
  
  input{
    display: block;
    margin-bottom: 10px;
    margin-top: 3px;
    border-radius: 4px;
    border-width: 1px;
    width: 168px;
  }
  h1{
    margin: 5px 0px;
  }
  button{
    cursor: pointer;
    background-color: #006633;
    color: white;
    border-radius: 2px;
    border: none;
    height: 30px;
    width: 50px;
    font-size: 15px;
    transition: all 0.3s;
  }
  button:hover{
    background-color:#05d16b;
  }
  `];

   _handleSubmit(ev: Event) {
    ev.preventDefault(); // prevent browser from submitting form data itself

    const target = ev.target as HTMLFormElement;
    const formdata = new FormData(target);
    const entries = Array.from(formdata.entries())
      .map(([k, v]) => (v === "" ? [k] : [k, v]));
    const json = Object.fromEntries(entries);

    this.dispatchMessage({
        type: "ProfileSaved",
        userid: this.profile?.userid,
        profile: json as Profile
      });
  }
}


