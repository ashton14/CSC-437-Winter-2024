import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "./models/profile.js";
import { serverPath } from "./rest.js";

@customElement("view-profile")
export class ViewProfileElement extends LitElement {
    @property()
    path: string = "";

    @state()
    profile?: Profile;

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

  static styles = css`
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
    }`;


    _fetchData(path: string) {
        fetch(serverPath(path))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then((json: unknown) => {
                if (json) this.profile = json as Profile;
            });
    }

    connectedCallback() {
        if (this.path) {
        this._fetchData(this.path);
        }
        super.connectedCallback();
    }
    
    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ) {
        if (name === "path" && oldValue !== newValue && oldValue) {
        this._fetchData(newValue);
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }
}

@customElement("edit-profile")
export class UserProfileEditElement extends ViewProfileElement {
  render() {
    return html`<form @submit=${this._handleSubmit} class="edit-form">
        <h1>Edit Profile</h1>
        <label for="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="New name..." required>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="New email..." required>

          <label for="birthday">Birthday:</label>
          <input type="date" id="birthday" name="birthday" placeholder="New birthday..." required>

          <label for="handicap">Handicap:</label>
          <input type="number" id="handicap" name="handicap" placeholder="New handicap..." required>

        <button type="submit">Submit</button>
    </form> `;
  }

  static styles = [ViewProfileElement.styles,
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
  }`];

   _handleSubmit(ev: Event) {
    ev.preventDefault(); // prevent browser from submitting form data itself

    const target = ev.target as HTMLFormElement;
    const formdata = new FormData(target);
    const entries = Array.from(formdata.entries())
      .map(([k, v]) => (v === "" ? [k] : [k, v]))
      .map(([k, v]) =>
        k === "airports"
          ? [k, (v as string).split(",").map((s) => s.trim())]
          : [k, v]
      );
    const json = Object.fromEntries(entries);

    this._putData(json);
  }

  _putData(json: Profile) {
    fetch(serverPath(this.path), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return null;
      })
      .then((json: unknown) => {
        if (json) this.profile = json as Profile;
      })
      .catch((err) =>
        console.log("Failed to PUT form data", err)
      );
  }
}

// function serverPath(_path: string): string | URL | Request {
//     console.log(_path);
//     throw new Error("Function not implemented.");
// }

