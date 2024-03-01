import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("swing-video-container")
export class SwingVideoContainerElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  static styles = css`
    .swing-video-container {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .filter-container {
      display: flex;
      font-size: 20px;
      background-color: white;
      box-sizing: border-box;
      width: 100%;
      border-radius: 8px;
      align-items: center;
      padding: 10px;
      margin: 0 74px 0 40px;
    }

    label {
      padding: 5px;
    }

    select {
      font-size: 16px;
    }
  `;

  render() {
    return html`
      <div class="swing-video-container">
        <div class="filter-container">
          <label for="filter">Sort By</label>
          <select id="filter" class="filter" name="filter">
            <option value="date-asc">Date: Most Recent</option>
            <option value="date-desc">Date: Least Recent</option>
          </select>
        </div>
        <slot></slot>
      </div>
    `;
  }

    
    firstUpdated() {

    this.setupEventListeners();
  }

    setupEventListeners() {
        if (!this.shadowRoot) return;

        console.log('Setup event listeners');
        
        const filterDropdown = this.shadowRoot.querySelector('#filter');
        if (!filterDropdown) {
            console.error('Filter dropdown not found');
            return;
        }

        filterDropdown.addEventListener('change', () => {
            console.log('Change event triggered');
            this.sortCards();
            console.log("shadowRoot innerHTML: " + this.shadowRoot?.innerHTML)
            console.log(this.shadowRoot?.querySelector('slot'));
        });
    }

//     convertStringToDate(dateString: String) {
//         const [month, day, year] = dateString.split('-').map(Number);
//         return new Date(year, month - 1, day);
// }
    
    sortCards() {        
        const slot = this.shadowRoot?.querySelector('slot');
        if (!slot) return;        

        let cards = slot.assignedElements({ flatten: true });
        
        cards.reverse()

        //sort cards

        // const x = cards[0].childNodes[1]
        // if (x instanceof Element)
        //     console.log("before sorting: " + x.innerHTML)
        
        // cards.sort((a, b) => {
        //     let dateA = null;
        //     let dateB= null;
        //     const a_dateSlot = a.childNodes[1];
        //     if (a_dateSlot instanceof Element) {
        //         const a_date = a_dateSlot.innerHTML;
        //         dateA = this.convertStringToDate(a_date);
        //         if (!a_dateSlot)
        //             console.error("dateSlot not found");
        //     }

        //     const b_dateSlot = b.childNodes[1];
        //     if (b_dateSlot instanceof Element) {
        //         const b_date = b_dateSlot.innerHTML;
        //          dateB = this.convertStringToDate(b_date);

        //         if (!b_dateSlot)
        //             console.error("dateSlot not found");
        //     }
        
        //     if (dateA && dateB) {
        //         if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        //             if (filterDropdown.value === 'date-asc') {
        //                 return dateB.getTime() - dateA.getTime();
        //             } else {
        //                 return dateA.getTime() - dateB.getTime();
        //             }
        //         }
        //     }

        //     return 0; // Return 0 for non-date values
        // });

        // Clear existing content using slot
        console.log("length: " + cards.length);
        cards.forEach(card => this.removeChild(card));

        // Append sorted cards back to the slot
        cards.forEach(card => this.appendChild(card));
        
    }
}

